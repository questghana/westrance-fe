import { Box } from '@/components/ui/box'
import React, { useState } from 'react'
import Logo from "/Logo/logo.png";
import { SubmitHandler, useForm } from "react-hook-form";
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Link, useNavigate } from 'react-router';
import { axios } from '@/configs/axios.config';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';
import { useAdminStore } from '@/store/admininfo';


const adminloginschema = z.object({
    Email: z.string().min(1, 'Email is required').email('Invalid email address'),
    password: z.string().min(8, "Password must be at least 8 characters"),
})

type adminloginForm = z.infer<typeof adminloginschema>

const DashboardLogin: React.FC = () => {
    const [togglepass, setTogglepass] = useState(false)
    const navigate = useNavigate()
    const {setAdmin} = useAdminStore()
    const form = useForm<adminloginForm>({
        resolver: zodResolver(adminloginschema),
        defaultValues: {
            Email: '',
            password: '',
        },
    })

    const { control, handleSubmit, formState: { isSubmitting } } = form


    const onSubmit: SubmitHandler<adminloginForm> = async (data) => {
        try {
            const response = await axios.post("/admin/admin-login", data)
            // console.log(response);
            setAdmin(response.data.admin)
            toast.success(response.data.message)
            navigate("/dashboard")
        } catch (error: any) {
            toast.error(error?.response?.data?.error || "Something Went Wrong")
        }
    };

    return (
        <Box className='bg-[url(/Dashboardimg/dashboardloginbg.png)] bg-cover bg-center lg:h-screen'>
            <Box className="bg-[url(/Dashboardimg/layer.png)] bg-right bg-no-repeat relative h-full flex items-center justify-center lg:justify-start md:pl-10 lg:pl-20 xl:pl-30 p-4">
                <Box className='flex flex-col lg:flex-row justify-between lg:items-start items-center lg:gap-40'>
                    <Card className="w-full max-w-[350px] md:min-w-[400px]  py-8 lg:py-10 bg-white/95">
                        <CardHeader>
                            <Link to={"/"}>
                                <img src={Logo} alt="Logo" className="h-10" />
                            </Link>
                            <Box className="pt-4">
                                <h3 className="text-2xl font-bold">Welcome Back!</h3>
                                <p className="text-[#404040] text-[12px]">
                                    Please fill the your Email and Password to Sign In.
                                </p>
                            </Box>
                        </CardHeader>
                        <Form {...form}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <CardContent className="flex flex-col gap-4">
                                    <FormField
                                        control={control}
                                        name="Email"
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
                                        control={control}
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
                                    <Button type="submit" disabled={isSubmitting} className="w-full bg-[#0A51BA] hover:bg-[#0A51BA] cursor-pointer h-10">
                                        {isSubmitting ? <Loader className='animate-spin' /> : "Sign In"}
                                    </Button>
                                </CardContent>
                            </form>
                        </Form>
                    </Card>
                    <Card className='w-full max-w-[350px] md:min-w-[480px] mt-20 bg-white/10 backdrop-blur-sm border-2'>
                        <CardHeader>
                            <p className='text-white lg:text-3xl mb-4'>Effortlessly Manage Your Team And Operations.</p>
                            <p className='text-white/80 text-[12px]'>Login into access your CRM dashboard and manage your team.</p>
                        </CardHeader>
                    </Card>
                </Box>
            </Box>
        </Box>
    )
}

export default DashboardLogin