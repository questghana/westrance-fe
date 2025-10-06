import { ColumnDef, Row } from "@tanstack/react-table";
import * as React from "react";
import { Stack } from "@/components/ui/stack";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Center } from "@/components/ui/center";
import { Checkbox } from "@/components/ui/checkbox";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { Box } from "../ui/box";
import { Flex } from "../ui/flex";
import { Ellipsis, Loader } from "lucide-react";
import { ReusableTable } from "../reusable/reusableTable";
import { WestranceSupportCenterHeaderProps } from "./westrancesupportcenterheader";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { useAdminStore, useTicketStore } from "@/store/admininfo";
import { axios } from "@/configs/axios.config";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";
// const data: Data[] = [
//   {
//     id: "20240923001",
//     status: "Completed",
//     submittedby: "Jimmy Jane",
//     submittedDate: new Date("08, May. 2025"),
//   },
//   {
//     id: "20240923001",
//     submittedby: "Jimmy Jane",
//     status: "Pending",
//     submittedDate: new Date("08, May. 2025"),
//   },
//   {
//     id: "20240923001",
//     submittedby: "App Design",
//     status: "Completed",
//     submittedDate: new Date("08, May. 2025"),
//   },
//   {
//     id: "20240923001",
//     submittedby: "ken Stack",
//     status: "Pending",
//     submittedDate: new Date("08, May. 2025"),
//   },
//   {
//     id: "20240923001",
//     submittedby: "Jimmy Jane",
//     status: "Completed",
//     submittedDate: new Date("08, May. 2025"),
//   },
//   {
//     id: "20240923001",
//     submittedby: "ken Stack",
//     status: "Pending",
//     submittedDate: new Date("08, May. 2025"),
//   },
//   {
//     id: "20240923001",
//     submittedby: "API Dev",
//     status: "Completed",
//     submittedDate: new Date("08, May. 2025"),
//   },
//   {
//     id: "20240923001",
//     submittedby: "ken Stack",
//     status: "Pending",
//     submittedDate: new Date("08, May. 2025"),
//   },
//   {
//     id: "20240923001",
//     submittedby: "Jimmy Jane",
//     status: "Completed",
//     submittedDate: new Date("08, May. 2025"),
//   },
// ];

export type Data = {
  id: string;
  status: "Pending" | "Approved";
  createdAt: Date;
  administrativeName: string;
  companyId: string
};

export const columns = (
  goToStep: WestranceSupportCenterHeaderProps["goToStep"]
): ColumnDef<Data>[] => [
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
          <h1 className="text-[#525252]">ID</h1>

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
      accessorKey: "administrativeName",
      header: () => (
        <Flex className="text-black text-start gap-1">
          <h1 className="text-[#525252]">Submitted By</h1>
          <Stack className="gap-0 leading-3">
            <TiArrowSortedUp className="size-3.5 text-[#525252]" />
            <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
          </Stack>
        </Flex>
      ),
      cell: ({ row }) => (
        <Box className="captelize text-start">{row.original.administrativeName}</Box>
      ),
    },
    {
      accessorKey: "createdAt",
      header: () => (
        <Flex className="text-black text-start gap-1 pr-32">
          <h1 className="text-[#525252]">Submitted Date</h1>
          <Stack className="gap-0 leading-3">
            <TiArrowSortedUp className="size-3.5 text-[#525252]" />
            <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
          </Stack>
        </Flex>
      ),
      cell: ({ row }) => (
        <Box className="lowercase text-start pr-32">
          {format(row.original.createdAt, "dd, MMM, yyyy")}
        </Box>
      ),
    },
    {
      accessorKey: "status",
      header: () => (
        <Flex className="text-black text-start gap-1 pl-22">
          <h1 className="text-[#525252]">Status</h1>
          <Stack className="gap-0 leading-3">
            <TiArrowSortedUp className="size-3.5 text-[#525252]" />
            <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
          </Stack>
        </Flex>
      ),
      cell: ({ row }) => {
        return (
          <Box className="pl-22">
            <Button className={`min-w-[120px] text-center px-6 py-5 cursor-pointer ${row.original.status === "Approved" ? "bg-[#C7D0FF] hover:bg-[#c7d0ffe2] text-[#0A51BA]" : "bg-[#FFE4CC] hover:bg-[#ffe4cce4] text-[#FD7600]"}`}>{row.original.status}</Button>
          </Box>
        );
      },
    },
    {
      accessorKey: "actions",
      header: () => (
        <Flex className="text-black text-center gap-1">
          <h1 className="text-[#525252]">Actions</h1>
          <Stack className="gap-0 leading-3">
            <TiArrowSortedUp className="size-3.5 text-[#525252]" />
            <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
          </Stack>
        </Flex>
      ),
      cell: ({ row }) => {
        const companyId = row.original.companyId
        const { setLoading } = useAdminStore()
        const {setSelectedTicket} = useTicketStore()
        return (
          <Center>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Ellipsis className="text-gray-400" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="p-1">
                <DropdownMenuCheckboxItem
                  className="p-2"
                  onClick={async () => {
                    try {
                      setLoading(true)
                      const response = await axios.get(`/admin/getTicket/${companyId}`)
                      console.log(response);
                      setSelectedTicket(response.data.getTicketById)
                    } catch (error: any) {
                      toast.error(error?.response?.data?.error || "Something Went Wrong")
                    } finally {
                      setLoading(false)
                    }
                    goToStep("view support details")
                  }
                  }
                >
                  View Details
                </DropdownMenuCheckboxItem>
                {/* <DropdownMenuCheckboxItem className="p-2 text-red-500">
                  Delete
                </DropdownMenuCheckboxItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </Center>
        );
      },
    },
  ];

export const SupportCenterTable: React.FC<WestranceSupportCenterHeaderProps> = ({ goToStep }) => {
  // const { tickets } = useTicketStore()
  const [data, setData] = useState<Data[]>([])
  const { loading, setLoading } = useAdminStore()
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10

  const fetchAllTickets = async (page: number) => {
    try {
      setLoading(true)
      const response = await axios.get(`/admin/getAllTickets?page=${page}&limit=${limit}`)
      // console.log(response);
      setData(response.data.getAllTickets)
      setTotalPages(response.data.totalPages)
      setCurrentPage(response.data.currentPage)
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllTickets(currentPage)
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

  const handleAction = (action: string, row: Row<Data>) => {
    if (action === "view support details") {
      goToStep("view support details");
    } else if (action === "delete") {
      console.log("Deleting:", row.original);
    }
  };
  return (
    <>
      {
        loading ? (
          <Center className="py-10 text-gray-500">
            <Loader className="animate-spin" /> Loading...
          </Center>
        ) : (
          <ReusableTable
            data={data}
            columns={columns(handleAction)}
            headerDescription="Get help, find answers to your questions, or contact support for quick assistance."
            headerDescriptionWidth="max-w-[550px]"
            onRowClick={(row) => console.log("Row clicked:", row.original)}
            enableHospitalColumnVisibility={false}
            enableEmployeeColumnVisibility={false}
            enableCompanyEmpManagement={false}
            enableCompanyColumnVisibility={true}
            enableActiveExportColumnVisibility={false}
            searchInput={false}
            addemployeelogo={false}
            Filterbutton={false}
          />
        )
      }
      < Pagination className="flex justify-end mt-2">
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
      </Pagination >
    </>
  );
};
