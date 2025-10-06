import React from 'react'
import { Box } from '../ui/box'
import { Flex } from '../ui/flex'
import { FaArrowLeft } from 'react-icons/fa6'
import { Stack } from '../ui/stack'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Loader } from 'lucide-react'
import { toast } from 'sonner'
import { axios } from '@/configs/axios.config'


interface CreateticketProps {
    onBackClick: () => void;
}


const addTicketSchema = z
    .object({
        AdministrativeFullName: z.string().min(1, "Administrative Name is required"),
        AdministrativeEmailAddress: z.string().min(1, "Administrative Email is required"),
        Subject: z.string().min(1, "Subject is required"),
        Describeissue: z.string().min(1, "Issue is required"),
    })

type AddTicketForm = z.infer<typeof addTicketSchema>;


const Createticket: React.FC<CreateticketProps> = ({ onBackClick }) => {
    const form = useForm<AddTicketForm>({
        resolver: zodResolver(addTicketSchema),
        defaultValues: {
            AdministrativeFullName: "",
            AdministrativeEmailAddress: "",
            Subject: "",
            Describeissue: "",
        },
    });
    const { control, handleSubmit, formState: { isSubmitting } } = form

    const onSubmit = async (data: AddTicketForm) => {
        try {
            const response = await axios.post("/ticket/create", data)
            toast.success(response.data.message)
            form.reset()
        } catch (error: any) {
            toast.error(error.response?.data?.error || "Something went wrong")
        }
    };

    return (
        <Stack className='bg-white px-4 py-4 rounded-2xl'>
            <Flex>
                <Box className='bg-[#EBF2FF] p-2 rounded-full cursor-pointer' onClick={onBackClick}>
                    <FaArrowLeft />
                </Box>
                <p className='font-medium'>Back To Support Page</p>
            </Flex>
            <Stack className='mt-2'>
                <p className='font-medium'>Support & Create Your Ticket</p>
                <Box className='bg-[#F6FAFF] rounded-md lg:w-[420px] md:w-[450] px-4 py-4'>
                    <p>Your support journey starts here — create a ticket now.</p>
                </Box>
            </Stack>

            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack className='mt-6 items-center lg:items-start gap-4'>
                        <Box>
                            <FormField
                                name='AdministrativeFullName'
                                control={control}
                                render={({ field }) => (
                                    <FormItem className='gap-1'>
                                        <FormLabel>
                                            <label className="text-sm font-medium">
                                                Administrative Full Name: <span className="text-red-500">*</span>
                                            </label>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='md:w-105 w-120 bg-[#F8F8F8] py-6' placeholder='Enter full name' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </Box>
                        <Box>
                            <FormField
                                name="AdministrativeEmailAddress"
                                control={control}
                                render={({ field }) => (
                                    <FormItem className='gap-1'>
                                        <FormLabel>
                                            <label className="text-sm font-medium">
                                                Administrative Email Address: <span className="text-red-500">*</span>
                                            </label>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='md:w-105 w-120 bg-[#F8F8F8] py-6' placeholder='Enter email address' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </Box>
                        <Box>
                            <FormField
                                name="Subject"
                                control={control}
                                render={({ field }) => (
                                    <FormItem className='gap-1'>
                                        <FormLabel>
                                            <label className="text-sm font-medium">
                                                Subject: <span className="text-red-500">*</span>
                                            </label>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='md:w-105 w-120 bg-[#F8F8F8] py-6' placeholder='Enter the subject' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </Box>
                        <Box>
                            <FormField
                                name="Describeissue"
                                control={control}
                                render={({ field }) => (
                                    <FormItem className='gap-1'>
                                        <FormLabel>
                                            <label className="text-sm font-medium">
                                                Describe Issue: <span className="text-red-500">*</span>
                                            </label>
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea {...field} className='md:w-105 w-120 h-40 bg-[#F8F8F8]' placeholder='Describe your issue' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </Box>
                    </Stack>
                    <Flex className='justify-end py-4'>
                        <Button type='submit' className='w-full lg:w-44 px-9 py-6 bg-[#0A51BA] hover:bg-[#0a50bad3] cursor-pointer'>
                            {isSubmitting ? <Loader className='animate-spin' /> : "Create & Submit"}
                        </Button>
                    </Flex>
                </form>
            </Form>
        </Stack>
    )
}

export default Createticket


// <label className="text-sm font-medium">
//     Last Name: <span className="text-red-500">*</span>
// </label>
