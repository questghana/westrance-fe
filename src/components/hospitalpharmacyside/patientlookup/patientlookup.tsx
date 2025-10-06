import { Box } from '@/components/ui/box'
import { Flex } from '@/components/ui/flex'
import { Input } from '@/components/ui/input'
import { Stack } from '@/components/ui/stack'
import { ChevronDownIcon, Loader, Search } from 'lucide-react'
import React, { useState } from 'react'
import paste from "/hospitalpharmacy/Paste.svg"
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Center } from '@/components/ui/center'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { axios } from '@/configs/axios.config'
// import { cn } from '@/lib/utils'
// import { ReusableEmployeeInfor } from '@/components/reusable/reusableemployeeinfo'

// const employeeDetails = [
//     {
//         name: "First Name:",
//         detail: "Will",
//     },
//     {
//         name: "Last Name:",
//         detail: "Bettelheim",
//     },
//     {
//         name: "Email:",
//         detail: "will_bettelhiem@gmail.com",
//     },
//     {
//         name: "Phone Number:",
//         detail: "+233 897 98789 67",
//     },
//     {
//         name: "Benefits:",
//         detail: "Annual Spending Cap",
//     },
//     {
//         name: "amount package:",
//         detail: "₵25,000",
//     },
//     {
//         name: "Number of Dependents:",
//         detail: "3",
//     },
// ];
// const dependentDetials = [
//     {
//         name: "First Name:",
//         detail: "Bettelheim",
//     },
//     {
//         name: "Last Name:",
//         detail: "Marshal",
//     },
//     {
//         name: "Email:",
//         detail: "bettelheim_marshal@gmail.com",
//     },
//     {
//         name: "Relationship:",
//         detail: "Spouse",
//     },
//     {
//         name: "Phone Number:",
//         detail: "+233 8111 91111 1",
//     },
// ];

type employeeDetailType = {
    firstName: string;
    lastName: string;
    emailAddress: string;
    registrationNumber: string;
    benefits: string;
    amountPackage: string;
    dependents: number;
    profileImage?: string;
}

type dependentDetailType = {
    firstName: string;
    middleName?: string;
    lastName: string;
    registrationNumber: string;
    emailAddress: string;
    relation: string;
    profileImage?: string;
}
const Patientlookup: React.FC = () => {
    const [patientId, setPatientId] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [employeeDetails, setEmployeeDetails] = useState<employeeDetailType | null>(null);
    const [dependentDetails, setDependentDetails] = useState<dependentDetailType[]>([]);

    const HandleVerify = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/hospital/patient/search", {
                params: {
                    patientId: patientId,
                },
            });
            setEmployeeDetails(response.data.employee);
            setDependentDetails(response.data.dependents);
        } catch (error: any) {
            console.error("Error verifying patient:", error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box className='bg-white px-4 py-4 rounded-2xl'>
            <Stack className='gap-4'>
                <p className='font-medium'>Patient Lookup Page Details</p>
                <Box className="bg-[#F6FAFF] rounded-md lg:w-[570px] md:w-[450px] px-4 py-3">
                    <p>Allow hospitals to quickly verify employee patients (via 14-digit ID) and view their benefit status for billing purposes.</p>
                </Box>
                <Flex className="pt-4 items-center">
                    <p className="whitespace-nowrap font-medium">Search Patient Detail</p>
                    <Box className="border-[1px] border-[#D0D8ED] w-[950px]" />
                </Flex>
                <Stack className='pt-2 gap-1'>
                    <label className='text-sm'>Enter Patient ID:</label>
                    <Flex className="relative flex-col lg:flex-row items-center justify-center">
                        <Box className='relative'>
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5.5 w-5.5 text-gray-400 font-light" />
                            <Input
                                type="search"
                                onChange={(e) => setPatientId(e.target.value)}
                                value={patientId}
                                placeholder="Search patient 14 digit code here"
                                className="pl-10 py-7 bg-[#F8F8F8] h-11 xl:w-[700px] lg:w-[600px] md:w-[400px] min-w-[500px] placeholder:text-gray-400 placeholder:text-[15px] border-2 border-gray-200 rounded-md focus:outline-none focus:border-[#0aafba] active:border-gray-200 focus:ring-0 focus:ring-offset-0"
                            />
                            <img src={paste} alt="paste" className='h-7 absolute top-4 right-2 lg:right-4 md:right-3' />
                        </Box>
                        <Flex className="lg:ml-auto items-center justify-center flex-col lg:flex-row mt-4">
                            <p>Unique ID:</p>
                            <Flex className="items-center bg-[#ECFBEC] rounded-lg px-6 py-2">
                                <p>{patientId}</p>
                            </Flex>
                        </Flex>
                    </Flex>
                </Stack>
                <Button className='lg:w-35 py-7 bg-[#0A51BA] hover:bg-[#0a50bae7] cursor-pointer' onClick={HandleVerify}>{loading ? <Loader className='animate-spin' /> : "Verify"}</Button>
                <Stack className='gap-4'>
                    <Flex className="pt-4 items-center">
                        <p className="whitespace-nowrap font-medium">Patient Detail</p>
                        <Box className="border-[1px] border-[#D0D8ED] w-[950px]" />
                    </Flex>
                    {
                        loading ? (
                            <Center className="py-10 text-gray-500">
                                <Loader className="animate-spin" />
                                Loading...
                            </Center>
                        ) : !employeeDetails ? (
                            <Center className="py-10 text-gray-500">No patient details found</Center>
                        ) : (
                            <>
                                <Flex className="lg:flex-row flex-col justify-between items-start mt-8">
                                    <Stack>
                                        <Flex className="flex-col md:flex-col items-start gap-3">
                                            <Box className="md:gap-27 flex flex-col md:flex-row justify-center text-gray-400">
                                                First Name:
                                                <Box className="text-black font-medium text-[15px] capitalize">
                                                    {employeeDetails?.firstName || "N/A"}
                                                </Box>
                                            </Box>
                                            <Box className="md:gap-28 flex flex-col md:flex-row justify-center text-gray-400">
                                                Last Name:
                                                <Box className="text-black font-medium text-[15px] capitalize">
                                                    {employeeDetails?.lastName || "N/A"}
                                                </Box>
                                            </Box>
                                            <Box className="md:gap-36 flex flex-col md:flex-row justify-center text-gray-400">
                                                Email:
                                                <Box className="text-black font-medium text-[15px] capitalize">
                                                    {employeeDetails?.emailAddress || "N/A"}
                                                </Box>
                                            </Box>
                                            <Box className="md:gap-20 flex flex-col md:flex-row justify-center text-gray-400">
                                                Phone Number:
                                                <Box className="text-black font-medium text-[15px] capitalize">
                                                    {employeeDetails?.registrationNumber || "N/A"}
                                                </Box>
                                            </Box>
                                            <Box className="md:gap-32 flex flex-col md:flex-row justify-center text-gray-400">
                                                Benefits:
                                                <Box className="text-black font-medium text-[15px] capitalize">
                                                    {employeeDetails?.benefits || "N/A"}
                                                </Box>
                                            </Box>
                                            <Box className="md:gap-18 flex flex-col md:flex-row justify-center md:items-center items-start text-gray-400">
                                                Amount Package:
                                                <Box className="capitalize font-medium text-[15px] bg-[#f3f6fe] p-2 rounded-xl text-[#0C2367]">
                                                    {employeeDetails?.amountPackage || "N/A"}
                                                </Box>
                                            </Box>
                                            <Box className="md:gap-8 flex flex-col md:flex-row justify-center md:items-center items-start text-gray-400">
                                                Number of Dependents:
                                                <Box className="text-black capitalize font-medium text-[15px] bg-[#f3f6fe] p-2 rounded-xl">
                                                    {employeeDetails?.dependents || "0"}
                                                </Box>
                                            </Box>
                                        </Flex>
                                    </Stack>

                                    <img
                                        width={160}
                                        height={160}
                                        src={employeeDetails?.profileImage || "/general/demodetailsimg.svg"}
                                        className="rounded-md"
                                        alt="employee-img"
                                    />
                                </Flex>
                                {/* Dependents Accordion */}
                                <Box className="mt-6">
                                    <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                                        {dependentDetails.length === 0 ? (
                                            <h1 className="text-center text-[#2357EE] font-semibold text-xl">No dependent found</h1>
                                        ) : (
                                            dependentDetails.map((dependent, index) => (
                                                <AccordionItem key={index} value={`item-${index}`}>
                                                    <AccordionTrigger className="cursor-pointer text-[18px] text-blue-500/80 font-normal">
                                                        See Dependent {index + 1}
                                                        <ChevronDownIcon
                                                            aria-hidden
                                                            className="text-white pointer-events-none size-6 !flex justify-center items-center text-center mr-auto bg-[#2357EE] rounded-full p-1"
                                                        />
                                                    </AccordionTrigger>
                                                    <AccordionContent className="flex flex-col text-balance">
                                                        <Flex className="lg:flex-row flex-col justify-between items-start gap-4">
                                                            <Stack>
                                                                <Flex className="flex-col md:flex-col items-start gap-3">
                                                                    <Box className="flex flex-col md:flex-row justify-center md:gap-30 text-gray-400">
                                                                        First Name:
                                                                        <Box className="text-black font-medium text-[15px] capitalize">
                                                                            {dependent.firstName || "N/A"}
                                                                        </Box>
                                                                    </Box>
                                                                    <Box className="flex flex-col md:flex-row justify-center md:gap-25 text-gray-400">
                                                                        Middle Name:
                                                                        <Box className="text-black font-medium text-[15px] capitalize">
                                                                            {dependent.middleName || "N/A"}
                                                                        </Box>
                                                                    </Box>
                                                                    <Box className="flex flex-col md:flex-row md:gap-29 text-gray-400">
                                                                        Last Name:
                                                                        <Box className="text-black font-medium text-[15px] capitalize">
                                                                            {dependent.lastName || "N/A"}
                                                                        </Box>
                                                                    </Box>
                                                                    <Box className="flex flex-col md:flex-row md:gap-13 text-gray-400">
                                                                        Registration Number:
                                                                        <Box className="text-black font-medium text-[15px] capitalize">
                                                                            {dependent.registrationNumber || "N/A"}
                                                                        </Box>
                                                                    </Box>
                                                                    <Box className="flex flex-col md:flex-row md:gap-36 text-gray-400">
                                                                        Email:
                                                                        <Box className="text-black font-medium text-[15px] capitalize">
                                                                            {dependent.emailAddress || "N/A"}
                                                                        </Box>
                                                                    </Box>
                                                                    <Box className="flex items-center md:gap-30 text-gray-400">
                                                                        Relation:
                                                                        <Box className="font-medium text-[15px] bg-[#f3f6fe] p-2 rounded-xl text-[#0C2367]">
                                                                            {dependent.relation || "N/A"}
                                                                        </Box>
                                                                    </Box>
                                                                </Flex>
                                                            </Stack>
                                                            <img
                                                                width={160}
                                                                height={160}
                                                                src={dependent.profileImage || "/general/demodetailsimg.svg"}
                                                                className="rounded-md"
                                                                alt={`dependent-${index}`}
                                                            />
                                                        </Flex>
                                                    </AccordionContent>
                                                </AccordionItem>
                                            ))
                                        )}
                                    </Accordion>
                                </Box>
                            </>
                        )
                    }
                </Stack>
            </Stack>
        </Box>
    )
}

export default Patientlookup