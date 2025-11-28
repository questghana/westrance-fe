import { Flex } from "../../ui/flex";
import { Box } from "../../ui/box";
import { Stack } from "@/components/ui/stack";
import { Curve } from "@/components/common/curve";
import { Checkbox } from "@/components/ui/checkbox";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { Link } from "react-router";
import { ReusableTable } from "@/components/reusable/reusableTable";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { axios } from "@/configs/axios.config";
import { useAdminStore } from "@/store/admininfo";
import { Center } from "@/components/ui/center";
import { Loader } from "lucide-react";
import DownloadPDFButton from "@/components/common/downloadPDFButton";

// const data: Data[] = [
//   {
//     id: "1",
//     progress: 30,
//     status: "completed",
//     projectName: "ken Stack",
//     clientName: "ken99",
//     startDate: new Date("2025-01-01T00:00:00"),
//     endDate: new Date("2025-06-01T00:00:00"),
//     address: "TenStack University of Lagos",
//     projectDescription: "Example Description",
//     assignProject: "Team A",
//     hours: 12,
//     images: "/projectImagesDemo/1.jpg",
//   },
//   {
//     id: "2",
//     progress: 40,
//     projectName: "Web Dev",
//     status: "pending",
//     clientName: "Abe45",
//     startDate: new Date("2025-02-15T00:00:00"),
//     endDate: new Date("2025-08-15T00:00:00"),
//     address: "TenStack University of Lagos",
//     projectDescription: "Example Description",
//     assignProject: "Team B",
//     hours: 14,
//     images: "/projectImagesDemo/2.avif",
//   },
//   {
//     id: "3",
//     progress: 75,
//     projectName: "App Design",
//     status: "ongoing",
//     clientName: "Monserrat44",
//     startDate: new Date("2025-01-10T00:00:00"),
//     endDate: new Date("2025-02-10T00:00:00"),
//     address: "TenStack University of Lagos",
//     projectDescription: "Example Description",
//     assignProject: "Team C",
//     hours: 20,
//     images: "/projectImagesDemo/3.jfif",
//   },
//   {
//     id: "4",
//     progress: 35,
//     projectName: "ken Stack",
//     status: "pending",
//     clientName: "Silas22",
//     startDate: new Date("2025-04-02T00:00:00"),
//     endDate: new Date("2025-04-20T00:00:00"),
//     address: "TenStack University of Lagos",
//     projectDescription: "Example Description",
//     assignProject: "Team D",
//     hours: 10,
//     images: "/projectImagesDemo/4.jpg",
//   },
//   {
//     id: "5",
//     progress: 90,
//     projectName: "Cloud Migration",
//     status: "completed",
//     clientName: "carmella",
//     startDate: new Date("2025-04-01T00:00:00"),
//     endDate: new Date("2025-11-01T00:00:00"),
//     address: "TenStack University of Lagos",
//     projectDescription: "Example Description",
//     assignProject: "Team E",
//     hours: 8,
//     images: "/projectImagesDemo/5.jpg",
//   },
//   {
//     id: "6",
//     progress: 90,
//     projectName: "ken Stack",
//     status: "pending",
//     clientName: "carmella",
//     startDate: new Date("2025-06-01T00:00:00"),
//     endDate: new Date("2025-12-01T00:00:00"),
//     address: "TenStack University of Lagos",
//     projectDescription: "Example Description",
//     assignProject: "Team A",
//     hours: 15,
//     images: "/projectImagesDemo/1.jpg",
//   },
//   {
//     id: "7",
//     progress: 90,
//     projectName: "API Dev",
//     status: "ongoing",
//     clientName: "carmella",
//     startDate: new Date("2025-02-01T00:00:00"),
//     endDate: new Date("2025-04-01T00:00:00"),
//     address: "TenStack University of Lagos",
//     projectDescription: "Example Description",
//     assignProject: "Team B",
//     hours: 4,
//     images: "/projectImagesDemo/2.avif",
//   },
//   {
//     id: "8",
//     progress: 90,
//     projectName: "ken Stack",
//     status: "pending",
//     clientName: "carmella",
//     startDate: new Date("2025-01-01T00:00:00"),
//     endDate: new Date("2025-02-01T00:00:00"),
//     address: "TenStack University of Lagos",
//     projectDescription: "Example Description",
//     assignProject: "Team C",
//     hours: 12,
//     images: "/projectImagesDemo/4.jpg",
//   },
//   {
//     id: "9",
//     progress: 90,
//     projectName: "Data Pipeline",
//     status: "completed",
//     clientName: "carmella",
//     startDate: new Date("2025-03-01T00:00:00"),
//     endDate: new Date("2025-04-01T00:00:00"),
//     address: "TenStack University of Lagos",
//     projectDescription: "Example Description",
//     assignProject: "Team E",
//     hours: 16,
//     images: "/projectImagesDemo/5.jpg",
//   },
//   {
//     id: "9",
//     progress: 90,
//     projectName: "Data Pipeline",
//     status: "completed",
//     clientName: "carmella",
//     startDate: new Date("2025-03-01T00:00:00"),
//     endDate: new Date("2025-04-01T00:00:00"),
//     address: "TenStack University of Lagos",
//     projectDescription: "Example Description",
//     assignProject: "Team E",
//     hours: 16,
//     images: "/projectImagesDemo/5.jpg",
//   },
//   {
//     id: "9",
//     progress: 90,
//     projectName: "Data Pipeline",
//     status: "completed",
//     clientName: "carmella",
//     startDate: new Date("2025-03-01T00:00:00"),
//     endDate: new Date("2025-04-01T00:00:00"),
//     address: "TenStack University of Lagos",
//     projectDescription: "Example Description",
//     assignProject: "Team E",
//     hours: 16,
//     images: "/projectImagesDemo/5.jpg",
//   },
// ];

export type Data = {
  id: string;
  EmployeeId: string;
  // status: "pending" | "completed" | "ongoing";
  HospitalName: string;
  PatientName: string;
  // startDate: Date;
  // endDate: Date;
  // address?: string;
  // projectDescription?: string;
  // assignProject?: string;
  // hours?: number;
  // images?: string;
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
        <h1 className="text-[#525252]">Unique ID</h1>

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
        {row.original.EmployeeId}
      </Box>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "PatientName",
    header: () => (
      <Flex className="text-black text-start gap-1">
        <h1 className="text-[#525252]">Name</h1>
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
    accessorKey: "HospitalName",
    header: () => (
      <Flex className="text-black text-start gap-1">
        <h1 className="text-[#525252]">Providers</h1>
        <Stack className="gap-0 leading-3">
          <TiArrowSortedUp className="size-3.5 text-[#525252]" />
          <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
        </Stack>
      </Flex>
    ),
    cell: ({ row }) => (
      <Box className="text-start">{row.original.HospitalName}</Box>
    ),
  },
  {
    accessorKey: "actions",
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

export const InvoiceTable = () => {
  const [data, setData] = useState<Data[]>([])
  const { loading, setLoading } = useAdminStore()
  const getRecentInvoice = async () => {
    try {
      setLoading(true)
      const response = await axios.get("/admin/admin-getInvoice")
      // console.log(response.data.latestInvoice);
      setData(response.data.latestInvoice)
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something Went Wrong")
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    getRecentInvoice()
  }, [])

  return (
    <Box className="p-2 bg-white rounded-xl w-400 max-sm:w-full">
      <Stack className="gap-5 p-2">
        <Flex className="max-lg:flex-col items-start justify-between">
          <Flex className="justify-between w-full">
            <h1 className="text-lg font-medium max-sm:text-[0.9rem] max-md:text-[1.2rem] max-lg:text-[1rem]">
              Most Recent Invoice Activities
            </h1>
            <Flex className="gap-4">
              <Link to={'/dashboard/westrance-invoice'}>
                <h1 className="underline text-blue-500 ">View Invoice Page</h1>
              </Link>
            </Flex>
          </Flex>
        </Flex>
        <Curve className="-mt-1" />
      </Stack>

      <Box className="h-[680px] overflow-y-auto -mt-5">
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
          )
        }
      </Box>
    </Box>
  );
};
