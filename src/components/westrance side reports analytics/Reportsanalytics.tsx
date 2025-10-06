import React, { useEffect, useState } from "react";
import { Box } from "../ui/box";
import { Stack } from "../ui/stack";
import { Flex } from "../ui/flex";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Center } from "../ui/center";
import { IoIosArrowDown } from "react-icons/io";
import benefit from "/companyside/benefit.svg";
import coveredemp from "/companyside/coveredemp.svg";
import medicalcovered from "/companyside/medicalcovered.svg";
import utilizationrate from "/companyside/utilizationrate.svg";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Link } from "react-router";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { ReusableTable } from "../reusable/reusableTable";
import { ComponentWrapper } from "../common/componentwrapper";
import { axios } from "@/configs/axios.config";
import { toast } from "sonner";
import { useAuthStore } from "@/store/userInfo.store";
import { Loader } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";
import DownloadPDFButton from "../common/downloadPDFButton";

type Stat = {
  icon?: string;
  title: string;
  count: string | React.ReactNode;
  link: string;
  bgColor: string;
  bgIconColor: string;
  iconColor?: string;
};

// const data: Data[] = [
//   {
//     id: "20240923001",
//     EmpName: "Michael Greene",
//     HospharName: "Mercy Health Hospital",
//     UseAmt: "$4,000",
//     TotalAmount: "$10,00",
//     BalanceAmount: "$10,00",
//   },
//   {
//     id: "20240923001",
//     EmpName: "Michael doe",
//     HospharName: "Mercy Health Hospital",
//     UseAmt: "$350",
//     TotalAmount: "$350",
//     BalanceAmount: "$10,00",
//   },
//   {
//     id: "20240923001",
//     EmpName: "Michael Greene",
//     HospharName: "Mercy Health Hospital",
//     UseAmt: "$4,000",
//     TotalAmount: "$10,00",
//     BalanceAmount: "$10,00",
//   },
//   {
//     id: "20240923001",
//     EmpName: "Michael Greene",
//     HospharName: "Mercy Health Hospital",
//     UseAmt: "$4,000",
//     TotalAmount: "$10,00",
//     BalanceAmount: "$10,00",
//   },
//   {
//     id: "20240923001",
//     EmpName: "Michael Greene",
//     HospharName: "Mercy Health Hospital",
//     UseAmt: "$4,000",
//     TotalAmount: "$10,00",
//     BalanceAmount: "$10,00",
//   },
//   {
//     id: "20240923001",
//     EmpName: "Michael Greene",
//     HospharName: "Mercy Health Hospital",
//     UseAmt: "$4,000",
//     TotalAmount: "$10,00",
//     BalanceAmount: "$10,00",
//   },
//   {
//     id: "20240923001",
//     EmpName: "Michael Greene",
//     HospharName: "Mercy Health Hospital",
//     UseAmt: "$4,000",
//     TotalAmount: "$10,00",
//     BalanceAmount: "$10,00",
//   },
//   {
//     id: "20240923001",
//     EmpName: "Michael Greene",
//     HospharName: "Mercy Health Hospital",
//     UseAmt: "$4,000",
//     TotalAmount: "$10,00",
//     BalanceAmount: "$10,00",
//   },
//   {
//     id: "20240923001",
//     EmpName: "Michael Greene",
//     HospharName: "Mercy Health Hospital",
//     UseAmt: "$4,000",
//     TotalAmount: "$10,00",
//     BalanceAmount: "$10,00",
//   },
// ];

export type Data = {
  id: string;
  EmployeeId: string;
  PatientName: string;
  HospitalName: string;
  Amount: string;
  TotalAmount: string;
  RemainingBalance: string;
  employeeAmountPackage: string | null;
  hospitalEmployeeAmountPackage: string | null;
  BenefitUsed: string;
  SubmittedDate: string;
};

export const columns = (): ColumnDef<Data>[] => [
  {
    id: "Unique ID",
    header: ({ table }) => (
      <Box className="text-start text-black flex items-center gap-2 w-30">
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
        <h1 className="text-[#525252]">Employee Name</h1>
        <Stack className="gap-0 leading-3">
          <TiArrowSortedUp className="size-3.5 text-[#525252]" />
          <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
        </Stack>
      </Flex>
    ),
    cell: ({ row }) => (
      <Box className="ml-2 text-start">{row.original.PatientName}</Box>
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
      <Box className="ml-2 text-start">{row.original.HospitalName}</Box>
    ),
  },
  {
    accessorKey: "Amount",
    header: () => (
      <Flex className="text-black text-start gap-1">
        <h1 className="text-[#525252]">Use Amount (GHS)</h1>
        <Stack className="gap-0 leading-3">
          <TiArrowSortedUp className="size-3.5 text-[#525252]" />
          <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
        </Stack>
      </Flex>
    ),
    cell: ({ row }) => {
      return (
        <Box className="ml-2 text-start">{row.original.Amount}</Box>
      );
    },
  },
  {
    accessorKey: "Total Amount (GHS)",
    header: () => (
      <Flex className="text-black text-start gap-1">
        <h1 className="text-[#525252]">Total Amount (GHS)</h1>
        <Stack className="gap-0 leading-3">
          <TiArrowSortedUp className="size-3.5 text-[#525252]" />
          <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
        </Stack>
      </Flex>
    ),
    cell: ({ row }) => {
      const TotalAmount = Number(row.original.Amount) + Number(row.original.RemainingBalance)
      return <Box className="ml-2 text-start">{TotalAmount || "N/A"}</Box>;
    },
  },
  {
    accessorKey: "RemainingBalance",
    header: () => (
      <Flex className="text-black text-start gap-1 w-50">
        <h1 className="text-[#525252]">Balance Amount (GHS)</h1>
        <Stack className="gap-0 leading-3">
          <TiArrowSortedUp className="size-3.5 text-[#525252]" />
          <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
        </Stack>
      </Flex>
    ),
    cell: ({ row }) => {
      return (
        <Box className="ml-2 text-start">{row.original.RemainingBalance}</Box>
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

const Reportsanalytics: React.FC<{ className?: string }> = ({ className }) => {
  const [data, setData] = useState<Data[]>([])
  const [statsData, setStatsData] = useState<any>(null)
  const [statsLoading, setStatsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { loading, setLoading } = useAuthStore()
  const limit = 10
  
  const getStatistics = async () => {
    try {
      setStatsLoading(true)
      const response = await axios.get('/admin/reports-analytics-statistics')
      setStatsData(response.data.statistics)
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Failed to load statistics");
    } finally {
      setStatsLoading(false)
    }
  }

  const getInvoice = async (page: number) => {
    try {
      setLoading(true)  
      const response = await axios.get(`/admin/report-analytics?page=${page}&limit=${limit}`)
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
    getStatistics()
  }, [])

  useEffect(() => {
    getInvoice(currentPage)
  }, [currentPage])

  const stats: Stat[] = [
    {
      link: "#",
      title: "Total Employees Covered",
      icon: coveredemp,
      count: statsLoading ? <Loader className="animate-spin" /> : statsData?.totalEmployeesCovered || "0",
      bgColor: "#e9eefd",
      bgIconColor: "#daeefc",
      iconColor: "#6da4de",
    },
    {
      link: "#",
      title: "Total Medical Covered",
      icon: medicalcovered,
      count: statsLoading ? <Loader className="animate-spin" /> : statsData?.totalMedicalCovered || "0",
      bgColor: "#f5edfd",
      bgIconColor: "#e8dcfc",
      iconColor: "#715bc0",
    },
    {
      link: "#",
      title: "Total Benefits Utilized",
      icon: benefit,
      count: statsLoading ? <Loader className="animate-spin" /> : statsData?.totalBenefitsUtilized || "₵ 0",
      bgColor: "#e7fcf7",
      bgIconColor: "#d2f3eb",
      iconColor: "#499581",
    },
    {
      link: "#",
      title: "Average Utilization Rate",
      icon: utilizationrate,
      count: statsLoading ? <Loader className="animate-spin" /> : statsData?.averageUtilizationRate || "0%",
      bgColor: "#fff7ec",
      bgIconColor: "#fff2e0",
      iconColor: "#f0ac5c",
    },
  ];

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
    <Stack>
      <Box className="bg-white px-4 py-3 rounded-2xl">
        <Stack>
          <p className="font-medium">Reports & Analytics</p>
          <Flex className="flex-col lg:flex-row justify-between">
            <Box className="bg-[#F6FAFF] rounded-md lg:w-[400px] md:w-[450px] px-4 py-4">
              <p>Monitor performance with real-time reports and analytics.</p>
            </Box>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Center className="bg-[#1055ba] text-white cursor-pointer hover:bg-[#1055ba]/80 hover:text-white rounded-sm w-36 h-11 px-0 justify-between items-center">
                  <h1 className="text-[14px] px-2">Exports</h1>
                  <Center className="bg-[#0e66b7] rounded-tr-sm rounded-br-sm h-10 w-10">
                    <IoIosArrowDown className="size-4" />
                  </Center>
                </Center>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="p-1">
                <DropdownMenuCheckboxItem className="p-2">
                  Export All
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="p-2">
                  Export Selected
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="p-2">
                  Export Current Page
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Flex>

          <Box className="pt-2">
            <p className="font-medium">Statistics</p>
            <Box
              className={cn(
                "grid gap-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  mt-2",
                className
              )}
            >
              {stats.map((item: Stat, index: number) => (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        key={index}
                        style={{ backgroundColor: item.bgColor }}
                        to={item.link}
                        className=" px-5 py-8 relative overflow-hidden cursor-pointer bg-slate-50 border-4 border-white rounded-2xl "
                      >
                        <Box
                          style={{ backgroundColor: item.iconColor }}
                          className="bg-red-300 w-1 h-15 absolute left-0 opacity-85"
                        ></Box>
                        <Flex className="justify-between items-center">
                          <h2 className="text-sm font-medium">{item.title}</h2>
                          <Center
                            style={{ backgroundColor: item.bgIconColor }}
                            className={`bg-white borde-none rounded-md absolute bottom-2 right-2 px-2 py-1`}
                          >
                            <img
                              src={item.icon}
                              width={10}
                              height={10}
                              className="size-10 opacity-85"
                            />
                          </Center>
                        </Flex>
                        <p className="text-2xl font-bold mt-1">{item.count}</p>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className="mb-2">
                      <p>Click to view {item.title}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </Box>
          </Box>
        </Stack>
      </Box>

      <ComponentWrapper className="p-2">
        {
          loading ? (
            <Center className="py-10 text-gray-500">
              <Loader className="animate-spin" /> Loading...
            </Center>
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
              enableReportAnalyticsVisibility={false}
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
    </Stack>
  );
};

export default Reportsanalytics;
