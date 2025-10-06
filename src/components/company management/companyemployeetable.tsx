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
import { CompanyManagementHeaderProps } from "./companymanagementheader";
import { useAdminStore, useCompanyStore } from "@/store/admininfo";
import { toast } from "sonner";
import { axios } from "@/configs/axios.config";
import { useViewEmployeeStore } from "@/store/employeeinfo";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";
import { useState, useEffect } from "react";
// const data: Data[] = [
//   {
//     id: "1",
//     phonenumber: "+1 234 56789",
//     employeename: "Summit Mfg Ltd",
//     dependents: "2",
//     startDate: new Date("2025-01-01"),
//     emailaddress: "summitmfg@info",
//     duration: "6 month",
//   },
//   {
//     id: "2",
//     phonenumber: "+1 234 56789",
//     employeename: "Summit Mfg Ltd",
//     dependents: "2",
//     startDate: new Date("2025-02-15"),
//     emailaddress: "summitmfg@info",
//     duration: "6 month",
//   },
//   {
//     id: "3",
//     phonenumber: "+1 234 56789",
//     employeename: "App Design",
//     dependents: "2",
//     startDate: new Date("2025-01-10"),
//     emailaddress: "summitmfg@info",
//     duration: "6 month",
//   },
//   {
//     id: "4",
//     phonenumber: "+1 234 56789",
//     employeename: "ken Stack",
//     dependents: "2",
//     startDate: new Date("2025-04-02"),
//     emailaddress: "summitmfg@info",
//     duration: "6 month",
//   },
//   {
//     id: "5",
//     phonenumber: "+1 234 56789",
//     employeename: "Summit Mfg Ltd",
//     dependents: "2",
//     startDate: new Date("2025-04-01"),
//     emailaddress: "summitmfg@info",
//     duration: "6 month",
//   },
//   {
//     id: "6",
//     phonenumber: "+1 234 56789",
//     employeename: "ken Stack",
//     dependents: "2",
//     startDate: new Date("2025-06-01"),
//     emailaddress: "summitmfg@info",
//     duration: "6 month",
//   },
//   {
//     id: "7",
//     phonenumber: "+1 234 56789",
//     employeename: "API Dev",
//     dependents: "2",
//     startDate: new Date("2025-02-01"),
//     emailaddress: "summitmfg@info",
//     duration: "6 month",
//   },
//   {
//     id: "8",
//     phonenumber: "+1 234 56789",
//     employeename: "ken Stack",
//     dependents: "2",
//     startDate: new Date("2025-01-01"),
//     emailaddress: "summitmfg@info",
//     duration: "6 month",
//   },
//   {
//     id: "9",
//     phonenumber: "+1 234 56789",
//     employeename: "Summit Mfg Ltd",
//     dependents: "2",
//     startDate: new Date("2025-03-01"),
//     emailaddress: "summitmfg@info",
//     duration: "6 month",
//   },
// ];

export type Data = {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  PhoneNumber: string;
  startingDate: Date;
  duration: string;
  dependents: string
};

export const columns = (goToStep: CompanyManagementHeaderProps["goToStep"]): ColumnDef<Data>[] => [
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
      <Flex className="text-start items-center gap-2">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="border border-gray-300 bg-white"
        />
        {row.original.employeeId}
      </Flex>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "firstName",
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
      <Box className="text-start">{row.original.firstName}</Box>
    ),
  },
  {
    accessorKey: "emailAddress",
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
      <Box className="text-start">{row.original.emailAddress}</Box>
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
      <Box className="text-start">{row.original.PhoneNumber}</Box>
    ),
  },
  {
    accessorKey: "startingDate",
    header: () => (
      <Flex className="text-black text-start gap-1">
        <h1 className="text-[#525252]">Start Date</h1>
        <Stack className="gap-0 leading-3">
          <TiArrowSortedUp className="size-3.5 text-[#525252]" />
          <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
        </Stack>
      </Flex>
    ),
    cell: ({ row }) => (
      <Box className="lowercase text-start">
        {new Date(row.original.startingDate).toLocaleString("en-US", {
          month: "2-digit",
          year: "numeric",
          day: "2-digit"
        })}
      </Box>
    ),
  },
  {
    accessorKey: "duration",
    header: () => (
      <Flex className="text-black text-start gap-1">
        <h1 className="text-[#525252]">Duration</h1>
        <Stack className="gap-0 leading-3">
          <TiArrowSortedUp className="size-3.5 text-[#525252]" />
          <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
        </Stack>
      </Flex>
    ),
    cell: ({ row }) => (
      <Box className="text-start">{row.original.duration}</Box>
    ),
  },
  {
    accessorKey: "dependents",
    header: () => (
      <Flex className="text-black text-start gap-1">
        <h1 className="text-[#525252]">Dependents</h1>
        <Stack className="gap-0 leading-3">
          <TiArrowSortedUp className="size-3.5 text-[#525252]" />
          <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
        </Stack>
      </Flex>
    ),
    cell: ({ row }) => (
      <Box className="text-start">
        {row.original.dependents} Dependents
      </Box>
    ),
  },
  {
    accessorKey: "actions",
    header: () => (
      <Center className="text-black text-center gap-1">
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
        <Button
          variant="outline"
          onClick={async () => {
            try {
              setLoading(true)
              const response = await axios.get(`/admin/employee-detail/${employeeId}`)
              // console.log(response);
              setEmployee(response.data.employee)
              setDependents(response.data.dependents)
            } catch (error: any) {
              toast.error(error?.response?.data?.message)
            } finally {
              setLoading(false)
            }
            goToStep("employee information");
            // console.log("clicked");
          }}
          className="bg-white cursor-pointer hover:bg-gray-50 border-1 border-[#1055ba] text-[#1055ba] w-26"
        >
          View Details
        </Button>
      );
    },
  },
];

export const CompanyEmployeeTable: React.FC<CompanyManagementHeaderProps> = ({
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
      const response = await axios.get(`/admin/company-detail/${companyId}?page=${page}&limit=${limit}`)
      setEmployees(response.data.employees)
      setTotalPages(response.data.pagination.totalPages)
      setCurrentPage(response.data.pagination.page)
      setTotal(response.data.pagination.total)
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
      const type = row.original.dependents as string;
      const employeename = row.original.firstName as string;
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
            <h1 className="text-lg font-medium">Company Employees</h1>

            <h1 className="px-4 py-3 bg-[#f6fafe] rounded-xl w-xl max-md:w-full">
              View and monitor all employees registered under this company,
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
                      .getColumn("firstName")
                      ?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn("firstName")
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
                          "rounded-tr-lg": i === 7,
                          "rounded-br-lg": i === 7,
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
