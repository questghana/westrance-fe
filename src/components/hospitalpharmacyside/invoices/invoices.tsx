import { ReusableTable } from '@/components/reusable/reusableTable'
import { Box } from '@/components/ui/box'
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Flex } from '@/components/ui/flex';
import { Stack } from '@/components/ui/stack'
import { ColumnDef } from '@tanstack/react-table';
import { Loader, Trash2 } from 'lucide-react';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { InvoiceHeaderProps } from './invoicesheader';
import { useAuthStore } from '@/store/userInfo.store';
import { toast } from 'sonner';
import { Center } from '@/components/ui/center';
import { axios } from '@/configs/axios.config';
import DownloadPDFButton from '@/components/common/downloadPDFButton';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';


// const data: Data[] = [
//     {
//         UniqueID: "98324567109231",
//         PatientName: "Kwame Mensah",
//         BenefitType: "General Consultation",
//         Amount: "₵ 250.00",
//     },
//     {
//         UniqueID: "98324567109231",
//         PatientName: "Kwame Mensah",
//         BenefitType: "General Consultation",
//         Amount: "₵ 250.00",
//     },
//     {
//         UniqueID: "98324567109231",
//         PatientName: "Kwame Mensah",
//         BenefitType: "General Consultation",
//         Amount: "₵ 250.00",
//     },
//     {
//         UniqueID: "98324567109231",
//         PatientName: "Kwame Mensah",
//         BenefitType: "General Consultation",
//         Amount: "₵ 250.00",
//     },
//     {
//         UniqueID: "98324567109231",
//         PatientName: "Kwame Mensah",
//         BenefitType: "General Consultation",
//         Amount: "₵ 250.00",
//     },
//     {
//         UniqueID: "98324567109231",
//         PatientName: "Kwame Mensah",
//         BenefitType: "General Consultation",
//         Amount: "₵ 250.00",
//     },
//     {
//         UniqueID: "98324567109231",
//         PatientName: "Kwame Mensah",
//         BenefitType: "General Consultation",
//         Amount: "₵ 250.00",
//     },
//     {
//         UniqueID: "98324567109231",
//         PatientName: "Kwame Mensah",
//         BenefitType: "General Consultation",
//         Amount: "₵ 250.00",
//     },
//     {
//         UniqueID: "98324567109231",
//         PatientName: "Kwame Mensah",
//         BenefitType: "General Consultation",
//         Amount: "₵ 250.00",
//     },
// ];

export type Data = {
    id: string
    EmployeeId: string;
    PatientName: string;
    BenefitUsed: string;
    Amount: string;
    HospitalName: string;
    RemainingBalance: string;
    SubmittedDate: string
};

export const columns = (setInvoicedata: Dispatch<SetStateAction<any[]>>): ColumnDef<Data>[] => [
    {
        id: "EmployeeId",
        header: ({ table }) => (
            <Box className="text-start text-black flex items-center gap-2">
                <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                    className="border border-gray-300 bg-white"
                />
                <h1 className="text-[#525252]">UniqueID</h1>

                <Stack className="gap-0 leading-3">
                    <TiArrowSortedUp className="size-3.5 text-[#525252]" />
                    <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
                </Stack>
            </Box>
        ),
        cell: ({ row }) => (
            <Flex className="text-start items-center gap-2">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                    className="border border-gray-300 bg-white"
                />
                {row.original.EmployeeId}
            </Flex>
        ),
        enableSorting: true,
    },
    {
        accessorKey: "PatientName",
        header: () => (
            <Flex className="text-black text-start gap-1">
                <h1 className="text-[#525252]">Patient Name</h1>
                <Stack className="gap-0 leading-3">
                    <TiArrowSortedUp className="size-3.5 text-[#525252]" />
                    <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
                </Stack>
            </Flex>
        ),
        cell: ({ row }) => (
            <Box className="text-start">{row.original.PatientName}</Box>
        ),
    },
    {
        accessorKey: "BenefitUsed",
        header: () => (
            <Flex className="text-black text-start gap-1">
                <h1 className="text-[#525252]">Benefit Type</h1>
                <Stack className="gap-0 leading-3">
                    <TiArrowSortedUp className="size-3.5 text-[#525252]" />
                    <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
                </Stack>
            </Flex>
        ),
        cell: ({ row }) => {
            return (
                <Box className="text-start">{row.original.BenefitUsed}</Box>
            );
        },
    },
    {
        accessorKey: "Amount",
        header: () => (
            <Flex className="text-black text-start gap-1 w-60">
                <h1 className="text-[#525252]">Amount (GHS)</h1>
                <Stack className="gap-0 leading-3">
                    <TiArrowSortedUp className="size-3.5 text-[#525252]" />
                    <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
                </Stack>
            </Flex>
        ),
        cell: ({ row }) => {
            return (
                <Box className="text-start">{row.original.Amount}</Box>
            );
        },
    },
    {
        accessorKey: "Action",
        header: () => (
            <Flex className="text-black text-start gap-1 w-20">
                <h1 className="text-[#525252]">Action</h1>
                <Stack className="gap-0 leading-3">
                    <TiArrowSortedUp className="size-3.5 text-[#525252]" />
                    <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
                </Stack>
            </Flex>
        ),
        cell: ({ row }) => {
            const EmployeeId = row.original.EmployeeId
            const { setLoading } = useAuthStore()
            const HandleDelete = async () => {
                try {
                    setLoading(true)
                    const response = await axios.delete(`/hospital/deleteinvoice/${EmployeeId}`);
                    toast.success(response.data.message)
                    setInvoicedata((prevData) => prevData.filter((item) => item.EmployeeId !== EmployeeId));
                } catch (error: any) {
                    toast.error(error?.response?.data?.message || error?.response?.data?.error || "Something went wrong");
                } finally {
                    setLoading(false)
                }
            }
            return (
                <Flex className='gap-4'>
                    <DownloadPDFButton
                        data={row.original}
                        tableFields={[
                            { label: "Invoice ID", key: "id" },
                            { label: "Employee ID", key: "EmployeeId" },
                            { label: "Patient Name", key: "PatientName" },
                            { label: "Hospital", key: "HospitalName" },
                            { label: "Amount", key: "Amount" },
                            { label: "Benefit Used", key: "BenefitUsed" },
                            { label: "Remaining Balance", key: "RemainingBalance" },
                            { label: "Submitted Date", key: "SubmittedDate" },
                        ]}
                        fileName={`invoice_${row.original.id}.pdf`}
                    />
                    <Button onClick={HandleDelete} className={`w-[100px] text-center py-5 cursor-pointer bg-[#FF4E4E] hover:bg-[#ff4e4eed]`}>
                        <Trash2 size={28} />
                        Delete
                    </Button>
                </Flex>
            );
        },
    },

];

const Hospitalinvoices: React.FC<InvoiceHeaderProps> = ({ goToStep }) => {
    const handleStepChange = (step: string) => {
        if (step === "add invoice") {
            goToStep("add invoice");
        } else if (step === "Invoice") {
            goToStep("Invoice");
        }
    };
    const [invoicedata, setInvoicedata] = useState<any[]>([]);
    const { loading, setLoading } = useAuthStore()
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10
    const fetchInvoice = async (page: number) => {
        try {
            setLoading(true)
            const response = await axios.get(`/hospital/getinvoice?page=${page}&limit=${limit}`);
            // console.log(response)
            setInvoicedata(response.data.invoices)
            setTotalPages(response.data.totalPages);
            setCurrentPage(response.data.currentPage);
        } catch (error: any) {
            toast.error(error?.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchInvoice(currentPage)
    }, [currentPage])

    const handlePreviousPage = ()=>{
        if(currentPage > 1){
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNextPage = ()=>{
        if(currentPage < totalPages){
            setCurrentPage(currentPage + 1)
        }
    }
    return (
        <Stack className='gap-4'>
            <Box className='bg-white rounded-2xl'>
                <p className='font-medium px-1'>Invoice</p>
                {
                    loading ? (
                        <Center className="py-10 text-gray-500"><Loader className="animate-spin" />Loading...</Center>
                    ) : (
                        <ReusableTable
                            data={invoicedata}
                            columns={columns(setInvoicedata)}
                            headerDescription="Track and manage all submitted invoices for employee treatments — visible to Westrance and partner companies in real-time."
                            headerDescriptionWidth="max-w-[750px]"
                            onRowClick={(row) => console.log("Row clicked:", row.original)}
                            enableHospitalColumnVisibility={false}
                            enableEmployeeColumnVisibility={true}
                            enableCompanyEmpManagement={false}
                            enableCompanyColumnVisibility={true}
                            enableReportAnalyticsVisibility={true}
                            enableInvoiceActiveVisibility={false}
                            searchInput={false}
                            addemployeelogo={false}
                            Filterbutton={false}
                            addbuttontext={true}
                            goToStep={handleStepChange}
                        />
                    )
                }
                <Pagination className="flex justify-end mt-2">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious onClick={handlePreviousPage} size="default" />
                        </PaginationItem>
                        {[...Array(totalPages)].map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink onClick={() => setCurrentPage(index + 1)} isActive={index + 1 === currentPage} size="default">
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext onClick={handleNextPage} size="default" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </Box>
        </Stack>
    )
}

export default Hospitalinvoices