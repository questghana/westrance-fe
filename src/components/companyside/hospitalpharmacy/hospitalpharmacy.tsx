import React, { useEffect } from "react";
// import { Box } from "../ui/box";
// import { Stack } from "../ui/stack";
// import { Flex } from "../ui/flex";
// import { Input } from "../ui/input";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";
// import { Button } from "../ui/button";
// import { ListFilter, Search } from "lucide-react";
// import {
//   ColumnDef,
//   ColumnFiltersState,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   Row,
//   SortingState,
//   useReactTable,
//   VisibilityState,
// } from "@tanstack/react-table";
// import { Checkbox } from "../ui/checkbox";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
// import { Center } from "../ui/center";
import { IoIosArrowDown } from "react-icons/io";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import { cn } from "@/lib/utils";
import { Box } from "@/components/ui/box";
import { Stack } from "@/components/ui/stack";
import { Flex } from "@/components/ui/flex";
// import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Center } from "@/components/ui/center";
import { ReusableTable } from "@/components/reusable/reusableTable";
import { ColumnDef } from "@tanstack/react-table";
import { Companydetails } from "@/store/userInfo.store";
import { useRegisterStore } from "@/store/companyRegistrationStore";
import fetchCompany from "@/hooks/usecompany";
import { Loader } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

// const data: Data[] = [
//   {
//     id: "1",
//     phonenumber: "Bennett+1 212-555-0191",
//     status: "completed",
//     type: "Pharmacy",
//     Name: "MedLine General Hospital",
//   },
//   {
//     id: "2",
//     phonenumber: "Bennett+1 212-555-0191",
//     status: "completed",
//     type: "Pharmacy",
//     Name: "Agha General Hospital",
//   },
//   {
//     id: "3",
//     phonenumber: "Bennett+1 212-555-0191",
//     status: "completed",
//     type: "Pharmacy",
//     Name: "Civil General Hospital",
//   },
//   {
//     id: "4",
//     phonenumber: "Bennett+1 212-555-0191",
//     status: "completed",
//     type: "Pharmacy",
//     Name: "Jinnah General Hospital",
//   },
//   {
//     id: "5",
//     phonenumber: "Bennett+1 212-555-0191",
//     status: "completed",
//     type: "Pharmacy",
//     Name: "MedLine General Hospital",
//   },
//   {
//     id: "6",
//     phonenumber: "Bennett+1 212-555-0191",
//     status: "completed",
//     type: "Hospital",
//     Name: "MedLine General Hospital",
//   },
//   {
//     id: "7",
//     phonenumber: "Bennett+1 212-555-0191",
//     status: "completed",
//     type: "Hospital",
//     Name: "MedLine General Hospital",
//   },
//   {
//     id: "8",
//     phonenumber: "Bennett+1 212-555-0191",
//     status: "completed",
//     type: "Hospital",
//     Name: "MedLine General Hospital",
//   },
//   {
//     id: "9",
//     phonenumber: "Bennett+1 212-555-0191",
//     status: "completed",
//     type: "Hospital",
//     Name: "MedLine General Hospital",
//   },
// ];

// export type Data = {
//   id: string;
//   phonenumber: string;
//   status: "pending" | "completed" | "ongoing";
//   type: string;
//   Name: string;
// };

export const columns = (): ColumnDef<Companydetails>[] => [
  {
    accessorKey: "companyType",
    id: "Name",
    header: ({ table }) => (
      <Box className="text-start text-black flex items-center gap-2 w-50">
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
      <Flex className="text-black text-start gap-1 w-20">
        <h1 className="text-[#525252]">Type</h1>
        <Stack className="gap-0 leading-3">
          <TiArrowSortedUp className="size-3.5 text-[#525252]" />
          <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
        </Stack>
      </Flex>
    ),
    cell: ({ row }) => (
      <Box className="lowercase text-start">{row.original.companyType}</Box>
    ),
  },
  {
    accessorKey: "registrationNumber",
    header: () => (
      <Flex className="text-black text-start gap-1 w-[500px]">
        <h1 className="text-[#525252]">Phone Number</h1>
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
  {
    accessorKey: "status",
    header: () => (
      <Flex className="text-black text-start gap-1">
        <h1 className="text-[#525252]">Status</h1>
        <Stack className="gap-0 leading-3">
          <TiArrowSortedUp className="size-3.5 text-[#525252]" />
          <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
        </Stack>
      </Flex>
    ),
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Center className={`bg-[#137fdf] text-white cursor-pointer hover:text-white rounded-sm w-32 h-9 justify-between items-center ${row.original.isActive ? "bg-[#137fdf]" : "bg-[#f00]"}`}>
              <h1 className="text-[14px] px-2">{row.original.isActive ? "Active" : "Deactive"}</h1>
              <Center className={`bg-[#0e66b7] rounded-tr-sm rounded-br-sm h-9 w-10 ${row.original.isActive ? "bg-[#0e66b7]" : "bg-[#f00]"}`}>
                <IoIosArrowDown className="size-4" />
              </Center>
            </Center>
          </DropdownMenuTrigger>
        </DropdownMenu>
      );
    },
  },
];


const Hospitalpharmacy: React.FC = () => {
  const {companyDetail, loading } = useRegisterStore()
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const limit = 10


  useEffect(() => {
    const loadCompany = async () => {
      const pagination = await fetchCompany(currentPage, limit);
      if (pagination) {
        setTotalPages(pagination.totalPages);
      }
    };
    loadCompany();
  }, [currentPage]);

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

  // useEffect(() => {
  //   fetchCompany();
  // }, []);


  return (
    <Box className="bg-white px-4 py-3 rounded-2xl">
      <Stack className="gap-0">
        <p className="font-medium">Hospital & Pharmacies</p>
        {
          loading ? (
            <Center className="py-10 text-gray-500"><Loader className="animate-spin" />Loading...</Center>
          ) : (
            <ReusableTable
              data={companyDetail as any}
              columns={columns() as any}
              headerDescription="Manage all registered hospitals and pharmacies, track contact information, registration status, and maintain up-to-date records for seamless healthcare operations."
              // onRowClick={(row) => console.log("Row clicked:", row.original)}
              enableCompanyColumnVisibility={false}
              enableEmployeeColumnVisibility={false}
              searchInput={false}
              enableHospitalColumnVisibility={false}
              enableCompanyEmpManagement={false}
              enableActiveExportColumnVisibility={false}
              headerDescriptionWidth="max-w-[850px]"
              addemployeelogo={false}
              Filterbutton={true}
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
  );
};

export default Hospitalpharmacy;
