// components/Auth/ResetPasswordForm.tsx
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Box } from "../ui/box";
import { useState } from "react";
import Signinimg from "/homeimg/Signin.png";
import Logo from "/Logo/logo.png";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Link, useSearchParams } from "react-router";
import axios from "axios";
import { Loader } from "lucide-react";
import { toast } from "sonner";

const resetPasswordSchema = z.object({
    Newpassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmpassword: z.string().min(8, "Password must be at least 8 characters"),
}).refine((data) => data.Newpassword === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
});
type ResetPasswordForm = z.infer<typeof resetPasswordSchema>

export const ResetPasswordForm = () => {
    const [togglepass] = useState(false)
    const [loading, Isloading] = useState(false);
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");  
      const resetPassword = useForm<ResetPasswordForm>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            Newpassword: '',
            confirmpassword: '',
        },
    })

    const { control: forgotpasswordcontrol, handleSubmit: handleForgotPasswordSubmit, formState: { isSubmitting: forgotpasswordSubmitting } } = resetPassword

    const onResetPasswordSubmit: SubmitHandler<ResetPasswordForm> = async (data) => {
        Isloading(true)
        try {
            const response = await axios.put("http://localhost:4001/api/resetpassword", {
                token,
                Newpassword: data.Newpassword,
                confirmpassword: data.confirmpassword
            })
            console.log(response.data)
            toast.success(response.data.message);
        } catch (error: any) {
            console.log(error)
            toast.error(error?.response?.data?.error || "Reset Password Failed");
        } finally {
            Isloading(false);
        }
        // resetPassword.reset()
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
                    <Form {...resetPassword} >
                        <form onSubmit={handleForgotPasswordSubmit(onResetPasswordSubmit)}>
                            <CardContent className="flex flex-col gap-4">
                                <FormField
                                    control={forgotpasswordcontrol}
                                    name="Newpassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Box className="flex flex-col gap-1">
                                                <FormLabel>
                                                    New Password
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type={togglepass ? 'text' : 'password'}
                                                        placeholder="New Password"
                                                        className="bg-[#F8F8F8] h-12 placeholder:pl-2 placeholder:text-[#8E8E8E]"
                                                    />
                                                </FormControl>
                                            </Box>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={forgotpasswordcontrol}
                                    name="confirmpassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Box className="flex flex-col gap-1">
                                                <FormLabel>
                                                    Confirm Password
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type={togglepass ? 'text' : 'password'}
                                                        placeholder="Confirm Password"
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
                                    disabled={forgotpasswordSubmitting}
                                    type="submit"
                                >
                                    {loading ? <Loader className="animate-spin"/> : "Reset & Sign In"}
                                </Button>
                            </CardContent>
                        </form>
                    </Form>
                </Card>
            </Box>
        </Box>

    );
};



