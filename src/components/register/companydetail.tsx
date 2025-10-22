import React, { useEffect } from 'react'
import { Box } from '../ui/box'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Alert, AlertDescription } from '../ui/alert'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useRegisterStore } from '@/store/companyRegistrationStore'

const companydetailSchema = z.object({
  companyName: z.string({ required_error: "Company Name is required" }).min(1, 'Company Name cannot be empty'),
  companyType: z.string({ required_error: "Company Type is required" }).min(1, 'Company Type cannot be empty'),
  industry: z.string().optional(),
  registrationNumber: z.string({ required_error: "Registration Number is required" })
    .regex(/^[A-Za-z]{2}\d{9}$/,
      "Format must be 11 characters: two letters + nine digits (e.g., CS#########)"
    ),
  numberOfEmployees: z.preprocess((val) => {
    const num = Number(val);
    return isNaN(num) ? undefined : num;
  },
    z.number({
      required_error: "Number of employees is required",
      invalid_type_error: "Enter a valid number",
    }).min(1, "Minimum 1 employee required")
  ),
  phoneNumber: z
    .string({ required_error: "Phone Number is required" })
    .regex(/^\d{11}$/, "Phone number must be exactly 11 digits"),
})

type CompanyDetailForm = z.infer<typeof companydetailSchema>

const Companydetail: React.FC = () => {
  const navigate = useNavigate()
  
  const { setCompanyDetail, companyDetail } = useRegisterStore()

  const form = useForm<CompanyDetailForm>({
    resolver: zodResolver(companydetailSchema),
    defaultValues: {
      companyName: "",
      companyType: "",
      industry: "",
      registrationNumber: "",
      numberOfEmployees: 0,
      phoneNumber: "",
    },
  })

  const { control, handleSubmit, formState: { isSubmitting } } = form

  const onSubmit = (data: CompanyDetailForm) => {
    setCompanyDetail(data)
    navigate("/location-detail")
  }

  useEffect(() => {
    if (companyDetail) {
      form.setValue("companyName", companyDetail.companyName || "")
      form.setValue("companyType", companyDetail.companyType || "")
      form.setValue("industry", companyDetail.industry)
      form.setValue("registrationNumber", companyDetail.registrationNumber || "")
      form.setValue("numberOfEmployees", companyDetail.numberOfEmployees || 0)
      form.setValue("phoneNumber", companyDetail.phoneNumber || "")
    }
  }, [companyDetail])

  return (
    <Box className='xl:mt-[5%] lg:mt-[7%] w-full'>
      <h1 className='text-3xl font-semibold text-center lg:text-start'>Registration</h1>
      <Box>
        <Card className='mt-2 lg:h-[700px]'>
          <CardHeader>
            <Box className='w-full max-w-[700px]'>
              <Alert className='bg-[#F6FAFF] border-none lg:py-6 py-4'>
                <AlertDescription className='text-[#0C1F3C] '>Please provide essential information about your company, including its name, type, industry, and workforce <br className='lg:flex hidden' /> size.</AlertDescription>
              </Alert>
            </Box>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form id='companydetail' onSubmit={handleSubmit(onSubmit)}>
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
                                placeholder="Enter Company Name"
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
                                  <SelectValue placeholder="Select Company Type" defaultValue="" />
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
                      name='industry'
                      render={() => (
                        <FormItem>
                          <Box className='flex flex-col gap-1'>
                            <FormLabel>
                              <span className="text-sm font-medium">
                                Industry:
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                className='md:w-96 bg-[#F8F8F8] placeholder:text-[#8E8E8E] placeholder:pl-2 py-7'
                                placeholder='Enter industry' />
                            </FormControl>
                          </Box>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name="registrationNumber"
                      render={({ field }) => (
                        <FormItem>
                          <Box className='flex flex-col gap-1'>
                            <FormLabel>
                              <span className="text-sm font-medium">
                                Company Registration Number: <span className="text-red-500">*</span>
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                value={field.value?.toUpperCase() ?? ""}
                                onChange={(e) => {
                                  const next = e.target.value
                                    .toUpperCase()
                                    .replace(/[^A-Z0-9]/g, '')
                                    .slice(0, 11);
                                  field.onChange(next);
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
                        render={({ field }) => (
                          <FormItem>
                            <Box className='flex flex-col gap-1'>
                              <FormLabel>
                                <label className="text-sm font-medium">
                                  Phone Number: <span className="text-red-500">*</span>
                                </label>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  value={(field.value || "").replace(/\D/g, '').slice(0, 11)}
                                  onChange={(e) => {
                                    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 11);
                                    field.onChange(digitsOnly);
                                  }}
                                  inputMode='numeric'
                                  pattern='\d{11}'
                                  maxLength={11}
                                  className='appearance-none md:w-96 bg-[#F8F8F8] placeholder:text-[#8E8E8E] placeholder:pl-2 py-7'
                                  placeholder='Enter 11-digit phone number' />
                              </FormControl>
                            </Box>
                            <FormMessage />
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
              form='companydetail'
              disabled={isSubmitting}
              type='submit'
              className='h-12 px-10 w-60 lg:w-44 bg-[#0A51BA] hover:bg-[#0A51BA] cursor-pointer'>
              {isSubmitting ? 'Loading...' : 'Save & Continue'}
            </Button>
          </Box>

        </Card>
      </Box>
    </Box >
  )
}

export default Companydetail