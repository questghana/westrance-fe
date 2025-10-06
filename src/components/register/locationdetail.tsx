import React, { useEffect } from 'react'
import { Box } from '../ui/box'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Alert, AlertDescription } from '../ui/alert'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FaArrowLeft } from 'react-icons/fa6'
import { useNavigate } from 'react-router'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useRegisterStore } from '@/store/companyRegistrationStore'

const locationdetailSchema = z.object({
    region: z.string({ required_error: "Region is required" }).min(1, 'Region cannot be empty'),
    city: z.string({ required_error: "City is required" }).min(1, 'City cannot be empty'),
    address: z.string({ required_error: "Address is required" }).min(1, 'Address cannot be empty'),
    website: z.string().optional(), // Optional field
})

type LocationDetailForm = z.infer<typeof locationdetailSchema>

const Locationdetail: React.FC = () => {
    const navigate = useNavigate()
    const { setLocationDetail, locationDetail } = useRegisterStore()

    const form = useForm<LocationDetailForm>({
        resolver: zodResolver(locationdetailSchema),
        defaultValues: {
            region: "",
            city: "",
            address: "",
            website: "",
        },
    })

    const { control, handleSubmit, formState: { isSubmitting } } = form

    const onSubmit = (data: LocationDetailForm) => {
        setLocationDetail(data)
        navigate("/admin-credential")
    }

    useEffect(()=>{
        if(locationDetail){
          form.setValue("region", locationDetail.region || "")
          form.setValue("address", locationDetail.address || "")
          form.setValue("city", locationDetail.city || "")
          form.setValue("website", locationDetail.website || "")
        }
      }, [locationDetail])
    
    
    return (
        <Box className='xl:mt-[5%] lg:mt-[7%] w-full'>
            <h1 className='text-3xl font-semibold text-center lg:text-start'>Registration</h1>
            <Card className="mt-2 lg:h-[700px]">
                <CardHeader>
                    <Box className='flex items-center gap-2 mb-2 cursor-pointer' onClick={() => navigate('/company-detail')}>
                        <FaArrowLeft />
                        <p className='font-medium'>Back</p>
                    </Box>
                    <Box className='w-full max-w-[680px]'>
                        <Alert className='bg-[#F6FAFF] border-none py-6'>
                            <AlertDescription className='text-[#0C1F3C]'>Let us know the geographical presence of your company to help us personalize your experience based on location.</AlertDescription>
                        </Alert>
                    </Box>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form id="locationdetail" onSubmit={handleSubmit(onSubmit)}>
                            <Box className="flex flex-col items-center lg:items-start gap-8">

                                <Box className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
                                    <FormField
                                        control={control}
                                        name="region"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    <span className="text-sm font-medium">
                                                        Region: <span className="text-red-500">*</span>
                                                    </span>
                                                </FormLabel>
                                                <FormControl>
                                                    <Select key={field.value} onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className="w-60 md:w-96 lg:w-[380px] py-7 bg-[#F8F8F8] custom-placeholder">
                                                            <SelectValue placeholder="Select region" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectLabel>Select Region</SelectLabel>
                                                                <SelectItem value="Ahafo">Ahafo</SelectItem>
                                                                <SelectItem value="Ashanti">Ashanti</SelectItem>
                                                                <SelectItem value="Bono">Bono</SelectItem>
                                                                <SelectItem value="BonoEast">Bono East</SelectItem>
                                                                <SelectItem value="Central">Central</SelectItem>
                                                                <SelectItem value="Eastern">Eastern </SelectItem>
                                                                <SelectItem value="GreaterAccra">Greater Accra</SelectItem>
                                                                <SelectItem value="Northern">Northern</SelectItem>
                                                                <SelectItem value="Oti">Oti</SelectItem>
                                                                <SelectItem value="Savannah">Savannah</SelectItem>
                                                                <SelectItem value="UpperEast">Upper East</SelectItem>
                                                                <SelectItem value="UpperWest">Upper West</SelectItem>
                                                                <SelectItem value="Volta">Volta</SelectItem>
                                                                <SelectItem value="Western">Western</SelectItem>
                                                                <SelectItem value="WesternNorth">Western North</SelectItem>
                                                                <SelectItem value="NorthEast">North East</SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={control}
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    <span className="text-sm font-medium">
                                                        City: <span className="text-red-500">*</span>
                                                    </span>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className="md:w-96 bg-[#F8F8F8] placeholder:text-[#8E8E8E] placeholder:pl-2 py-7"
                                                        placeholder="Enter City"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </Box>

                                <FormField
                                    control={control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                <span className="text-sm font-medium">
                                                    Address: <span className="text-red-500">*</span>
                                                </span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    className="lg:w-[800px] md:w-[380px] w-60 bg-[#F8F8F8] placeholder:text-[#8E8E8E] placeholder:pl-2 py-7"
                                                    placeholder="Enter full address"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name="website"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                <span className="text-sm font-medium">Website:</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    className="md:w-96 bg-[#F8F8F8] placeholder:text-[#8E8E8E] placeholder:pl-2 py-7"
                                                    placeholder="Enter website URL"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </Box>
                        </form>
                    </Form>
                </CardContent>
                <Box className='flex lg:justify-end justify-center lg:mt-auto mt-4 px-6'>
                    <Button
                        form='locationdetail'
                        type='submit'
                        disabled={isSubmitting}
                        className='h-12 w-full lg:w-44 px-10 bg-[#0A51BA] hover:bg-[#0A51BA] cursor-pointer'>
                        {isSubmitting ? 'Loading...' : 'Save & Continue'}
                    </Button>
                </Box>
            </Card >
        </Box >
    )
}

export default Locationdetail