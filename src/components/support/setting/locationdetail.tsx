import { Box } from '@/components/ui/box'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { axios } from '@/configs/axios.config'
import { useRegisterStore } from '@/store/companyRegistrationStore'
// import { useAuthStore } from '@/store/userInfo.store'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const locationdetailSchema = z.object({
    region: z.string().min(1, 'Region is required'),
    city: z.string().min(1, 'City is required'),
    address: z.string().min(1, 'Address is required'),
    website: z.string().optional(),
})

type LocationDetailForm = z.infer<typeof locationdetailSchema>

const Locationdetail: React.FC = () => {
    const { setLocationDetail, locationDetail } = useRegisterStore()
    // const { token } = useAuthStore()
    const form = useForm<LocationDetailForm>({
        resolver: zodResolver(locationdetailSchema),
        defaultValues: {
            region: "",
            city: "",
            address: "",
            website: "",
        },
    })

    const { reset, control, handleSubmit, formState: { isSubmitting } } = form


    const fetchCompanyDetail = async () => {
        try {
            const res = await axios.get("/company/companydetails");
            const locationDetail = res.data.companyDetail[0]
            setLocationDetail(locationDetail)
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    };

    useEffect(() => {
        fetchCompanyDetail()
    }, [])

    useEffect(() => {
        if (locationDetail) {
            reset({
                region: locationDetail.region,
                city: locationDetail.city,
                address: locationDetail.address,
                // website: locationDetail[0]?.website,
            });
        }
    }, [locationDetail]);


    const onSubmit = async (data: LocationDetailForm) => {
        console.log(data)
        try {
            const response = await axios.put('/company/companydetail/update', data);
            const updatedData = response.data.updatedCompanyDetail;
            setLocationDetail(updatedData);
            toast.success(response.data.message)
            await fetchCompanyDetail()
        } catch (error: any) {
            toast.error(error?.response?.data?.error || "Update Failed");
        }
    };


    useEffect(() => {
        if (locationDetail) {
            reset({
                region: locationDetail.region,
                city: locationDetail.city,
                address: locationDetail.address,
                // website: locationDetail[0]?.website,
            });
        }
    }, [locationDetail]);

    return (
        <Box className="pt-6">
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

                    <Box className="flex lg:justify-end justify-center py-8 px-6">
                        <Button
                            form="locationdetail"
                            type="submit"
                            disabled={isSubmitting}
                            className='h-12 px-10 w-60 lg:w-44 bg-[#0A51BA] hover:bg-[#0A51BA] cursor-pointer'>
                            {isSubmitting ? 'Loading...' : 'Update & Continue'}
                        </Button>
                    </Box>
                </form>
            </Form>
        </Box>
    )
}

export default Locationdetail
