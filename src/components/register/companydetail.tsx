import React, { useEffect, useState } from 'react'
import { Box } from '../ui/box'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Alert, AlertDescription } from '../ui/alert'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import "react-phone-input-2/lib/style.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
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
  registrationNumber: z.string({ required_error: "Registration Number is required" }).min(1, "Registration Number cannot be empty"),
  numberOfEmployees: z.preprocess((val) => {
    const num = Number(val);
    return isNaN(num) ? undefined : num;
  },
    z.number({
      required_error: "Number of employees is required",
      invalid_type_error: "Enter a valid number",
    }).min(1, "Minimum 1 employee required")
  )
})

type CompanyDetailForm = z.infer<typeof companydetailSchema>

const Companydetail: React.FC = () => {
  const navigate = useNavigate()
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>("");
  const { setCompanyDetail, companyDetail } = useRegisterStore()

  const form = useForm<CompanyDetailForm>({
    resolver: zodResolver(companydetailSchema),
    defaultValues: {
      companyName: "",
      companyType: "",
      industry: "",
      registrationNumber: "",
      numberOfEmployees: 0
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
                              <Box className="flex flex-col lg:flex-row items-center gap-2 w-full">
                                <Box className="bg-[#F4F4F4] text-[#222] py-3 px-3 rounded-md text-sm relative border border-[#DCDEE2]">
                                  <PhoneInput
                                    country="ru"
                                    international
                                    countryCallingCodeEditable={false}
                                    defaultCountry="GH"
                                    onChange={(value) => {
                                      setPhoneNumber(value);
                                      form.setValue(
                                        "registrationNumber",
                                        `${value || ""} ${form
                                          .getValues("registrationNumber")
                                          ?.split(" ")[1] || ""
                                          }`.trim()
                                      );
                                    }}
                                    className="custom-phone-input lg:w-18 md:w-90 py-1.5"
                                  />
                                </Box>
                                <Input
                                  {...field}
                                  type="number"
                                  value={
                                    form
                                      .getValues("registrationNumber")
                                      ?.split(" ")[1] || ""
                                  }
                                  onChange={(e) => {
                                    const regNumber = e.target.value;
                                    form.setValue(
                                      "registrationNumber",
                                      `${phoneNumber || ""} ${regNumber}`.trim()
                                    );
                                  }}
                                  className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none lg:w-70 md:w-96  bg-[#F8F8F8] placeholder:text-[#8E8E8E] placeholder:pl-2 py-7"
                                  placeholder="Enter registration number"
                                />
                              </Box>
                            </FormControl>
                          </Box>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </Box>

                  <Box className='flex flex-row gap-10'>
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