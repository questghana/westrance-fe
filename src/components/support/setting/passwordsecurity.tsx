import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Box } from '@/components/ui/box'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { axios } from '@/configs/axios.config'
import { useRegisterStore } from '@/store/companyRegistrationStore'
import { useAuthStore } from '@/store/userInfo.store'
import convertToBase64 from '@/utils/covertbase64'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
// import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoMdCamera } from 'react-icons/io'
import { toast } from 'sonner'
// import { toast } from 'sonner'
import { z } from 'zod'

const passwordSecuritySchema = z.object({
    administrativeFullName: z.string().min(1, 'Administrative Full Name is required'),
    administrativeEmail: z.string().min(1, 'Administrative Email Address is required').email(),
    createpassword: z.string().optional(),
    confirmPassword: z.string().optional(),
    profilePhoto: z.union([z.instanceof(File), z.string()]).optional(),
}).refine((data) => data.createpassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type PasswordSecurityForm = z.infer<typeof passwordSecuritySchema>

const Passwordsecurity: React.FC = () => {
    const [filename, setFilename] = useState('Upload Company Logo')
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [togglepass, setTogglepass] = useState(false)
    const [loading, setLoading] = useState(false)
    const [togglepassconfirm, setTogglepassconfirm] = useState(false)
    // const { token } = useAuthStore()
    const { setAdminCredential, adminCredential } = useRegisterStore()
    const form = useForm<PasswordSecurityForm>({
        resolver: zodResolver(passwordSecuritySchema),
        defaultValues: {
            administrativeFullName: '',
            administrativeEmail: '',
            createpassword: '',
            confirmPassword: '',
            profilePhoto: '',
        },
    })

    const { reset, control, handleSubmit, formState: { isSubmitting } } = form




    const fetchCompanyDetail = async () => {
        try {
            const res = await axios.get("/company/companydetails");
            const adminCredential = res.data.companyDetail[0];
            setAdminCredential(adminCredential)
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    };

    useEffect(() => {
        fetchCompanyDetail()
    }, [])

    const onSubmit = async (data: PasswordSecurityForm) => {
        setLoading(true)
        try {
            const fileInput = document.getElementById('fileinp') as HTMLInputElement;
            const file = fileInput?.files?.[0];
            let payload = { ...data };
            if (file) {
                const base64Image = await convertToBase64(file);
                payload = {
                    ...data,
                    profilePhoto: base64Image,
                };
            }
            const response = await axios.put('/company/companydetail/update', payload);
            const updatedData = response.data.updatedCompanyDetail;
            setAdminCredential(updatedData);
            useAuthStore.getState().updateCompany({
                ...adminCredential,
                ...updatedData
            })
            toast.success(response.data.message)
            await fetchCompanyDetail()
        } catch (error: any) {
            toast.error(error?.response?.data?.error || "Update Failed");
        } finally {
            setLoading(false)
        }
    };


    useEffect(() => {
        if (adminCredential) {
            reset({
                administrativeFullName: adminCredential.administrativeName,
                administrativeEmail: adminCredential.administrativeEmail,
                // createpassword: adminCredential.createPassword || '',
                // confirmPassword: adminCredential.confirmPassword || '',
                profilePhoto: adminCredential.profileImage || '',
            })
        }

    }, [adminCredential])



    const HandlefileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setFilename(file.name)
            const objectUrl = URL.createObjectURL(file)
            setPreviewUrl(objectUrl)
        } else {
            setFilename('Upload Company Logo')
            setPreviewUrl(null)
        }
    }


    return (
        <Box>
            <Box className='flex flex-col lg:flex-row items-center md:justify-center lg:justify-start md:gap-8 gap-4 py-6'>
                {
                    <Avatar className='md:h-20 md:w-20 h-14 w-14 bg-[#EBEDF4]'>
                        {
                            (previewUrl || adminCredential?.profileImage) ? (
                                <AvatarImage
                                    src={previewUrl ? previewUrl : adminCredential?.profileImage || ''}
                                    alt="Profile"
                                />
                            ) : (
                                <AvatarFallback>
                                    <IoMdCamera color='#778CD5' size={40} />
                                </AvatarFallback>
                            )
                        }
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
                <form id='admincredential' onSubmit={handleSubmit(onSubmit)}>
                    <Box className='flex flex-col items-center lg:items-start gap-8'>

                        <Box className='flex flex-col lg:flex-row gap-10'>
                            <FormField
                                control={control}
                                name="administrativeFullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <Box className='flex flex-col gap-1'>
                                            <FormLabel>
                                                <label className="text-sm font-medium">
                                                    Administrative Full Name: <span className="text-red-500">*</span>
                                                </label>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    className='md:w-96 bg-[#F8F8F8] placeholder:text-[#8E8E8E] placeholder:pl-2 py-7'
                                                    placeholder='Enter full name' />
                                            </FormControl>
                                        </Box>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="administrativeEmail"
                                render={({ field }) => (
                                    <FormItem>
                                        <Box className='flex flex-col gap-1'>
                                            <FormLabel>
                                                <label className="text-sm font-medium">
                                                    Administrative Email Address: <span className="text-red-500">*</span>
                                                </label>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    className='md:w-96 bg-[#F8F8F8] placeholder:text-[#8E8E8E] placeholder:pl-2 py-7'
                                                    placeholder='Enter email address' />
                                            </FormControl>
                                        </Box>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </Box>

                        <Box className='flex flex-col flex-wrap lg:flex-row lg:justify-start justify-center items-center gap-10'>
                            <FormField
                                control={control}
                                name='createpassword'
                                render={({ field }) => (
                                    <FormItem>
                                        <Box className='flex flex-col gap-1'>
                                            <FormLabel>
                                                <label className="text-sm font-medium">
                                                    update Password: <span className="text-red-500">*</span>
                                                </label>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type={togglepass ? 'text' : 'password'}
                                                    className='md:w-96 bg-[#F8F8F8] placeholder:text-[#8E8E8E] placeholder:pl-2 py-7'
                                                    placeholder='Update password' />
                                            </FormControl>
                                            <Box className='flex flex-col lg:flex-row'>
                                                <FormMessage />
                                                <p onClick={() => setTogglepass(!togglepass)} className="lg:ml-auto lg:text-right text-[#1E6EE5] underline cursor-pointer text-sm">{togglepass ? 'Hide Password' : 'Show Password'}</p>
                                            </Box>
                                        </Box>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name='confirmPassword'
                                render={({ field }) => (
                                    <FormItem>
                                        <Box className='flex flex-col gap-1'>
                                            <FormLabel>
                                                <label className="text-sm font-medium">
                                                    Confirm Password: <span className="text-red-500">*</span>
                                                </label>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type={togglepassconfirm ? 'text' : 'password'}
                                                    className='md:w-96 bg-[#F8F8F8] placeholder:text-[#8E8E8E] placeholder:pl-2 py-7'
                                                    placeholder='Re-enter your password' />
                                            </FormControl>
                                            <Box className='flex flex-col lg:flex-row justify-between gap-2'>
                                                <FormMessage />
                                                <p onClick={() => setTogglepassconfirm(!togglepassconfirm)} className="lg:ml-auto lg:text-right text-[#1E6EE5] underline cursor-pointer text-sm">{togglepassconfirm ? 'Hide Password' : 'Show Password'}</p>
                                            </Box>
                                        </Box>
                                    </FormItem>
                                )}
                            />
                        </Box>


                    </Box>


                    <Box className='flex lg:justify-end justify-center lg:mt-auto py-8 px-6'>
                        <Button
                            form='admincredential'
                            disabled={isSubmitting}
                            className='h-12 px-10 w-60 lg:w-44 bg-[#0A51BA] hover:bg-[#0A51BA] cursor-pointer'>
                            {loading ? <Loader className="animate-spin" /> : "Update & Save"}
                        </Button>
                    </Box>

                </form>
            </Form>
        </Box>
    )
}

export default Passwordsecurity