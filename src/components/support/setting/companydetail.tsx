import { Box } from '@/components/ui/box'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
// import { useRegisterStore } from '@/store/companyRegistrationStore'
import { useAuthStore } from '@/store/userInfo.store'
import { toast } from 'sonner'
import { useRegisterStore } from '@/store/companyRegistrationStore'
import { axios } from '@/configs/axios.config'

const companydetailSchema = z.object({
    companyName: z.string().min(1, 'Company Name is required'),
    companyType: z.string().min(1, 'Company Type is required'),
    industry: z.string().optional(),
    registrationNumber: z.string({ required_error: "Registration Number is required" })
        .regex(/^[A-Za-z]{2}\d{9}$/,
            "Format must be 11 characters: two letters + nine digits (e.g., CS#########)"
        ),
    numberOfEmployees: z.coerce.number().min(1, "Number Of Employees is required"),
    phoneNumber: z
    .string({ required_error: "Phone Number is required" })
    .regex(/^\d{11}$/, "Phone number must be exactly 11 digits"),
})

type CompanyDetailForm = z.infer<typeof companydetailSchema>

const Companydetail: React.FC = () => {
    const { companyDetail, setCompanyDetail } = useRegisterStore()
    const { company } = useAuthStore()
    const form = useForm<CompanyDetailForm>({
        resolver: zodResolver(companydetailSchema),
        defaultValues: {
            companyName: "",
            companyType: "",
            industry: "",
            registrationNumber: "",
            numberOfEmployees: 0,
            phoneNumber: ""
        }
    })

    const { reset, control, handleSubmit, formState: { isSubmitting } } = form


    useEffect(() => {
        if (company) {
            form.reset({
                companyName: company.companyName,
                companyType: company.companyType,
                industry: company.industry ?? "",
                registrationNumber: company.registrationNumber,
                numberOfEmployees: company.numberOfEmployees,
                phoneNumber: company.phoneNumber,
            });
        }
    }, [company]);

    const fetchCompanyDetail = async () => {
        try {
            const res = await axios.get("/company/companydetails");
            const companyDetail = res.data.companyDetail[0];
            setCompanyDetail(companyDetail)
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    };

    useEffect(() => {
        fetchCompanyDetail()
    }, [])

    const onSubmit = async (data: CompanyDetailForm) => {
        try {
            const response = await axios.put('/company/companydetail/update', data);
            const updatedData = response.data.updatedCompanyDetail;
            toast.success(response.data.message)
            await fetchCompanyDetail()
            setCompanyDetail(updatedData);
        } catch (error: any) {
            toast.error(error?.response?.data?.error || "Update Failed");
        }
    };


    useEffect(() => {
        if (companyDetail) {
            reset({
                companyName: companyDetail.companyName,
                companyType: companyDetail.companyType,
                registrationNumber: companyDetail.registrationNumber,
                numberOfEmployees: companyDetail.numberOfEmployees,
                phoneNumber: companyDetail.phoneNumber,
            })
        }

    }, [companyDetail])

    return (
        <Box className='pt-6'>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <Box className='flex flex-col justify-center items-center lg:items-start gap-8'>

                        <Box className='flex flex-col lg:flex-row gap-10'>
                            <FormField
                                control={control}
                                name="companyName"
                                render={({ field }) => (
                                    <FormItem>
                                        <Box className='flex flex-col gap-1'>
                                            <FormLabel>
                                                <label className="text-sm font-medium">
                                                    Company Name: <span className="text-red-500">*</span>
                                                </label>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    className="md:w-96 bg-[#F8F8F8] placeholder:text-[#8E8E8E] placeholder:pl-2 py-7"
                                                    placeholder='Enter Company Name'
                                                />
                                            </FormControl>
                                        </Box>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="companyType"
                                render={({ field }) => (
                                    <FormItem>
                                        <Box className='flex flex-col gap-1'>
                                            <FormLabel>
                                                <label className="text-sm font-medium">
                                                    Company Type: <span className="text-red-500">*</span>
                                                </label>
                                            </FormLabel>
                                            <FormControl>
                                                <Select key={field.value} onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className="w-60 md:w-96 lg:w-[380px] py-7 bg-[#F8F8F8] custom-placeholder">
                                                        <SelectValue placeholder="Select Company Type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Select Company Type</SelectLabel>
                                                            <SelectItem value="Hospital">Hospital</SelectItem>
                                                            <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                                                            <SelectItem value="SoftwareCompany">Software Company</SelectItem>
                                                            <SelectItem value="ConstructionCompany">Construction Company</SelectItem>
                                                            <SelectItem value="Manufacturing Company">Manufacturing Company</SelectItem>
                                                            <SelectItem value="Logistics/Transport Company">Logistics / Transport Company</SelectItem>
                                                            <SelectItem value="Retail/Wholesale Company">Retail / Wholesale Company</SelectItem>
                                                            <SelectItem value="EducationalInstitution">Educational Institution</SelectItem>
                                                            <SelectItem value="Financial/Insurance Company">Financial / Insurance Company</SelectItem>
                                                            <SelectItem value="Consultancy/Agency">Consultancy / Agency</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </Box>
                                    </FormItem>
                                )}
                            />
                        </Box>

                        <Box className='flex flex-col lg:flex-row gap-10'>
                            <FormField
                                control={control}
                                name="industry"
                                render={({ field }) => (
                                    <Box className='flex flex-col gap-1'>
                                        <FormLabel className="text-sm font-medium">
                                            Industry:
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field}
                                                className='md:w-96 bg-[#F8F8F8] placeholder:text-[#8E8E8E] placeholder:pl-2 py-7'
                                                placeholder='Enter industry' />
                                        </FormControl>
                                        <FormMessage />
                                    </Box>
                                )}
                            />
                            <FormField
                                control={control}
                                name="registrationNumber"
                                render={() => (
                                    <FormItem>
                                        <Box className='flex flex-col gap-1'>
                                            <FormLabel>
                                                <span className="text-sm font-medium">
                                                    Company Registration Number: <span className="text-red-500">*</span>
                                                </span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    value={(form.watch('registrationNumber') || '').toUpperCase()}
                                                    onChange={(e) => {
                                                        const next = e.target.value
                                                            .toUpperCase()
                                                            .replace(/[^A-Z0-9]/g, '')
                                                            .slice(0, 11);
                                                        form.setValue('registrationNumber', next, { shouldValidate: true, shouldDirty: true });
                                                    }}
                                                    maxLength={11}
                                                    inputMode="text"
                                                    className="md:w-96 bg-[#F8F8F8] placeholder:text-[#8E8E8E] placeholder:pl-2 py-7"
                                                    placeholder="CS#########"
                                                />
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
                                name="numberOfEmployees"
                                render={({ field }) => (
                                    <FormItem>
                                        <Box className='flex flex-col gap-1'>
                                            <FormLabel>
                                                <label className="text-sm font-medium">
                                                    Number of Employees: <span className="text-red-500">*</span>
                                                </label>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type='number'
                                                    className='appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none md:w-96 bg-[#F8F8F8] placeholder:text-[#8E8E8E] placeholder:pl-2 py-7'
                                                    placeholder='Enter number of employees' />
                                            </FormControl>
                                        </Box>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="phoneNumber"
                                render={() => (
                                    <FormItem>
                                        <Box className='flex flex-col gap-1'>
                                            <FormLabel>
                                                <label className="text-sm font-medium">
                                                    Phone Number: <span className="text-red-500">*</span>
                                                </label>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    value={(form.watch('phoneNumber') || '').replace(/\D/g, '').slice(0, 11)}
                                                    onChange={(e) => {
                                                        const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 11);
                                                        form.setValue('phoneNumber', digitsOnly, { shouldValidate: true, shouldDirty: true });
                                                    }}
                                                    inputMode='numeric'
                                                    pattern='\d{11}'
                                                    maxLength={11}
                                                    className='appearance-none md:w-96 bg-[#F8F8F8] placeholder:text-[#8E8E8E] placeholder:pl-2 py-7'
                                                    placeholder='Enter 11-digit phone number'
                                                />
                                            </FormControl>
                                        </Box>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </Box>
                    </Box>

                    <Box className='flex lg:justify-end justify-center lg:mt-auto py-8 px-6'>
                        <Button
                            disabled={isSubmitting}
                            type='submit'
                            className='h-12 px-10 w-60 lg:w-44 bg-[#0A51BA] hover:bg-[#0A51BA] cursor-pointer'>
                            {isSubmitting ? 'Loading...' : 'Update & Continue'}
                        </Button>
                    </Box>

                </form>
            </Form>
        </Box>
    )
}

export default Companydetail