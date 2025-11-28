import { ColumnDef } from "@tanstack/react-table";
import { Box } from "../ui/box";
import { Checkbox } from "../ui/checkbox";
import { Stack } from "../ui/stack";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { Flex } from "../ui/flex";
// import { Button } from "../ui/button";
import { ReusableTable } from "../reusable/reusableTable";
import { ComponentWrapper } from "../common/componentwrapper";
import { useEffect, useState } from "react";
import { axios } from "@/configs/axios.config";
import { toast } from "sonner";
import { useAdminStore } from "@/store/admininfo";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";
import { Center } from "../ui/center";
import { Loader } from "lucide-react";
import DownloadPDFButton from "../common/downloadPDFButton";

// const data: Data[] = [
//   {
//     id: "1",
//     RecipientCompany: "QuickMeds Pharmacy",
//     CompanyType: "Pharmacy",
//     HospharName: "Mercy Health Hospital",
//     invoiceDate: "2024-09-15",
//     Amount: "$4800",
//     PaymentDate: "2024-09-20",
//   },
//   {
//     id: "2",
//     RecipientCompany: "QuickMeds Hospital",
//     CompanyType: "Hospital",
//     HospharName: "Mercy Health Hospital",
//     invoiceDate: "2024-09-15",
//     Amount: "$4800",
//     PaymentDate: "2024-09-20",
//   },
//   {
//     id: "3",
//     RecipientCompany: "QuickMeds Hospital",
//     CompanyType: "Hospital",
//     HospharName: "Mercy Health Hospital",
//     invoiceDate: "2024-09-15",
//     Amount: "$4800",
//     PaymentDate: "2024-09-20",
//   },
//   {
//     id: "4",
//     RecipientCompany: "QuickMeds Pharmacy",
//     CompanyType: "Pharmacy",
//     HospharName: "Mercy Health Hospital",
//     invoiceDate: "2024-09-15",
//     Amount: "$4800",
//     PaymentDate: "2024-09-20",
//   },
//   {
//     id: "5",
//     RecipientCompany: "QuickMeds Pharmacy",
//     CompanyType: "Pharmacy",
//     HospharName: "Mercy Health Hospital",
//     invoiceDate: "2024-09-15",
//     Amount: "$4800",
//     PaymentDate: "2024-09-20",
//   },
//   {
//     id: "6",
//     RecipientCompany: "QuickMeds Pharmacy",
//     CompanyType: "Pharmacy",
//     HospharName: "Mercy Health Hospital",
//     invoiceDate: "2024-09-15",
//     Amount: "$4800",
//     PaymentDate: "2024-09-20",
//   },
//   {
//     id: "7",
//     RecipientCompany: "QuickMeds Pharmacy",
//     CompanyType: "Pharmacy",
//     HospharName: "Mercy Health Hospital",
//     invoiceDate: "2024-09-15",
//     Amount: "$4800",
//     PaymentDate: "2024-09-20",
//   },
//   {
//     id: "8",
//     RecipientCompany: "QuickMeds Pharmacy",
//     CompanyType: "Pharmacy",
//     HospharName: "Mercy Health Hospital",
//     invoiceDate: "2024-09-15",
//     Amount: "$4800",
//     PaymentDate: "2024-09-20",
//   },
//   {
//     id: "9",
//     RecipientCompany: "QuickMeds Pharmacy",
//     CompanyType: "Pharmacy",
//     HospharName: "Mercy Health Hospital",
//     invoiceDate: "2024-09-15",
//     Amount: "$4800",
//     PaymentDate: "2024-09-20",
//   },
// ];

export type Data = {
  id: string;
  companyName: string;
  companyType: string
  HospitalName: string;
  SubmittedDate: string;
  Amount: string;
  PaymentDate: string;
  inPatientInvoiceAmount: string;
  outPatientInvoiceAmount: string;
  inPatientRemainingBalance: string;
  outPatientRemainingBalance: string;
  benefitTypeUsed: string;
};

export const columns = (): ColumnDef<Data>[] => [
  {
    accessorKey: "id",
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
    accessorKey: "RecipientCompany",
    id: "RecipientCompany",
    header: () => (
      <Box className="text-start text-black flex items-center gap-2 w-[150px]">
        <h1 className="text-[#525252]">RecipientCompany</h1>
        <Stack className="gap-0 leading-3">
          <TiArrowSortedUp className="size-3.5 text-[#525252]" />
          <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
        </Stack>
      </Box>
    ),
    cell: ({ row }) => (
      <Flex className="ml-6 gap-2">
        {row.original.companyName}
      </Flex>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "CompanyType",
    id: "Company Type",
    header: () => (
      <Box className="text-start text-black flex items-center gap-2 w-[150px]">
        <h1 className="text-[#525252]">Company Type</h1>
        <Stack className="gap-0 leading-3">
          <TiArrowSortedUp className="size-3.5 text-[#525252]" />
          <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
        </Stack>
      </Box>
    ),
    cell: ({ row }) => (
      <Flex className="text-start items-center gap-2">
        {row.original.companyType}
      </Flex>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "HospharName",
    id: "HospharName",
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
      <Box className="text-center">{row.original.HospitalName}</Box>
    ),
  },
  {
    accessorKey: "invoiceDate",
    id: "invoiceDate",
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
      const date = new Date(row.original.SubmittedDate)
      return (
        <Box className="lowercase text-center">{date.toLocaleString("en-US", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit"
        })}</Box>
      );
    },
  },
  {
    accessorKey: "Amount",
    id: "Amount",
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
      return <Box className="lowercase text-center">{row.original.Amount}</Box>;
    },
  },
  {
    accessorKey: "PaymentDate",
    id: "PaymentDate",
    header: () => (
      <Flex className="text-black text-start gap-1 w-30">
        <h1 className="text-[#525252]">Payment Date</h1>
        <Stack className="gap-0 leading-3">
          <TiArrowSortedUp className="size-3.5 text-[#525252]" />
          <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
        </Stack>
      </Flex>
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.SubmittedDate)
      return (
        <Box className="lowercase text-center">{date.toLocaleString("en-US", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit"
        })}</Box>
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
    cell: ({row}) => {
      return (
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
      );
    },
  },
];

export const InvoiceHeader = () => {
  //   const handleAction = (action: string, row: Row<Data>) => {
  //     if (action === "view company details") {
  //       console.log(row.original);
  //     } else if (action === "delete") {
  //       console.log("Deleting:", row.original);
  //     }
  //   };
  const { setLoading, loading } = useAdminStore()
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }
  const fetchAllInvoices = async (page: number) => {
    try {
      setLoading(true)
      const response = await axios.get(`/admin/getAllInvoices?page=${page}&limit=${limit}`)
      setData(response.data.Invoices)
      setTotalPages(response.data.pagination.totalPages);
      setCurrentPage(response.data.pagination.page);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something Went Wrong")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllInvoices(currentPage)
  }, [currentPage])

  return (
    <ComponentWrapper className="p-4 mt-4 max-sm:px-3">
      <Flex className="justify-between max-md:flex-col items-start">
        <h1 className="text-lg font-medium capitalize">Invoices</h1>
      </Flex>
      {
        loading ? (
          <Center className="py-10 text-gray-500"><Loader className="animate-spin" />Loading...</Center>
        ) : (
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
    </ComponentWrapper>
  );
};
