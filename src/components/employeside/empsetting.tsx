import React, { useEffect, useState } from 'react'
import { Box } from '../ui/box'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Input } from '../ui/input'
import { IoMdCamera } from 'react-icons/io'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import lock from "/employee/lock.svg"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useAuthStore } from '@/store/userInfo.store'
import { toast } from 'sonner'
import { Loader } from 'lucide-react'
import convertToBase64 from '@/utils/covertbase64'
import { axios } from '@/configs/axios.config'



const updateuserschema = z.object({
    FullName: z.string().min(1, 'Full Name is required'),
    Emailaddress: z.string().min(1, 'Email is required').email('Invalid email address'),
    CurrentPassword: z.string().optional(),
    NewPassword: z.string().optional(),
    CPassword: z.string().optional(),
    profilePhoto: z.union([z.instanceof(File), z.string()]).optional(),
})

type updateuserForm = z.infer<typeof updateuserschema>


const Empsetting: React.FC = () => {
    const [filename, setFilename] = useState('Upload Profile Image')
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [togglecreatepass, setTogglecreatepass] = useState(false)
    const [togglepass, setTogglepass] = useState(false)
    const [togglecpass, setTogglecpass] = useState(false)
    const [loading, setLoading] = useState(false)
    const { employee } = useAuthStore()
    const form = useForm<updateuserForm>({
        resolver: zodResolver(updateuserschema),
        defaultValues: {
            FullName: '',
            Emailaddress: '',
            CurrentPassword: '',
            NewPassword: '',
            CPassword: '',
            profilePhoto: '',
        },
    })

    const { control, handleSubmit, formState: { isSubmitting } } = form

    useEffect(() => {
        if (employee) {
            form.reset({
                FullName: employee.firstName,
                Emailaddress: employee.emailAddress,
                CurrentPassword: '',
                NewPassword: '',
                CPassword: '',
                profilePhoto: '',
            });
        }
    }, [employee]);

    const onSubmit: SubmitHandler<updateuserForm> = async (data) => {
        setLoading(true)
        try {
            const fileInput = document.getElementById('fileinp') as HTMLInputElement;
            const file = fileInput?.files?.[0];
            let payload = { ...data }
            if (file) {
                const base64Image = await convertToBase64(file)
                payload = {
                    ...data,
                    profilePhoto: base64Image
                }
            }
            const response = await axios.put("/employee/update", payload);
            toast.success(response.data.message)
            console.log(response.data, "response")
            useAuthStore.setState((prev) => ({
                employee: {
                    ...prev.employee!,
                    firstName: data.FullName,
                    emailAddress: data.Emailaddress,
                    createPassword: data.NewPassword,
                    profileImage: response.data?.updatedProfileImage || prev.employee?.profileImage,
                }
            }));
            console.log(employee, "employee")
        } catch (error: any) {
            toast.error(error.response?.data?.error || "Something went wrong")
        } finally {
            setLoading(false)
        }
    };


    const HandlefileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setFilename(file.name)
            const objectUrl = URL.createObjectURL(file)
            setPreviewUrl(objectUrl)
        } else {
            setFilename('Upload Profile Image')
            setPreviewUrl(null)
        }
    }

    return (
        <Box className='p-2 bg-white rounded-xl w-full'>
            <Box className='px-2 py-4'>

                <p>Settings</p>
                <Box className='bg-[#F6FAFF] rounded-md lg:w-[700px] md:w-[450px] px-4 py-4 mt-2'>
                    <p>Manage your account preferences, update credentials, and control notification settings</p>
                </Box>

                <Box className='flex flex-col lg:flex-row items-center md:justify-center lg:justify-start md:gap-8 gap-4 py-6'>
                    {
                        <Avatar className='md:h-20 md:w-20 h-14 w-14 bg-[#EBEDF4]'>
                            {
                                previewUrl || employee?.profileImage ? (
                                    <AvatarImage
                                        src={previewUrl ? previewUrl : employee?.profileImage || ''}
                                        alt="Profile"
                                    />
                                ) : null
                            }
                            <AvatarFallback className='flex items-center justify-center'>
                                <IoMdCamera color='#778CD5' size={40} />
                            </AvatarFallback>
                        </Avatar>
                    }
                    <Input
                        type='file'
                        onChange={HandlefileChange}
                        className='hidden'
                        id='fileinp'
                    />
                    <label htmlFor="fileinp"
                        className='rounded-md shadow bg-linear-to-t from-[#EEEEEE] to-[#FFFFFF] border border-[#ECECEC] px-3 py-3 font-medium cursor-pointer'>{filename}
                    </label>
                    <p className='text-[#727481] md:text-start text-center'>At least 800 x 800 px recommended. <br />JPG or PNG is allowed</p>
                </Box>
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box className='flex flex-col lg:items-start items-center gap-10'>
                            <FormField
                                control={control}
                                name='FullName'
                                render={({ field }) => (
                                    <FormItem>
                                        <Box className='flex flex-col gap-1'>
                                            <FormLabel>
                                                Full Name: <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    className='lg:w-[550px] md:w-[400px] bg-[#F8F8F8] placeholder:text-[#8E8E8E] placeholder:pl-2 py-7'
                                                    placeholder='Enter full name'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </Box>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name='Emailaddress'
                                render={({ field }) => (
                                    <FormItem>
                                        <Box className='flex flex-col gap-1'>
                                            <FormLabel>
                                                Email Address: <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Box className='relative'>
                                                    <Input
                                                        {...field}
                                                        disabled
                                                        className='lg:w-[550px] md:w-[400px] bg-[#F8F8F8] placeholder:text-[#8E8E8E] placeholder:pl-2 py-7' placeholder='Enter email address' />
                                                    <img src={lock} alt="lock" className='absolute right-6 top-5 h-5' />
                                                </Box>
                                            </FormControl>
                                            <FormMessage />
                                        </Box>
                                    </FormItem>
                                )}
                            />
                        </Box>

                        <Box className='mt-10'>
                            <p>Password & Security</p>
                            <Box className='bg-[#F6FAFF] rounded-md w-[590px] px-4 py-4 mt-2'>
                                <p>Your password must be at least 6 characters and should include a combination of numbers, letters and special character (!$@%)</p>
                            </Box>

                            <Box className='flex flex-col lg:items-start items-center gap-6 mt-6'>
                                <FormField
                                    control={control}
                                    name="CurrentPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Box className='flex flex-col gap-1'>
                                                <FormLabel>
                                                    Current Password: <span className="text-red-500">*</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type={togglecreatepass ? 'text' : 'password'}
                                                        className='lg:w-[550px] md:w-[400px] bg-[#F8F8F8] placeholder:text-[#8E8E8E] placeholder:pl-2 py-7' placeholder='Current password'
                                                    />
                                                </FormControl>
                                                <Box className='flex'>
                                                    <FormMessage />
                                                    <p onClick={() => setTogglecreatepass(!togglecreatepass)}
                                                        className="ml-auto text-right text-[#1E6EE5] underline cursor-pointer text-sm"
                                                    >{togglecreatepass ? 'Hide Password' : 'Show Password'}</p>
                                                </Box>
                                            </Box>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="NewPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Box className='flex flex-col gap-1'>
                                                <FormLabel>
                                                    New Password: <span className="text-red-500">*</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type={togglepass ? 'text' : 'password'}
                                                        className='lg:w-[550px] md:w-[400px] bg-[#F8F8F8] placeholder:text-[#8E8E8E] placeholder:pl-2 py-7' placeholder='New Password'
                                                    />
                                                </FormControl>
                                                <Box className='flex'>
                                                    <FormMessage />
                                                    <p onClick={() => setTogglepass(!togglepass)} className="ml-auto text-right text-[#1E6EE5] underline cursor-pointer text-sm"
                                                    >{togglepass ? 'Hide Password' : 'Show Password'}</p>
                                                </Box>
                                            </Box>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="CPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Box className='flex flex-col gap-1'>
                                                <FormLabel>
                                                    Confirm Password: <span className="text-red-500">*</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type={togglecpass ? 'text' : 'password'}
                                                        className='lg:w-[550px] md:w-[400px] bg-[#F8F8F8] placeholder:text-[#8E8E8E] placeholder:pl-2 py-7' placeholder='Confirm password' />
                                                </FormControl>
                                                <Box className='flex'>
                                                    <FormMessage />
                                                    <p onClick={() => setTogglecpass(!togglecpass)}
                                                        className="ml-auto text-right text-[#1E6EE5] underline cursor-pointer text-sm"
                                                    >{togglecpass ? 'Hide Password' : 'Show Password'}</p>
                                                </Box>
                                            </Box>
                                        </FormItem>
                                    )}
                                />
                            </Box>

                            <Box className='flex lg:justify-end justify-center px-6 mt-20'>
                                <Button
                                    disabled={isSubmitting}
                                    className='px-10 py-6 bg-[#0A51BA] hover:bg-[#0A51BA] cursor-pointer lg:w-46 md:w-100'>
                                    {loading ? <Loader className='animate-spin' /> : "Update & Save"}
                                </Button>
                            </Box>

                        </Box>
                    </form>
                </Form>
            </Box>
        </Box>
    )
}

export default Empsetting