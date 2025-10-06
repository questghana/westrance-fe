import React, { useEffect, useState } from 'react'
import { Box } from '../ui/box'
import { Stack } from '../ui/stack'
import { Flex } from '../ui/flex'
import { Checkbox } from '../ui/checkbox'
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'
import { ColumnDef } from '@tanstack/react-table'
import { ReusableTable } from '../reusable/reusableTable'
import { useAuthStore } from '@/store/userInfo.store'
import { toast } from 'sonner'
import { Center } from '../ui/center'
import { Loader } from 'lucide-react'
import { axios } from '@/configs/axios.config'
import DownloadPDFButton from '../common/downloadPDFButton'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination'

// const data: Data[] = [
//     {
//         id: "20240923001",
//         EmpName: "Michael Greene",
//         HospharName: "Mercy Health Hospital",
//         invoiceDate: "2024-09-15",
//         Amount: "$4800",
//         PaymentDate: "2024-09-20"
//     },
//     {
//         id: "20240923001",
//         EmpName: "Michael Doe",
//         HospharName: "Mercy Health Hospital",
//         invoiceDate: "2024-09-15",
//         Amount: "$4800",
//         PaymentDate: "2024-09-20"
//     },
//     {
//         id: "20240923001",
//         EmpName: "Michael Greene",
//         HospharName: "Mercy Health Hospital",
//         invoiceDate: "2024-09-15",
//         Amount: "$4800",
//         PaymentDate: "2024-09-20"
//     },
//     {
//         id: "20240923001",
//         EmpName: "Michael Greene",
//         HospharName: "Mercy Health Hospital",
//         invoiceDate: "2024-09-15",
//         Amount: "$4800",
//         PaymentDate: "2024-09-20"
//     },
//     {
//         id: "20240923001",
//         EmpName: "Michael Greene",
//         HospharName: "Mercy Health Hospital",
//         invoiceDate: "2024-09-15",
//         Amount: "$4800",
//         PaymentDate: "2024-09-20"
//     },
//     {
//         id: "20240923001",
//         EmpName: "Michael Greene",
//         HospharName: "Mercy Health Hospital",
//         invoiceDate: "2024-09-15",
//         Amount: "$4800",
//         PaymentDate: "2024-09-20"
//     },
//     {
//         id: "20240923001",
//         EmpName: "Michael Greene",
//         HospharName: "Mercy Health Hospital",
//         invoiceDate: "2024-09-15",
//         Amount: "$4800",
//         PaymentDate: "2024-09-20"
//     },
//     {
//         id: "20240923001",
//         EmpName: "Michael Greene",
//         HospharName: "Mercy Health Hospital",
//         invoiceDate: "2024-09-15",
//         Amount: "$4800",
//         PaymentDate: "2024-09-20"
//     },
//     {
//         id: "20240923001",
//         EmpName: "Michael Greene",
//         HospharName: "Mercy Health Hospital",
//         invoiceDate: "2024-09-15",
//         Amount: "$4800",
//         PaymentDate: "2024-09-20"
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

export const columns = (): ColumnDef<Data>[] => [
    {
        id: "Invoice ID",
        header: ({ table }) => (
            <Box className="text-start text-black flex items-center gap-2 w-[150px]">
                <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                    className="border border-gray-300 bg-white"
                />
                <h1 className="text-[#525252]">Invoice ID</h1>

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
                {row.original.id}
            </Flex>
        ),
        enableSorting: true,
    },
    {
        accessorKey: "PatientName",
        header: () => (
            <Flex className="text-black text-start gap-1 w-[150px]">
                <h1 className="text-[#525252]">Employee Name</h1>
                <Stack className="gap-0 leading-3">
                    <TiArrowSortedUp className="size-3.5 text-[#525252]" />
                    <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
                </Stack>
            </Flex>
        ),
        cell: ({ row }) => (
            <Box className=" text-start">{row.original.PatientName}</Box>
        ),
    },
    {
        accessorKey: "HospitalName",
        header: () => (
            <Flex className="text-black text-start gap-1">
                <h1 className="text-[#525252]">Hospital/Pharmacy Name</h1>
                <Stack className="gap-0 leading-3">
                    <TiArrowSortedUp className="size-3.5 text-[#525252]" />
                    <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
                </Stack>
            </Flex>
        ),
        cell: ({ row }) => (
            <Box className=" text-start">{row.original.HospitalName}</Box>
        ),
    },
    {
        accessorKey: "SubmittedDate",
        header: () => (
            <Flex className="text-black text-start gap-1">
                <h1 className="text-[#525252]">Invoice Date</h1>
                <Stack className="gap-0 leading-3">
                    <TiArrowSortedUp className="size-3.5 text-[#525252]" />
                    <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
                </Stack>
            </Flex>
        ),
        cell: ({ row }) => {
            return (
                <Box className=" text-start">{new Date(row.original.SubmittedDate).toLocaleDateString()}</Box>
            );
        },
    },
    {
        accessorKey: "Amount",
        header: () => (
            <Flex className="text-black text-start gap-1">
                <h1 className="text-[#525252]">Amount (GHS)</h1>
                <Stack className="gap-0 leading-3">
                    <TiArrowSortedUp className="size-3.5 text-[#525252]" />
                    <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
                </Stack>
            </Flex>
        ),
        cell: ({ row }) => {
            return (
                <Box className=" text-start">{row.original.Amount}</Box>
            );
        },
    },
    {
        accessorKey: "SubmittedDate",
        header: () => (
            <Flex className="text-black text-start gap-1 w-50">
                <h1 className="text-[#525252]">Payment Date</h1>
                <Stack className="gap-0 leading-3">
                    <TiArrowSortedUp className="size-3.5 text-[#525252]" />
                    <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
                </Stack>
            </Flex>
        ),
        cell: ({ row }) => {
            return (
                <Box className=" text-start">{new Date(row.original.SubmittedDate).toLocaleDateString()}</Box>
            );
        },
    },
    {
        accessorKey: "action",
        header: () => (
            <Flex className="text-black text-start gap-1">
                <h1 className="text-[#525252]">Actions</h1>
                <Stack className="gap-0 leading-3">
                    <TiArrowSortedUp className="size-3.5 text-[#525252]" />
                    <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
                </Stack>
            </Flex>
        ),
        cell: ({ row }) => {
            return (
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
            );
        },
    },
];


const Invoices: React.FC = () => {
    const [data, setData] = useState<Data[]>([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10
    const { loading, setLoading } = useAuthStore()

    const getInvoice = async (page: number) => {
        try {
            setLoading(true)
            const response = await axios.get(`/company/getinvoice?page=${page}&limit=${limit}`)
            // console.log(response);
            setData(response.data.invoices)
            setTotalPages(response.data.totalPages);
            setCurrentPage(response.data.currentPage);
        } catch (error: any) {
            toast.error(error?.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getInvoice(currentPage)
    }, [currentPage])

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <Box className='bg-white px-4 py-3 rounded-2xl'>
            <Stack className='gap-0'>
                <p className='font-medium'>Invoices</p>
                {

                    loading ? (
                        <Center className="py-10 text-gray-500">
                            <Loader className="animate-spin" /> Loading...
                        </Center>
                    )
                        : (
                            <ReusableTable
                                data={data}
                                columns={columns()}
                                headerDescription="Manage submitted invoices, track payment statuses, and monitor healthcare billing activity."
                                headerDescriptionWidth="max-w-[600px]"
                                onRowClick={(row) => console.log("Row clicked:", row.original)}
                                enableHospitalColumnVisibility={false}
                                enableEmployeeColumnVisibility={false}
                                enableCompanyEmpManagement={false}
                                enableCompanyColumnVisibility={true}
                                searchInput={false}
                                enableInvoiceActiveVisibility={false}
                                addemployeelogo={false}
                                Filterbutton={false}

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
            </Stack>

        </Box>
    )
}

export default Invoices