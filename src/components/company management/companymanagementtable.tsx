import { ColumnDef, Row } from "@tanstack/react-table";
import * as React from "react";
import { Stack } from "@/components/ui/stack";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { Center } from "@/components/ui/center";
// import { IoIosArrowDown } from "react-icons/io";
import { Checkbox } from "@/components/ui/checkbox";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { Box } from "../ui/box";
import { Flex } from "../ui/flex";
// import { Ellipsis } from "lucide-react";
import { CompanyManagementHeaderProps } from "./companymanagementheader";
import { ReusableTable } from "../reusable/reusableTable";
import { Button } from "../ui/button";
import { axios } from "@/configs/axios.config";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useAdminStore, useCompanyStore } from "@/store/admininfo";
import { Loader } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";

// const data: Data[] = [
//   {
//     id: "1",
//     phonenumber: "+1 234 56789",
//     status: "active",
//     companyname: "Summit Mfg Ltd",
//     type: "Manufacturing",
//     emailaddress: "summitmfg@info",
//   },
//   {
//     id: "2",
//     phonenumber: "+1 234 56789",
//     companyname: "Summit Mfg Ltd",
//     status: "deactive",
//     type: "Manufacturing",
//     emailaddress: "summitmfg@info",
//   },
//   {
//     id: "3",
//     phonenumber: "+1 234 56789",
//     companyname: "App Design",
//     status: "active",
//     type: "Manufacturing",
//     emailaddress: "summitmfg@info",
//   },
//   {
//     id: "4",
//     phonenumber: "+1 234 56789",
//     companyname: "ken Stack",
//     status: "deactive",
//     type: "Manufacturing",
//     emailaddress: "summitmfg@info",
//   },
//   {
//     id: "5",
//     phonenumber: "+1 234 56789",
//     companyname: "Summit Mfg Ltd",
//     status: "active",
//     type: "Manufacturing",
//     emailaddress: "summitmfg@info",
//   },
//   {
//     id: "6",
//     phonenumber: "+1 234 56789",
//     companyname: "ken Stack",
//     status: "deactive",
//     type: "Manufacturing",
//     emailaddress: "summitmfg@info",
//   },
//   {
//     id: "7",
//     phonenumber: "+1 234 56789",
//     companyname: "API Dev",
//     status: "active",
//     type: "Manufacturing",
//     emailaddress: "summitmfg@info",
//   },
//   {
//     id: "8",
//     phonenumber: "+1 234 56789",
//     companyname: "ken Stack",
//     status: "deactive",
//     type: "Manufacturing",
//     emailaddress: "summitmfg@info",
//   },
//   {
//     id: "9",
//     phonenumber: "+1 234 56789",
//     companyname: "Summit Mfg Ltd",
//     status: "active",
//     type: "Manufacturing",
//     emailaddress: "summitmfg@info",
//   },
// ];

export type Data = {
  id: string;
  registrationNumber: string;
  status: "deactive" | "active";
  companyType: string;
  companyName: string;
  administrativeEmail?: string;
  companyId: string
};

export const columns = (
  goToStep: CompanyManagementHeaderProps["goToStep"]
): ColumnDef<Data>[] => [
    {
      accessorKey: "id",
      id: "id",
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
      accessorKey: "companyName",
      header: () => (
        <Flex className="text-black text-start gap-1">
          <h1 className="text-[#525252]">Company Name</h1>
          <Stack className="gap-0 leading-3">
            <TiArrowSortedUp className="size-3.5 text-[#525252]" />
            <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
          </Stack>
        </Flex>
      ),
      cell: ({ row }) => (
        <Box className="text-start">{row.original.companyName}</Box>
      ),
    },
    {
      accessorKey: "companyType",
      header: () => (
        <Flex className="text-black text-start gap-1">
          <h1 className="text-[#525252]">Type</h1>
          <Stack className="gap-0 leading-3">
            <TiArrowSortedUp className="size-3.5 text-[#525252]" />
            <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
          </Stack>
        </Flex>
      ),
      cell: ({ row }) => (
        <Box className="text-start">{row.original.companyType}</Box>
      ),
    },
    {
      accessorKey: "administrativeEmail",
      header: () => (
        <Flex className="text-black text-start gap-1">
          <h1 className="text-[#525252]">Email Address</h1>
          <Stack className="gap-0 leading-3">
            <TiArrowSortedUp className="size-3.5 text-[#525252]" />
            <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
          </Stack>
        </Flex>
      ),
      cell: ({ row }) => (
        <Box className="text-start">{row.original.administrativeEmail}</Box>
      ),
    },
    {
      accessorKey: "registrationNumber",
      header: () => (
        <Flex className="text-black text-start gap-1">
          <h1 className="text-[#525252]">Phone Number</h1>
          <Stack className="gap-0 leading-3">
            <TiArrowSortedUp className="size-3.5 text-[#525252]" />
            <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
          </Stack>
        </Flex>
      ),
      cell: ({ row }) => (
        <Box className="text-start">{row.original.registrationNumber}</Box>
      ),
    },
    // {
    //   accessorKey: "status",
    //   header: () => (
    //     <Flex className="text-black text-start gap-1">
    //       <h1 className="text-[#525252]">Status</h1>
    //       <Stack className="gap-0 leading-3">
    //         <TiArrowSortedUp className="size-3.5 text-[#525252]" />
    //         <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
    //       </Stack>
    //     </Flex>
    //   ),
    //   cell: () => {
    //     return (
    //       <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //           <Center className="bg-[#137fdf] text-white cursor-pointer hover:bg-[#137fdf]/80 hover:text-white rounded-sm w-32 h-9 justify-between items-center">
    //             <h1 className="text-[14px] px-2">Active</h1>
    //             <Center className="bg-[#0e66b7] rounded-tr-sm rounded-br-sm h-9 w-10">
    //               <IoIosArrowDown className="size-4" />
    //             </Center>
    //           </Center>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align="start" className="p-1">
    //           <DropdownMenuCheckboxItem className="p-2">
    //             Active
    //           </DropdownMenuCheckboxItem>
    //           <DropdownMenuCheckboxItem className="p-2">
    //             Deactive
    //           </DropdownMenuCheckboxItem>
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //     );
    //   },
    // },
    {
      accessorKey: "actions",
      header: () => (
        <Center className="text-black gap-1">
          <h1 className="text-[#525252]">Actions</h1>
          <Stack className="gap-0 leading-3">
            <TiArrowSortedUp className="size-3.5 text-[#525252]" />
            <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
          </Stack>
        </Center>
      ),
      cell: ({ row }) => {
        const companyId = row.original.companyId
        const { setSelectedCompany } = useCompanyStore()
        const { setLoading } = useAdminStore()
        return (
          <Center className="items-center">
            <Button
              variant="outline"
              onClick={async () => {
                try {
                  setLoading(true)
                  const response = await axios.get(`/admin/company-detail/${companyId}`)
                  setSelectedCompany(response.data.company)
                } catch (error: any) {
                  toast.error(error?.response?.data?.message)
                } finally {
                  setLoading(false)
                }
                goToStep("view company details");
              }}
              className="bg-white cursor-pointer hover:bg-gray-50 border-1 border-[#1055ba] text-[#1055ba] w-26"
            >
              View Details
            </Button>
          </Center>
        );
      },
    },
  ];

export const CompanyManagementTable: React.FC<CompanyManagementHeaderProps> = ({
  goToStep,
}) => {
  const handleAction = (action: string, row: Row<Data>) => {
    if (action === "view company details") {
      goToStep("view company details");
    } else if (action === "delete") {
      console.log("Deleting:", row.original);
    }
  };
  const [data, setData] = useState([])
  const { loading, setLoading } = useAdminStore()
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10

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
  const fetchcompany = async (page: number) => {
    try {
      setLoading(true)
      const res = await axios.get(`/admin/company-management?page=${page}&limit=${limit}`)
      // console.log(res);
      setData(res.data.company)
      setTotalPages(res.data.pagination.totalPages)
      setCurrentPage(res.data.pagination.page);
    } catch (error: any) {
      toast.error(error?.res?.data?.message)
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    fetchcompany(currentPage)
  }, [currentPage])

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
            headerDescription="View, manage, and monitor all registered companies on the platform."
            onRowClick={(row) => console.log("Row clicked:", row.original)}
            enableHospitalColumnVisibility={false}
            enableEmployeeColumnVisibility={false}
            enableCompanyEmpManagement={false}
            enableCompanyColumnVisibility={false}
            searchInput={false}
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
    </>
  );
};
