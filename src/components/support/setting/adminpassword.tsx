import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Box } from '@/components/ui/box'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { axios } from '@/configs/axios.config'
import { useAdminStore } from '@/store/admininfo'
import convertToBase64 from '@/utils/covertbase64'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoMdCamera } from 'react-icons/io'
import { toast } from 'sonner'
import { z } from 'zod'

const passwordSecuritySchema = z.object({
    email: z.string().min(1, 'Email is required').email(),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
    profileImage: z.union([z.instanceof(File), z.string()]).optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

type PasswordSecurityForm = z.infer<typeof passwordSecuritySchema>

const AdminPasswordsecurity: React.FC = () => {
    const [filename, setFilename] = useState('Upload Company Logo')
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [togglepass, setTogglepass] = useState(false)
    const [loading, setLoading] = useState(false)
    const [togglepassconfirm, setTogglepassconfirm] = useState(false)

    const { admin, setAdmin } = useAdminStore()

    const form = useForm<PasswordSecurityForm>({
        resolver: zodResolver(passwordSecuritySchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
            profileImage: '',
        },
    })

    const { reset, control, handleSubmit, formState: { isSubmitting } } = form

    // Fetch admin details
    const fetchAdminDetail = async () => {
        try {
            const res = await axios.get("/admin/get-adminDetail")
            const adminData = res.data.adminDetail[0]
            console.log(res);

            setAdmin({
                id: adminData.id,
                email: adminData.email,
                role: adminData.role,
                profileImage: adminData.profileImage,
                unreadNotifications: admin?.unreadNotifications ?? 0,
            })

            reset({
                email: adminData.email,
                password: '',
                confirmPassword: '',
                profileImage: '',
            })
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Something went wrong")
        }
    }

    useEffect(() => {
        fetchAdminDetail()
    }, [])

    // Submit handler
    const onSubmit = async (data: PasswordSecurityForm) => {
        setLoading(true)
        try {
            const fileInput = document.getElementById('fileinp') as HTMLInputElement
            const file = fileInput?.files?.[0]

            let payload: any = {
                id: admin?.id,
                email: data.email,
            }

            if (data.password) {
                payload.password = data.password
            }

            if (file) {
                const base64Image = await convertToBase64(file)
                payload.profilePhoto = base64Image
            }

            const response = await axios.put("/admin/update-adminDetail", payload)
            toast.success(response.data.message || "Admin updated successfully!")

            setAdmin({
                id: admin?.id || "",
                email: data.email,
                role: admin?.role || "admin",
                profileImage: file ? previewUrl : admin?.profileImage || null,
                unreadNotifications: admin?.unreadNotifications ?? 0,
            })

            await fetchAdminDetail()
        } catch (error: any) {
            toast.error(error?.response?.data?.error || "Update Failed")
        } finally {
            setLoading(false)
        }
    }


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
            <Box className='flex flex-col lg:flex-row items-center gap-4 py-6'>
                <Avatar className='md:h-20 md:w-20 h-14 w-14 bg-[#EBEDF4]'>
                    {previewUrl ? (
                        <AvatarImage src={previewUrl} alt="Profile" />
                    ) : admin?.profileImage ? (
                        <AvatarImage src={admin.profileImage} alt="Profile" />
                    ) : (
                        <AvatarFallback>
                            <IoMdCamera color='#778CD5' size={40} />
                        </AvatarFallback>
                    )}
                </Avatar>


                <Input
                    type='file'
                    onChange={HandlefileChange}
                    className='hidden'
                    id='fileinp'
                />
                <label htmlFor="fileinp"
                    className='rounded-md shadow bg-linear-to-t from-[#EEEEEE] to-[#FFFFFF] border border-[#ECECEC] px-3 py-3 font-medium cursor-pointer'>
                    {filename}
                </label>
                <p className='text-[#727481] text-center md:text-start'>
                    At least 800 x 800 px recommended. <br /> JPG or PNG is allowed
                </p>
            </Box>

            <Form {...form}>
                <form id='admincredential' onSubmit={handleSubmit(onSubmit)}>
                    <Box className='flex flex-col items-center lg:items-start gap-8'>
                        <FormField
                            control={control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <Box className='flex flex-col gap-1'>
                                        <FormLabel>
                                            <label className="text-sm font-medium">
                                                Email Address: <span className="text-red-500">*</span>
                                            </label>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='md:w-96 bg-[#F8F8F8] placeholder:text-[#8E8E8E] py-7'
                                                placeholder='Enter email address' />
                                        </FormControl>
                                    </Box>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Box className='flex flex-col flex-wrap lg:flex-row gap-10'>
                            <FormField
                                control={control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <Box className='flex flex-col gap-1'>
                                            <FormLabel>
                                                <label className="text-sm font-medium">
                                                    Update Password:
                                                </label>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type={togglepass ? 'text' : 'password'}
                                                    className='md:w-96 bg-[#F8F8F8] placeholder:text-[#8E8E8E] py-7'
                                                    placeholder='Enter new password' />
                                            </FormControl>
                                            <Box className='flex flex-col lg:flex-row'>
                                                <FormMessage />
                                                <p onClick={() => setTogglepass(!togglepass)}
                                                    className="lg:ml-auto text-[#1E6EE5] underline cursor-pointer text-sm">
                                                    {togglepass ? 'Hide Password' : 'Show Password'}
                                                </p>
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
                                                    Confirm Password:
                                                </label>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type={togglepassconfirm ? 'text' : 'password'}
                                                    className='md:w-96 bg-[#F8F8F8] placeholder:text-[#8E8E8E] py-7'
                                                    placeholder='Re-enter new password' />
                                            </FormControl>
                                            <Box className='flex flex-col lg:flex-row'>
                                                <FormMessage />
                                                <p onClick={() => setTogglepassconfirm(!togglepassconfirm)}
                                                    className="lg:ml-auto text-[#1E6EE5] underline cursor-pointer text-sm">
                                                    {togglepassconfirm ? 'Hide Password' : 'Show Password'}
                                                </p>
                                            </Box>
                                        </Box>
                                    </FormItem>
                                )}
                            />
                        </Box>
                    </Box>

                    <Box className='flex lg:justify-end justify-center py-8 px-6'>
                        <Button
                            form='admincredential'
                            disabled={isSubmitting}
                            className='h-12 px-10 w-60 lg:w-44 bg-[#0A51BA] hover:bg-[#0A51BA]'>
                            {loading ? <Loader className="animate-spin" /> : "Update & Save"}
                        </Button>
                    </Box>
                </form>
            </Form>
        </Box>
    )
}

export default AdminPasswordsecurity
