import React, { useState } from 'react'
import { Box } from '../ui/box'
import { FaArrowLeft } from 'react-icons/fa6'
import { Alert, AlertDescription } from '../ui/alert'
import { useNavigate } from 'react-router'
import { Card, CardHeader } from '../ui/card'
import logo from "/Logo/favicon.svg"
import { Checkbox } from '../ui/checkbox'
import { Button } from '../ui/button'
import { Dialog, DialogContent } from '../ui/dialog'
import Registerdialog from './registerdialog'
import { Controller, useForm, } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import {  Loader } from 'lucide-react'
import { useRegisterStore } from '@/store/companyRegistrationStore'
import { axios } from '@/configs/axios.config'

const contactInfoSchema = z.object({
    termAccepted: z.boolean({ required_error: "You must accept the terms and conditions" }).refine((val) => val === true, {
        message: "terms and conditions cannot be empty"
    })
})

type contactInfoForm = z.infer<typeof contactInfoSchema>

const Contactinfo: React.FC = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const { setContactInfo, contactInfo, reset, ...restStore } = useRegisterStore()
    const [loading, Isloading] = useState(false);
    const { control, handleSubmit, formState: { errors } } = useForm<contactInfoForm>({
        resolver: zodResolver(contactInfoSchema),
        defaultValues: {
            termAccepted: false
        },
    });

    const onSubmit = async (data: contactInfoForm) => {
        // console.log(data);
        setContactInfo(data);
        Isloading(true);

        try {
            const registerPayload = {
                ...restStore.companyDetail,
                ...restStore.locationDetail,
                ...restStore.adminCredential,
                ...data
            };

            const response = await axios.post("/company/register", registerPayload);

            if (response.status === 200) {
                setOpen(true);
                toast.success("Registered successfully");
                setTimeout(() => {
                    navigate("/");
                }, 1000);
                reset();
            }

        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.error || "Something went wrong");
        } finally {
            Isloading(false);
        }
    };

    return (
        <Box className='xl:mt-[5%] lg:mt-[7%] w-full'>
            <h1 className='text-3xl font-semibold text-center lg:text-start'>Registration</h1>
            <Card className='mt-2 lg:h-[800px] xl:h-[680px]'>
                <CardHeader>
                    <Box className='flex items-center gap-2 mb-2 cursor-pointer' onClick={() => navigate('/admin-credential')}>
                        <FaArrowLeft />
                        <p className='font-medium'>Back</p>
                    </Box>
                    <Box className='w-full max-w-[650px]'>
                        <Alert className='bg-[#F6FAFF] border-none py-4'>
                            <AlertDescription className='text-[#0C1F3C] text-[15px] lg:text-md px-2'>Review and agree to our terms to complete your company’s onboarding and activate your <br /> dashboard access.</AlertDescription>
                        </Alert>
                    </Box>
                </CardHeader>
                <Box className='px-8 '>
                    <Box className='flex gap-2 items-center text-lg'>
                        <img src={logo} alt="logo" className='h-8' />
                        <p className='text-[#0A55C1] md:text-md text-sm'>Westrance Business Partnership Agreement</p>
                    </Box>
                    <Box className='pt-4 max-w-[900px]'>
                        <p className='font-semibold'>Agreement Summary:</p>
                        <Box className='pt-2 flex flex-col gap-2'>
                            <Box className='flex gap-2'>
                                <p>1.</p>
                                <Box>
                                    <p className='font-semibold text-sm'>Partnership Scope</p>
                                    <p className='text-[13px]'>Westrance serves as a facilitation platform between your organization and affiliated healthcare providers.
                                        This partnership does not constitute <br /> an employment relationship or legal agency between the parties.</p>
                                </Box>
                            </Box>
                            <Box className='flex gap-2'>
                                <p>2.</p>
                                <Box>
                                    <p className='font-semibold text-sm'>Data Privacy & Confidentiality</p>
                                    <p className='text-[13px]'>All information shared via Westrance is subject to data protection standards and will be handled with strict confidentiality in accordance with  <br /> applicable laws and our internal Data Privacy Policy.</p>
                                </Box>
                            </Box>
                            <Box className='flex gap-2'>
                                <p>3.</p>
                                <Box>
                                    <p className='font-semibold text-sm'>Healthcare Access & Limitations</p>
                                    <p className='text-[13px]'>The healthcare benefits facilitated through Westrance are based on agreed coverage terms. Westrance is not liable for any discrepancies or <br /> disputes between the Company and Hospital.</p>
                                </Box>
                            </Box>
                            <Box className='flex gap-2'>
                                <p>4.</p>
                                <Box>
                                    <p className='font-semibold text-sm'>Payment & Billing</p>
                                    <p className='text-[13px]'>All financial transactions, including company premium contributions or co-payments, shall be managed through Westrance’s billing system, <br /> with monthly summaries accessible via the dashboard.</p>
                                </Box>
                            </Box>
                            <Box className='flex gap-2'>
                                <p>5.</p>
                                <Box>
                                    <p className='font-semibold text-sm'>Termination</p>
                                    <p className='text-[13px]'>Either party may terminate the agreement with 30 days’ written notice. Termination will not affect obligations previously accrued.</p>
                                </Box>
                            </Box>
                            <Box className='flex gap-2'>
                                <p>6.</p>
                                <Box>
                                    <p className='font-semibold text-sm'>Legal Compliance</p>
                                    <p className='text-[13px]'>The Company agrees to comply with all relevant labor, insurance, and healthcare regulations in accordance with the law of jurisdiction.</p>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center gap-4 lg:gap-0 pt-6">
                                <Controller
                                    control={control}
                                    name="termAccepted"
                                    rules={{ required: "You must accept the terms and conditions" }}
                                    render={({ field }) => (
                                        <Box className="flex items-center gap-4">
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                id="terms"
                                            />
                                            <Box>
                                                <label htmlFor="terms" className="text-sm">
                                                    I have read and agree to the above terms and conditions.
                                                </label>
                                                {errors.termAccepted && (
                                                    <p className="text-red-500 text-sm">{errors.termAccepted.message}</p>
                                                )}
                                            </Box>
                                        </Box>
                                    )}
                                />

                                <Box className='flex flex-col lg:flex-row justify-center lg:justify-start gap-3 w-full lg:w-65'>
                                    <Button type='button' variant={'outline'} className='cursor-pointer bg-white hover:bg-white border border-[#0A51BA] text-[#0A51BA] hover:text-[#0A51BA] px-10 h-12'>Decline</Button>
                                    <Button type="submit" className="cursor-pointer bg-[#0A51BA] hover:bg-[#0A51BA] px-10 h-12">
                                        {loading ? <Loader className='animate-spin'/> : "Accept"}
                                    </Button>
                                </Box>
                            </Box>
                        </form>

                        <DialogContent className="[&>button]:hidden rounded-3xl bg-white">
                            <Registerdialog />
                        </DialogContent>
                    </Dialog>

                </Box>
            </Card >
        </Box>
    )
}

export default Contactinfo