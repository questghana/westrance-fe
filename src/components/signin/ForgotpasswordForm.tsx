// components/Auth/ForgotEmailForm.tsx

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Box } from "../ui/box";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Signinimg from "/homeimg/Signin.png";
import Logo from "/Logo/logo.png";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Link, useNavigate } from "react-router";
// import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
// import axios from "axios";
import { useState } from "react";
import { Loader } from "lucide-react";
import { axios } from "@/configs/axios.config";

const ForgotpasswordSchema = z.object({
  Email: z.string().min(1, 'Email is required').email('Invalid email address'),
})

type ForgotpasswordForm = z.infer<typeof ForgotpasswordSchema>

export const ForgotpasswordForm = () => {
  const navigate = useNavigate()
  const [loading, Isloading] = useState(false);
  const forgotpassword = useForm<ForgotpasswordForm>({
    resolver: zodResolver(ForgotpasswordSchema),
    defaultValues: {
      Email: '',
    },
  })
  const { control: forgotemailcontrol, handleSubmit: handleForgotEmailSubmit, formState: { isSubmitting: forgotemailSubmitting } } = forgotpassword

  const onForgotEmailSubmit: SubmitHandler<ForgotpasswordForm> = async (data) => {
    Isloading(true)
    try {
      const response = await axios.post("/forgotpassword", {
        email: data.Email
      })
      // console.log(response.data)
      toast.success(response.data.message);
    } catch (error:any) {
      console.log(error)
      toast.error(error?.response?.data?.error || "Email Sent Failed");
    } finally {
      Isloading(false);
    }
    forgotpassword.reset()
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
                Forgot Password?
              </h3>
              <p className="text-[#404040] text-[12px]">
                Enter your registered email and we’ll send a reset link.
              </p>
            </Box>
          </CardHeader>
          <Form {...forgotpassword} >
            <form onSubmit={handleForgotEmailSubmit(onForgotEmailSubmit)}>
              <CardContent className="flex flex-col gap-4">
                <FormField
                  control={forgotemailcontrol}
                  name="Email"
                  render={({ field }) => (
                    <FormItem>
                      <Box className="flex flex-col gap-1">
                        <FormLabel>
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter your email"
                            className="bg-[#F8F8F8] h-12 placeholder:pl-2 placeholder:text-[#8E8E8E]"
                          />
                        </FormControl>
                      </Box>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="w-full bg-[#0A51BA] hover:bg-[#0A51BA] h-10"
                  disabled={forgotemailSubmitting}
                  type="submit"
                >
                  {loading ? <Loader className='animate-spin' /> : "Send Reset Link"}
                </Button>
                <p
                  onClick={() => navigate("/")}
                  className="text-sm text-[#1E6EE5] underline text-center mt-2 cursor-pointer"
                >
                  Back to Sign In
                </p>
              </CardContent>
            </form>
          </Form>

        </Card>
      </Box>
    </Box>
  )

};


