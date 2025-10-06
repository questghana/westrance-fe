import { ColumnDef, Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
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
import { HospitalPharmacyHeaderProps } from "./hospitalheader";
import { ReusableTable } from "../reusable/reusableTable";
import { axios } from "@/configs/axios.config";
import { toast } from "sonner";
import { useEffect, useState } from "react"
import { useAdminStore, useCompanyStore } from "@/store/admininfo";
import { Loader } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";
// const data: Data[] = [
//   {
//     id: "1",
//     phonenumber: "+1 234 56789",
//     status: "active",
//     companyname: "Summit Mfg Ltd",
//     type: "Hospital",
//   },
//   {
//     id: "2",
//     phonenumber: "+1 234 56789",
//     companyname: "Summit Mfg Ltd",
//     status: "deactive",
//     type: "Hospital",
//   },
//   {
//     id: "3",
//     phonenumber: "+1 234 56789",
//     companyname: "App Design",
//     status: "ongoing",
//     type: "Pharmacy",
//   },
//   {
//     id: "4",
//     phonenumber: "+1 234 56789",
//     companyname: "Ken Stack",
//     status: "deactive",
//     type: "Hospital",
//   },
//   {
//     id: "5",
//     phonenumber: "+1 234 56789",
//     companyname: "Summit Mfg Ltd",
//     status: "active",
//     type: "Hospital",
//   },
//   {
//     id: "6",
//     phonenumber: "+1 234 56789",
//     companyname: "Ken Stack",
//     status: "deactive",
//     type: "Pharmacy",
//   },
//   {
//     id: "7",
//     phonenumber: "+1 234 56789",
//     companyname: "Api Dev",
//     status: "ongoing",
//     type: "Pharmacy",
//   },
//   {
//     id: "8",
//     phonenumber: "+1 234 56789",
//     companyname: "Ken Stack",
//     status: "deactive",
//     type: "Hospital",
//   },
//   {
//     id: "9",
//     phonenumber: "+1 234 56789",
//     companyname: "Summit Mfg Ltd",
//     status: "active",
//     type: "Hospital",
//   },
// ];

export type Data = {
  registrationNumber: string;
  status: string;
  companyType: string;
  companyName: string;
  companyId: string
};

export const columns = (
  goToStep: HospitalPharmacyHeaderProps["goToStep"]
): ColumnDef<Data>[] => [
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
        <Flex className="text-start items-center gap-2">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="border border-gray-300 bg-white"
          />
          {row.original.companyName}
        </Flex>
      ),
      enableSorting: true,
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
        <Box className="capitalize text-start">{row.original.companyType}</Box>
      ),
    },
    {
      accessorKey: "registrationNumber",
      header: () => (
        <Flex className="text-black text-start gap-1 pr-6">
          {" "}
          {/* Add pr-6 for right padding */}
          <h1 className="text-[#525252]">Phone Number</h1>
          <Stack className="gap-0 leading-3">
            <TiArrowSortedUp className="size-3.5 text-[#525252]" />
            <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
          </Stack>
        </Flex>
      ),
      cell: ({ row }) => (
        <Box className="lowercase text-start pr-6">
          {" "}
          {/* Add pr-6 for right padding */}
          {row.original.registrationNumber}
        </Box>
      ),
    },
    // {
    //   accessorKey: "status",
    //   header: () => (
    //     <Flex className="text-black justify-center items-center text-start gap-1 pl-6">
    //       {" "}
    //       <h1 className="text-[#525252]">Status</h1>
    //       <Stack className="gap-0 leading-3">
    //         <TiArrowSortedUp className="size-3.5 text-[#525252]" />
    //         <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
    //       </Stack>
    //     </Flex>
    //   ),
    //   cell: () => {
    //     return (
    //       <Center className="items-end justify-end pl-6">
    //         {" "}
    //         <DropdownMenu>
    //           <DropdownMenuTrigger asChild>
    //             <Center className="bg-[#137fdf] text-white cursor-pointer hover:bg-[#137fdf]/80 hover:text-white rounded-sm w-32 h-9 justify-between items-center">
    //               <h1 className="text-[14px] px-2">Active</h1>
    //               <Center className="bg-[#0e66b7] rounded-tr-sm rounded-br-sm h-9 w-10">
    //                 <IoIosArrowDown className="size-4" />
    //               </Center>
    //             </Center>
    //           </DropdownMenuTrigger>
    //           <DropdownMenuContent align="start" className="p-1">
    //             <DropdownMenuCheckboxItem className="p-2">
    //               Active
    //             </DropdownMenuCheckboxItem>
    //             <DropdownMenuCheckboxItem className="p-2">
    //               Deactive
    //             </DropdownMenuCheckboxItem>
    //           </DropdownMenuContent>
    //         </DropdownMenu>
    //       </Center>
    //     );
    //   },
    // },
    {
      accessorKey: "actions",
      header: () => (
        <Flex className="text-black justify-center items-center text-center gap-1">
          <h1 className="text-[#525252]">Actions</h1>
          <Stack className="gap-0 leading-3">
            <TiArrowSortedUp className="size-3.5 text-[#525252]" />
            <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
          </Stack>
        </Flex>
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
                  const response = await axios.get(`/admin/HospitalPharmacy-detail/${companyId}`)
                  setSelectedCompany(response.data.company)
                } catch (error: any) {
                  toast.error(error?.response?.data?.message)
                } finally {
                  setLoading(false)
                }
                goToStep("view hospital pharmacy details");
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

export const HospitalTable: React.FC<HospitalPharmacyHeaderProps> = ({
  goToStep,
}) => {
  const handleAction = (action: string, row: Row<Data>) => {
    if (action === "view hospital pharmacy details") {
      goToStep("view hospital pharmacy details");
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

  const hospitalpharmacy = async (page: number) => {
    try {
      setLoading(true)
      const res = await axios.get(`/admin/hospital-pharmacy?page=${page}&limit=${limit}`)
      setData(res.data.HospitalPharmacy)
      setTotalPages(res.data.pagination.totalPages)
      setCurrentPage(res.data.pagination.page);
    } catch (error: any) {
      toast.error(error?.res?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    hospitalpharmacy(currentPage)
  }, [currentPage])
  return (
    <>
      {loading ? (
        <Center className="py-10 text-gray-500">
          <Loader className="animate-spin" /> Loading...
        </Center>
      ) : (
        <ReusableTable
          data={data}
          columns={columns(handleAction)}
          headerDescription="Monitor all registered hospitals and pharmacies, track contact information, registration status, and maintain up-to-date records for seamless healthcare operations."
          onRowClick={(row) => console.log('Row clicked:', row.original)}
          enableCompanyColumnVisibility={false}
          enableEmployeeColumnVisibility={false}
          enableCompanyEmpManagement={false}
          headerDescriptionWidth="max-w-[650px]"
          enableHospitalColumnVisibility={false}
          searchInput={false}
          addemployeelogo={false}
          Filterbutton={false}
        />
      )}
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
