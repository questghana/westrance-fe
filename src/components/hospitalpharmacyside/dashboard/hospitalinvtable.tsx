import React, { useEffect } from 'react'
// import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, Row, SortingState, useReactTable, VisibilityState } from '@tanstack/react-table'
// import { cn } from '@/lib/utils'
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'
import { Box } from '@/components/ui/box';
import { Stack } from '@/components/ui/stack';
import { Flex } from '@/components/ui/flex';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';  
import { Curve } from '@/components/common/curve';
import { Checkbox } from '@/components/ui/checkbox';
// import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { useAuthStore } from '@/store/userInfo.store';
import { axios } from '@/configs/axios.config';
import { toast } from 'sonner';
import { Center } from '@/components/ui/center';
import { Loader } from 'lucide-react';
import { ReusableTable } from '@/components/reusable/reusableTable';
import DownloadPDFButton from '@/components/common/downloadPDFButton';
import { ColumnDef } from '@tanstack/react-table';


// const data: Data[] = [
//     {
//         uniqueid: "1",
//         employeeid: "38492019382745",
//         employeeName: "Michael Greene",
//     },
//     {
//         uniqueid: "1",
//         employeeid: "38492019382745",
//         employeeName: "Michael Greene",
//     },
//     {
//         uniqueid: "1",
//         employeeid: "38492019382745",
//         employeeName: "Michael Greene",
//     },
//     {
//         uniqueid: "1",
//         employeeid: "38492019382745",
//         employeeName: "Michael Greene",
//     },
//     {
//         uniqueid: "1",
//         employeeid: "38492019382745",
//         employeeName: "Michael Greene",
//     },
//     {
//         uniqueid: "1",
//         employeeid: "38492019382745",
//         employeeName: "Michael Greene",
//     },
//     {
//         uniqueid: "1",
//         employeeid: "38492019382745",
//         employeeName: "Michael Greene",
//     },
//     {
//         uniqueid: "1",
//         employeeid: "38492019382745",
//         employeeName: "Michael Greene",
//     },

// ];

export type Data = {
    id: string;
    EmployeeId: string;
    PatientName: string;
    HospitalName: string;
    inPatientInvoiceAmount?: string;
    outPatientInvoiceAmount?: string;
    inPatientRemainingBalance?: string;
    outPatientRemainingBalance?: string;
    BenefitUsed: string;
    benefitTypeUsed: string;
    SubmittedDate: string;
};


export const columns = (): ColumnDef<Data>[] => [
    {
        id: "select",
        header: ({ table }) => (
            <Box className="text-start text-black flex items-center gap-2">
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
            <Box className="text-start flex items-center gap-2">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                    className="border border-gray-300 bg-white"
                />
                {row.original.id}
            </Box>
        ),
        enableSorting: true,
    },
    {
        accessorKey: "employeeid",
        header: () => (
            <Flex className="text-black text-start gap-1">
                <h1 className="text-[#525252]">Employee ID</h1>
                <Stack className="gap-0 leading-3">
                    <TiArrowSortedUp className="size-3.5 text-[#525252]" />
                    <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
                </Stack>
            </Flex>
        ),
        cell: ({ row }) => (
            <Box className="text-start">{row.original.EmployeeId}</Box>
        ),
    },
    {
        accessorKey: "employeeName",
        header: () => (
            <Flex className="text-black text-start gap-1 w-[180px]">
                <h1 className="text-[#525252]">Employee Name</h1>
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
        accessorKey: "actions",
        header: () => (
            <Flex className="text-black text-start gap-1">
                <h1 className="text-[#525252]">Action</h1>
                <Stack className="gap-0 leading-3">
                    <TiArrowSortedUp className="size-3.5 text-[#525252]" />
                    <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
                </Stack>
            </Flex>
        ),
        cell: ({ row }) => {
            return (
                <Flex className="space-x-2 items-start">
                    {/* <Button
                        variant="outline"
                        className="bg-white cursor-pointer hover:bg-gray-50 border-2 border-[#1055ba] text-[#1055ba]"
                    >
                        View Details
                    </Button> */}
                    <DownloadPDFButton
                        data={row.original}
                        tableFields={[
                            { label: "Invoice ID", key: "id" },
                            { label: "Employee ID", key: "EmployeeId" },
                            { label: "Patient Name", key: "PatientName" },
                            { label: "Hospital", key: "HospitalName" },
                            { label: "In-Patient Invoice Amount", key: "inPatientInvoiceAmount" },
                            { label: "Out-Patient Invoice Amount", key: "outPatientInvoiceAmount" },
                            { label: "In-Patient Remaining Balance", key: "inPatientRemainingBalance" },
                            { label: "Out-Patient Remaining Balance", key: "outPatientRemainingBalance" },
                            { label: "Benefit Used", key: "BenefitUsed" },
                            { label: "Benefit Type Used", key: "benefitTypeUsed" },
                            { label: "Submitted Date", key: "SubmittedDate" },
                        ]}
                        fileName={`invoice_${row.original.id}.pdf`}
                    />
                </Flex>
            );
        },
    },
];

const Hospitalinvtable: React.FC = () => {
    const [data, setData] = React.useState<Data[]>([]);
    const { loading, setLoading } = useAuthStore()
    const getInvoice = async () => {
        try {
            setLoading(true)
            const response = await axios.get("/hospital/getinvoice");
            setData(response.data.invoices);
        } catch (error: any) {
            toast.error(error.response.data.message || "Error fetching invoices");
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getInvoice();
    }, []);

    return (
        <Box className="p-2 bg-white rounded-xl w-full h-[460px] overflow-y-auto">
            <Stack className="gap-5 p-2">
                <Flex className="max-lg:flex-col items-start justify-between">
                    <Flex className="justify-between w-full">
                        <h1 className="text-lg font-medium max-sm:text-[0.9rem] max-md:text-[1.2rem] max-lg:text-[1rem]">
                            Most Recent Invoice Activities
                        </h1>
                        <Flex className="gap-4">
                            <Link to={"/hospital-pharmacy-dashboard/hospital-invoices"}>
                                <h1 className="underline text-blue-500 ">View Invoice Page</h1>
                            </Link>
                        </Flex>
                    </Flex>
                </Flex>
                <Curve className="-mt-3" />
            </Stack>
            {
                loading ? (
                    <Center className="py-10 text-gray-500">
                        <Loader className="animate-spin" /> Loading...
                    </Center>
                ) : (
                    <ReusableTable
                        data={data}
                        columns={columns()}
                        headerDescriptionWidth="max-w-[600px]"
                        onRowClick={(row) => console.log("Row clicked:", row.original)}
                        enableHospitalColumnVisibility={false}
                        enableEmployeeColumnVisibility={false}
                        enableCompanyEmpManagement={false}
                        enableCompanyColumnVisibility={false}
                        searchInput={false}
                        enableInvoiceActiveVisibility={false}
                        addemployeelogo={false}
                        Filterbutton={false}
                        enableGlobalFilter={false}
                        enableSorting={false}
                        enableColumnFilters={false}
                        enableRowSelection={false}
                        enableActiveExportColumnVisibility={false}
                        enableReportAnalyticsVisibility={false}
                    />
                )}
        </Box>)
}

export default Hospitalinvtable