import React, { useEffect, useState } from 'react'
import { Box } from '../ui/box'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Alert, AlertDescription } from '../ui/alert'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router'
import { IoMdCamera } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaArrowLeft } from "react-icons/fa6";
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useRegisterStore } from '@/store/companyRegistrationStore'
import convertToBase64 from "@/utils/covertbase64"

const passwordSecuritySchema = z.object({
    administrativeName: z.string({ required_error: "Administrative Name is required" }).min(1, 'Administrative Name cannot be empty'),
    administrativeEmail: z.string({ required_error: "Administrative Email Address is required" }).min(1, 'Administrative Email cannot be empty').email('Invalid email address'),
    createPassword: z.string({ required_error: "Password must be at least 8 characters" }).min(8, "Password cannot be empty"),
    confirmPassword: z.string({ required_error: "Confirm password must be at least 8 characters" }).min(8, "Confirm cannot be empty"),
})
    .refine((data) => data.createPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type PasswordSecurityForm = z.infer<typeof passwordSecuritySchema>

const Admincredential: React.FC = () => {
    const navigate = useNavigate()
    const [filename, setFilename] = useState('Upload Company Logo')
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [togglepass, setTogglepass] = useState(false)
    const [imageUploading, setImageUploading] = useState(false);
    const [togglepassconfirm, setTogglepassconfirm] = useState(false)
    const { setAdminCredential, adminCredential } = useRegisterStore()

    const form = useForm<PasswordSecurityForm>({
        resolver: zodResolver(passwordSecuritySchema),
        defaultValues: {
            administrativeName: "",
            administrativeEmail: "",
            createPassword: "",
            confirmPassword: "",
        },
    })

    const { control, handleSubmit, formState: { isSubmitting } } = form

    const onSubmit = async (data: PasswordSecurityForm) => {
        setImageUploading(true)
        try {
            const fileInput = document.getElementById('fileinp') as HTMLInputElement;
            const file = fileInput?.files?.[0];

            if (file) {
                const base64Image = await convertToBase64(file);
                setAdminCredential({
                    ...data,
                    profileImage: base64Image 
                });
            } else {
                setAdminCredential({
                    ...data,
                    profileImage: null
                });
            }

            navigate("/contact-info");
        } catch (error) {
            console.log(error)
        } finally {
            setImageUploading(false)
        }
    }

    useEffect(()=>{
        if(adminCredential){
          form.setValue("administrativeName", adminCredential.administrativeName || "")
          form.setValue("administrativeEmail", adminCredential.administrativeEmail || "")
          form.setValue("createPassword", adminCredential.createPassword || "")
          form.setValue("confirmPassword", adminCredential.confirmPassword || "")
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
        <Box className='xl:mt-[5%] lg:mt-[7%] w-full'>
            <h1 className='text-3xl font-semibold text-center lg:text-start'>Registration</h1>
            <Box>
                <Card className="mt-2 lg:h-[700px]">
                    <CardHeader>
                        <Box className='flex items-center gap-2 mb-2 cursor-pointer' onClick={() => navigate('/location-detail')}>
                            <FaArrowLeft />
                            <p className='font-medium'>Back</p>
                        </Box>
                        <Box className='w-full max-w-[650px]'>
                            <Alert className='bg-[#F6FAFF] border-none lg:py-6'>
                                <AlertDescription className='text-[#0C1F3C '>Create secure login credentials for the main admin who will manage your company's Westrance <br /> dashboard</AlertDescription>
                            </Alert>
                        </Box>
                        <Box className='flex flex-col md:flex-row items-center md:justify-center lg:justify-start md:gap-8 gap-4 py-6'>
                            <Avatar className='md:h-20 md:w-20 h-14 w-14 bg-[#EBEDF4]'>
                                {
                                    previewUrl ?
                                        <AvatarImage src={previewUrl} alt="@shadcn" /> :
                                        <AvatarFallback><IoMdCamera color='#778CD5' size={40} /></AvatarFallback>
                                }
                            </Avatar>
                            <Input
                                type='file'
                                onChange={HandlefileChange}
                                className='hidden'
                                id='fileinp'
                            />
                            <label htmlFor="fileinp" className='rounded-md shadow bg-linear-to-t from-[#EEEEEE] to-[#FFFFFF] border border-[#ECECEC] px-3 py-3 font-medium cursor-pointer flex items-center gap-2'>
                                {imageUploading ? (
                                    <>
                                        <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-500">
                                        Uploading...
                                        </span>
                                    </>
                                ) : (
                                    filename
                                )}
                            </label>

                            <p className='text-[#727481] md:text-start text-center'>At least 800 x 800 px recommended. <br />JPG or PNG is allowed</p>
                        </Box>
                    </CardHeader>
                    <CardContent >
                        <Form {...form}>
                            <form id='admincredential' onSubmit={handleSubmit(onSubmit)}>
                                <Box className='flex flex-col items-center lg:items-start gap-8'>

                                    <Box className='flex flex-col lg:flex-row gap-10'>
                                        <FormField
                                            control={control}
                                            name="administrativeName"
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
                                                                className="md:w-96 bg-[#F8F8F8] placeholder:text-[#8E8E8E] placeholder:pl-2 py-7"
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
                                                                className="md:w-96 bg-[#F8F8F8] placeholder:text-[#8E8E8E] placeholder:pl-2 py-7"
                                                                placeholder='Enter email address' />
                                                        </FormControl>
                                                    </Box>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </Box>

                                    <Box className='flex flex-col lg:flex-row gap-10'>
                                        <FormField
                                            control={control}
                                            name='createPassword'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Box className='flex flex-col gap-1'>
                                                        <FormLabel>
                                                            <label className="text-sm font-medium">
                                                                Create Password: <span className="text-red-500">*</span>
                                                            </label>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                type={togglepass ? 'text' : 'password'} 
                                                                className="md:w-96 bg-[#F8F8F8] placeholder:text-[#8E8E8E] placeholder:pl-2 py-7"
                                                                placeholder='Create a password' />
                                                        </FormControl>
                                                        <Box className='flex'>
                                                            <FormMessage />
                                                            <p onClick={() => setTogglepass(!togglepass)} className="ml-auto lg:text-right text-[#1E6EE5] underline cursor-pointer text-sm">{togglepass ? 'Hide Password' : 'Show Password'}</p>
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
                                                                className="md:w-96 bg-[#F8F8F8] placeholder:text-[#8E8E8E] placeholder:pl-2 py-7"
                                                                placeholder='Re-enter your password' />
                                                        </FormControl>
                                                        <Box className='flex justify-between gap-2'>
                                                            <FormMessage />
                                                            <p onClick={() => setTogglepassconfirm(!togglepassconfirm)} className="ml-auto lg:text-right text-[#1E6EE5] underline cursor-pointer text-sm">{togglepassconfirm ? 'Hide Password' : 'Show Password'}</p>
                                                        </Box>
                                                    </Box>
                                                </FormItem>
                                            )}
                                        />
                                    </Box>
                                </Box>
                            </form>
                        </Form>
                    </CardContent>
                    <Box className='flex lg:justify-end justify-center lg:mt-auto mt-4 px-6'>
                        <Button
                            form='admincredential'
                            disabled={isSubmitting}
                            className='h-12 px-10 w-full lg:w-44 bg-[#0A51BA] hover:bg-[#0A51BA] cursor-pointer'>
                            {isSubmitting ? "Loading..." : "Save & Continue"}
                        </Button>
                    </Box>
                </Card >
            </Box>
        </Box >
    )
}

export default Admincredential;
