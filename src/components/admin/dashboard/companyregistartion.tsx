import {
  ColumnDef,
} from "@tanstack/react-table";
import { Flex } from "../../ui/flex";
import { Box } from "../../ui/box";
import { Stack } from "@/components/ui/stack";
import { Curve } from "@/components/common/curve";
import { Checkbox } from "@/components/ui/checkbox";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { ReusableTable } from "@/components/reusable/reusableTable";
import { useEffect, useState } from "react";
import { axios } from "@/configs/axios.config";
import { toast } from "sonner";
import { useAdminStore } from "@/store/admininfo";
import { Center } from "@/components/ui/center";
import { Loader } from "lucide-react";

// const data: Data[] = [
//   {
//     projectName: "ken Stack",
//     clientName: "0330000001",
//   },
//   {
//     projectName: "Web Dev",
//     clientName: "0330000001",
//   },
//   {
//     projectName: "App Design",
//     clientName: "0330000001",
//   },
//   {
//     projectName: "ken Stack",
//     clientName: "0330000001",
//   },
//   {
//     projectName: "Cloud Migration",
//     clientName: "0330000001",
//   },
//   {
//     projectName: "ken Stack",
//     clientName: "0330000001",
//   },
//   {
//     projectName: "ken Stack",
//     clientName: "0330000001",
//   },
//   {
//     projectName: "ken Stack",
//     clientName: "0330000001",
//   },
//   {
//     projectName: "ken Stack",
//     clientName: "0330000001",
//   },
//   {
//     projectName: "ken Stack",
//     clientName: "0330000001",
//   },
//   {
//     projectName: "ken Stack",
//     clientName: "0330000001",
//   },
//   {
//     projectName: "ken Stack",
//     clientName: "0330000001",
//   },
// ];

export type Data = {
  companyName: string;
  registrationNumber: string;
};

export const columns = (): ColumnDef<Data>[] => [
  {
    accessorKey: "companyName",
    header: ({ table }) => (
      <Box className="text-start text-black flex items-center gap-2">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="border border-gray-300 bg-white"
        />
        <h1 className="text-[#525252]">Name</h1>

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
        {row.original.companyName}
      </Box>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "registrationNumber",
    header: () => (
      <Flex className="text-black text-start gap-1">
        <h1 className="text-[#525252]">Contact</h1>
        <Stack className="gap-0 leading-3">
          <TiArrowSortedUp className="size-3.5 text-[#525252]" />
          <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
        </Stack>
      </Flex>
    ),
    cell: ({ row }) => (
      <Box className="lowercase text-start">{row.original.registrationNumber}</Box>
    ),
  },
  // {
  //   accessorKey: "actions",
  //   header: () => (
  //     <Flex className="text-black text-start gap-1">
  //       <h1 className="text-[#525252]">Actions</h1>
  //       <Stack className="gap-0 leading-3">
  //         <TiArrowSortedUp className="size-3.5 text-[#525252]" />
  //         <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
  //       </Stack>
  //     </Flex>
  //   ),
  //   cell: () => {
  //     return (
  //       <Flex className="space-x-2 items-start underline text-blue-500">
  //         View Details
  //       </Flex>
  //     );
  //   },
  // },
];

export const CompanyRegistration = () => {
  const [data, setData] = useState<Data[]>([])
  const { loading, setLoading } = useAdminStore()

  const getRecentCompany = async () => {
    try {
      setLoading(true)
      const response = await axios.get("/admin/admin-getCompany")
      setData(response.data.latestCompany)
      // console.log(response.data.latestCompany);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something Went Wrong")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getRecentCompany()
  }, [])

  return (
    <Box className="p-2 bg-white rounded-xl w-full">
      <Stack className="gap-5 p-2">
        <Flex className="max-lg:flex-col items-start justify-between">
          <Flex className="justify-between w-full">
            <h1 className="text-lg font-medium max-sm:text-[0.9rem] max-md:text-[1.2rem] max-lg:text-[1rem]">
              Recent Company Registrations
            </h1>
          </Flex>
        </Flex>
        <Curve className="-mt-1" />
      </Stack>
      <Box className="-mt-5 w-full h-[365px] overflow-y-auto overflow-x-auto">
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
