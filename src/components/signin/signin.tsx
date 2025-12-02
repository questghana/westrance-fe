import React, { useState } from "react";
import { Box } from "../ui/box";
import Signinimg from "/homeimg/Signin.png";
import Logo from "/Logo/logo.png";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useAuthStore } from "@/store/userInfo.store";
import { axios } from "@/configs/axios.config";

const LoginSchema = z.object({
  Email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(8, "Password must be at least 8 characters")
})



type LoginForm = z.infer<typeof LoginSchema>

const Signin: React.FC = () => {
  const [togglepass, setTogglepass] = useState(false)
  const [loading, Isloading] = useState(false);
  const navigate = useNavigate()
  const login = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      Email: '',
      password: '',
    },
  })


  const { control: logincontrol, handleSubmit: handleLoginSubmit, formState: { isSubmitting: loginSubmitting } } = login


  const onLoginSubmit: SubmitHandler<LoginForm> = async (data) => {
    Isloading(true);
    try {
      const response = await axios.post("/signin", { email: data.Email, password: data.password },);
      const userinfo = response.data.data;
      useAuthStore.getState().setAuth({
        token: userinfo.token,
        user: userinfo.user,
        company: userinfo.company,
        employee: userinfo.employee
      });

      if (userinfo.employee?.employeeId) {
        useAuthStore.getState().setnewEmployeeId(userinfo.employee.employeeId);
      }

      if (response.status === 200) {
        const role = userinfo.user.role?.trim();
        const companyType = userinfo.company?.companyType;
        toast.success(`${role} login success`);

        if (role === "CompanyAdmin") {
          if (companyType === "Hospital" || companyType === "Pharmacy") {
            navigate("/hospital-pharmacy-dashboard");
          } else {
            navigate("/company-dashboard");
          }
        } else if (
          role === "Employee" ||
          role === "Hospital Employee" ||
          role === "Westrance Employee"
        ) {
          setTimeout(() => {
            navigate("/employee-dashboard");
          }, 0);
        } else {
          navigate("/dashboard");
        }

      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Login failed");
    } finally {
      Isloading(false);
    }
  };


  return (
    <Box className="relative h-screen w-full overflow-hidden">
      <Box
        className="absolute inset-0 text-white"
        style={{
          backgroundImage: `url(${Signinimg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPositionX: "right"
        }}
      ></Box>

      <Box className="relative h-full flex items-center justify-center md:justify-start pl-[9%] p-4">
        <Card className="w-full max-w-[350px] md:max-w-[450px] py-8 md:py-10 bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <Link to={'/'}>
              <img src={Logo} alt="Logo" className="h-10" />
            </Link>
            <Box className="pt-4">
              <h3 className="text-2xl font-bold">
                Welcome Back!
              </h3>
              <p className="text-[#404040] text-[12px]">
                Please fill the your Email and Password to Sign In.
              </p>
            </Box>
          </CardHeader>

          <Form {...login}>
            <form onSubmit={handleLoginSubmit(onLoginSubmit)}>
              <CardContent className="flex flex-col gap-4">
                <FormField
                  control={logincontrol}
                  name='Email'
                  render={({ field }) => (
                    <FormItem>
                      <Box className="flex flex-col gap-1">
                        <FormLabel>
                          <Label>Email</Label>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter Email"
                            className="bg-[#F8F8F8] h-12 placeholder:pl-2 placeholder:text-[#8E8E8E]"
                          />
                        </FormControl>
                        <FormMessage />
                      </Box>
                    </FormItem>
                  )}
                />
                <FormField
                  control={logincontrol}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Box className="flex flex-col gap-1">
                        <FormLabel>
                          <Label>Password</Label>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder='Password'
                            type={togglepass ? 'text' : 'password'}
                            className='bg-[#F8F8F8] h-12 placeholder:pl-2 placeholder:text-[#8E8E8E]'
                          />
                        </FormControl>
                        <Box className="flex">
                          <FormMessage />
                          <Box
                            className="ml-auto text-right text-[#1E6EE5] underline cursor-pointer text-sm"
                            onClick={() => setTogglepass(!togglepass)}
                          >
                            {togglepass ? 'Hide Password' : 'Show Password'}
                          </Box>
                        </Box>
                      </Box>
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={loginSubmitting} className="w-full bg-[#0A51BA] hover:bg-[#0A51BA] cursor-pointer h-10">
                  {loading ? <Loader className="animate-spin" /> : "Sign In"}
                </Button>
                <Separator className="my-2 pt-0.5" />
                <Box>
                  <p className="text-[#1E6EE5] text-sm mb-1 cursor-pointer" onClick={() => navigate("/forgotpassword")}>
                    Forgot Your Password?
                  </p>
                  {/* <p className="text-sm">
                    Don't have an account?{' '}
                    <span className="text-[#1E6EE5] text-sm cursor-pointer">
                      <Link to={'/company-detail'}>
                        Register now
                      </Link>
                    </span>
                  </p> */}
                </Box>
              </CardContent>
            </form>
          </Form>
        </Card>
      </Box>
    </Box>
  );
};

export default Signin;
