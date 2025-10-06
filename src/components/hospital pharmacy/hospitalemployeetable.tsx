import {
  getPaginationRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
  getSortedRowModel,
  VisibilityState,
  getCoreRowModel,
  useReactTable,
  SortingState,
  flexRender,
  ColumnDef,
  Row,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import * as React from "react";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { Stack } from "@/components/ui/stack";
import { cn } from "@/lib/utils";
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
import { ListFilter, Loader, Search } from "lucide-react";
import { Input } from "../ui/input";
import { HospitalPharmacyHeaderProps } from "./hospitalheader";
import { useAdminStore, useCompanyStore } from "@/store/admininfo";
import { useState, useEffect } from "react";
import { axios } from "@/configs/axios.config";
import { toast } from "sonner";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";
import { useViewEmployeeStore } from "@/store/employeeinfo";

// const data: Data[] = [
//   {
//     id: "1",
//     phonenumber: "+1 234 56789",
//     employeename: "Joseph K. Owusu",
//     designation: "Finance",
//     emailaddress: "summitmfg@info",
//   },
//   {
//     id: "2",
//     phonenumber: "+1 234 56789",
//     employeename: "Joseph K. Owusu",
//     designation: "Receptionist",
//     emailaddress: "summitmfg@info",
//   },
//   {
//     id: "3",
//     phonenumber: "+1 234 56789",
//     employeename: "Joseph K. Owusu",
//     designation: "Tech",
//     emailaddress: "summitmfg@info",
//   },
//   {
//     id: "4",
//     phonenumber: "+1 234 56789",
//     employeename: "Joseph K. Owusu",
//     designation: "Finance",
//     emailaddress: "summitmfg@info",
//   },
//   {
//     id: "5",
//     phonenumber: "+1 234 56789",
//     employeename: "Joseph K. Owusu",
//     designation: "HR",
//     emailaddress: "summitmfg@info",
//   },
//   {
//     id: "6",
//     phonenumber: "+1 234 56789",
//     employeename: "Joseph K. Owusu",
//     designation: "Finance",
//     emailaddress: "summitmfg@info",
//   },
//   {
//     id: "7",
//     phonenumber: "+1 234 56789",
//     employeename: "Joseph K. Owusu",
//     designation: "Admin Operations",
//     emailaddress: "summitmfg@info",
//   },
//   {
//     id: "8",
//     phonenumber: "+1 234 56789",
//     employeename: "Joseph K. Owusu",
//     designation: "Tech",
//     emailaddress: "summitmfg@info",
//   },
//   {
//     id: "9",
//     phonenumber: "+1 234 56789",
//     employeename: "Joseph K. Owusu",
//     designation: "Tech",
//     emailaddress: "summitmfg@info",
//   },
// ];

export type Data = {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  registrationNumber?: string;
};

export const columns = (
  goToStep: HospitalPharmacyHeaderProps["goToStep"]
): ColumnDef<Data>[] => [
    {
      accessorKey: "firstName",
      header: ({ table }) => (
        <Box className="text-start text-black flex items-center gap-2">
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            className="border border-gray-300 bg-white"
          />
          <h1 className="text-[#525252]">Full Name</h1>

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
          {row.original.firstName + " " + row.original.lastName}
        </Flex>
      ),
      enableSorting: true,
    },
    // {
    //   accessorKey: "designation",
    //   header: () => (
    //     <Flex className="text-black text-start gap-1">
    //       <h1 className="text-[#525252]">Designation</h1>
    //       <Stack className="gap-0 leading-3">
    //         <TiArrowSortedUp className="size-3.5 text-[#525252]" />
    //         <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
    //       </Stack>
    //     </Flex>
    //   ),
    //   cell: ({ row }) => (
    //     <Box className="capitalize text-start">{row.original.designation}</Box>
    //   ),
    // },
    {
      accessorKey: "emailAddress",
      header: () => (
        <Flex className="text-black text-start gap-1">
          <h1 className="text-[#525252]">Email</h1>
          <Stack className="gap-0 leading-3">
            <TiArrowSortedUp className="size-3.5 text-[#525252]" />
            <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
          </Stack>
        </Flex>
      ),
      cell: ({ row }) => (
        <Box className="text-start">{row.original.emailAddress}</Box>
      ),
    },
    {
      accessorKey: "registrationNumber",
      header: () => (
        <Flex className="text-black text-start gap-1 pr-12">
          <h1 className="text-[#525252]">Phone</h1>
          <Stack className="gap-0 leading-3">
            <TiArrowSortedUp className="size-3.5 text-[#525252]" />
            <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
          </Stack>
        </Flex>
      ),
      cell: ({ row }) => (
        <Box className="lowercase text-start pr-12">
          {row.original.registrationNumber}
        </Box>
      ),
    },
    {
      accessorKey: "actions",
      header: () => (
        <Center className="text-black text-center gap-1 pl-15">
          <h1 className="text-[#525252]">Actions</h1>
          <Stack className="gap-0 leading-3">
            <TiArrowSortedUp className="size-3.5 text-[#525252]" />
            <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
          </Stack>
        </Center>
      ),
      cell: ({ row }) => {
        const employeeId = row.original.employeeId
        const { setEmployee } = useCompanyStore()
        const { setDependents } = useViewEmployeeStore()
        const { setLoading } = useAdminStore()
        return (
          <Center className="items-center pl-15">
            <Button
              variant="outline"
              onClick={async () => {
                try {
                  setLoading(true)
                  const response = await axios.get(`/admin/HospitalEmployee-detail/${employeeId}`)
                  setEmployee(response.data.employee)
                  setDependents(response.data.dependents)
                } catch (error: any) {
                  toast.error(error?.response?.data?.message)
                } finally {
                  setLoading(false)
                }
                goToStep("hospital epmloyee info");
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

export const HospitalEmployeeTable: React.FC<HospitalPharmacyHeaderProps> = ({
  goToStep,
}) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const { setEmployees, employees, selectedCompany } = useCompanyStore()
  const { loading, setLoading } = useAdminStore()
  const [total, setTotal] = useState("0")
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10
  const companyId = selectedCompany?.companyId

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

  const fetchEmployees = async (page: number) => {
    try {
      setLoading(true)
      const response = await axios.get(`/admin/HospitalPharmacy-detail/${companyId}?page=${page}&limit=${limit}`)
      setEmployees(response.data.employees)
      setTotalPages(response.data.pagination.totalPages)
      setCurrentPage(response.data.pagination.page)
      setTotal(response.data.pagination.total)
      console.log(response);
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEmployees(currentPage)
  }, [currentPage])

  const table = useReactTable({
    data: employees,
    columns: columns(goToStep),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (
      row: Row<Data>,
      _columnId: string,
      filterValue: string
    ) => {
      const search = filterValue.toLowerCase();
      const type = row.original.firstName as string;
      const employeename = row.original.emailAddress as string;
      const rowIndex = (row.index + 20244092321).toString();
      return (
        type.toLowerCase().includes(search) ||
        employeename.toLowerCase().includes(search) ||
        rowIndex.includes(search)
      );
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  if (loading) {
    return (
      <Center className="py-10 text-gray-500">
        <Loader className="animate-spin" /> Loading...
      </Center>
    );
  }


  if (!employees || employees.length === 0) {
    return <p className="flex justify-center items-center mt-10 font-bold">No Employee Found</p>;
  }

  return (
    <>
      <Box className=" bg-white rounded-xl w-full">
        <Stack className="gap-4">
          <Flex className="w-full py-2 gap-3 flex-col items-start">
            <h1 className="text-lg font-medium">Hospital Employees</h1>

            <h1 className="px-4 py-3 bg-[#f6fafe] rounded-xl w-[38rem] max-md:w-full">
              Authorized personnel responsible for hospital administration,
              finance, and front-desk operations.{" "}
            </h1>
          </Flex>

          <Flex className="justify-between max-md:flex-col items-center text-center w-full">
            <h1 className="font-medium text-lg">Total Employees ({total})</h1>

            <Flex>
              <Flex className="relative max-w-sm w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5.5 w-5.5 text-gray-400 font-light" />
                <Input
                  type="search"
                  placeholder="Search"
                  value={
                    (table
                      .getColumn("employeename")
                      ?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn("employeename")
                      ?.setFilterValue(event.target.value)
                  }
                  className="pl-10 bg-white h-11 w-md max-sm:w-full placeholder:text-gray-400 placeholder:text-[15px] border-2 border-gray-200 rounded-md focus:outline-none focus:border-[#0aafba] active:border-gray-200 focus:ring-0 focus:ring-offset-0"
                />
              </Flex>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    aria-haspopup="dialog"
                    className="cursor-pointer bg-white border-2 border-gray-200 w-28 h-10"
                  >
                    <ListFilter />
                    Filter
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </Flex>
          </Flex>
        </Stack>

        <Box className="mt-6">
          <Table>
            <TableHeader className="bg-[#f5f4fc] rounded-md">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-none hover:bg-[#f5f4fc] cursor-pointer"
                  style={{
                    borderRadius: "0.375rem",
                  }}
                >
                  {headerGroup.headers.map((header, i) => (
                    <TableHead
                      key={header.id}
                      className={cn(
                        {
                          "rounded-bl-lg": i === 0,
                          "rounded-tl-lg": i === 0,
                          "rounded-tr-lg": i === 4,
                          "rounded-br-lg": i === 4,
                        },
                        "text-black font-semibold py-4 px-5"
                      )}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, rowIndex) => (
                  <TableRow
                    className="border-none hover:bg-[#f5f4fc] cursor-pointer"
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell, i) => (
                      <TableCell
                        className={cn("bg-white py-4 px-5", {
                          "bg-white": rowIndex === 0,
                          "bg-[#f5f4fc]": rowIndex % 2 === 1,

                          "rounded-bl-lg": i === 0,
                          "rounded-tl-lg": i === 0,
                          "rounded-tr-lg": i === 6,
                          "rounded-br-lg": i === 6,
                        })}
                        key={cell.id}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </Box>
      <Pagination className="flex justify-end mt-4">
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
