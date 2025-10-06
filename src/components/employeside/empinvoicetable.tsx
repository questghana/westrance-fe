import React, { useEffect, useState } from 'react'
import { Box } from '../ui/box'
import { Stack } from '../ui/stack'
import { Flex } from '../ui/flex'
import { Curve } from '../common/curve'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { cn } from '@/lib/utils'
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, Row, SortingState, useReactTable, VisibilityState } from '@tanstack/react-table'
import { Checkbox } from '../ui/checkbox'
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'
// import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Center } from '../ui/center'
import { IoIosArrowDown } from 'react-icons/io'
import { toast } from 'sonner'
import { axios } from '@/configs/axios.config'
import { Loader } from 'lucide-react'


// const data: Data[] = [
//     {
//         id: "1",
//         status: 'Successfull',
//         Date: "May 24, 2025",
//         Description: "Pharmacy Bill Submitted - CVS"
//     },
//     {
//         id: "2",
//         status: 'Successfull',
//         Date: "May 24, 2025",
//         Description: "Pharmacy Bill Submitted - CVS"
//     },
//     {
//         id: "3",
//         status: 'pending',
//         Date: "May 24, 2025",
//         Description: "Pharmacy Bill Submitted - CVS"
//     },
//     {
//         id: "4",
//         status: 'Successfull',
//         Date: "May 24, 2025",
//         Description: "Pharmacy Bill Submitted - CVS"
//     },
//     {
//         id: "5",
//         status: 'pending',
//         Date: "May 24, 2025",
//         Description: "Pharmacy Bill Submitted - CVS"
//     },
// ];

export type Data = {
    id: string;
    SubmittedDate: string;
    HospitalName: string;
    PatientName: string;
    Amount: string;
    BenefitUsed: string;
};

export const columns = (): ColumnDef<Data>[] => [
    {
        id: "select",
        header: ({ table }) => (
            <Box className="w-[200px] text-start text-black flex items-center gap-2">
                <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                    className="border border-gray-300 bg-white rounded"
                />
                <h1 className="text-[#525252]">Date</h1>

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
                {new Date(row.original.SubmittedDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                })}
            </Box>
        ),
        enableSorting: true,
    },
    {
        accessorKey: "HospitalName",
        header: () => (
            <Flex className="text-black text-start gap-1">
                <h1 className="text-[#525252]">HospitalName</h1>
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
        accessorKey: "Status",
        header: () => (
            <Flex className="text-black text-start gap-1">
                <h1 className="text-[#525252] ml-1">Status</h1>
                <Stack className="gap-0 leading-3">
                    <TiArrowSortedUp className="size-3.5 text-[#525252]" />
                    <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
                </Stack>
            </Flex>
        ),
        cell: ({ row }) => {
            return (
                <Box className="text-start">{row.original.PatientName}</Box>
            );
        },
    },
    {
        accessorKey: "BenefitUsed",
        header: () => (
            <Flex className="text-black text-start gap-1">
                <h1 className="text-[#525252] ml-1">Benefit Used</h1>
                <Stack className="gap-0 leading-3">
                    <TiArrowSortedUp className="size-3.5 text-[#525252]" />
                    <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
                </Stack>
            </Flex>
        ),
        cell: ({ row }) => (
            <Box className="text-start">{row.original.BenefitUsed}</Box>
        ),
    },
    {
        accessorKey: "Amount",
        header: () => (
            <Flex className="text-black text-start gap-1">
                <h1 className="text-[#525252] ml-1">Amount</h1>
                <Stack className="gap-0 leading-3">
                    <TiArrowSortedUp className="size-3.5 text-[#525252]" />
                    <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
                </Stack>
            </Flex>
        ),
        cell: ({ row }) => (
            <Box className="text-start">{row.original.Amount}</Box>
        ),
    },
];


const Empinvoicetable: React.FC = () => {
    const [data, setData] = useState<any>([])
    const [loading, setLoading] = useState(false)
    const [sorting, setSorting] = useState<SortingState>([]);
    const [rowSelection, setRowSelection] = useState({});
    const [globalFilter, setGlobalFilter] = useState("");
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    );
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});

    const getInvoice = async () => {
        try {
            setLoading(true)
            const response = await axios.get("/employee/invoice")
            setData(response.data.EmployeeInvoice)
            // console.log(response);
        } catch (error: any) {
            toast.error(error?.response?.data?.error || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getInvoice()
    }, [])

    const table = useReactTable({
        data,
        columns: columns(),
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
            // const clientName = row.original.clientName as string;
            // const projectName = row.original.projectName as string;
            const rowIndex = (row.index + 20244092321).toString();
            return (
                // clientName.toLowerCase().includes(search) ||
                // projectName.toLowerCase().includes(search) ||
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

    return (
        <Box className="p-2 bg-white rounded-xl w-full">
            <Stack className="gap-5 p-2">
                <Flex className="justify-between items-center w-full">
                    <h1 className="text-lg font-medium max-sm:text-[0.9rem] max-md:text-[1.2rem] max-lg:text-[1rem]">
                        Invoice Activities
                    </h1>
                    <Box className='mr-9'>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Center className="bg-[#1055ba] text-white cursor-pointer hover:bg-[#1055ba]/80 hover:text-white rounded-sm w-36 h-9 justify-between items-center">
                                    <h1 className="text-[14px] px-2">Sort By</h1>
                                    <Center className="bg-[#0e66b7] rounded-tr-sm rounded-br-sm h-9 w-10">
                                        <IoIosArrowDown className="size-4" />
                                    </Center>
                                </Center>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="p-1">
                                <DropdownMenuCheckboxItem className="p-2">
                                    All
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem className="p-2">
                                    Most Recent
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem className="p-2">
                                    Most oldest
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </Box>
                </Flex>
                <Curve className="-mt-1 w-full" />
            </Stack>
            {
                loading ? (
                    <Center className="py-10 text-gray-500">
                        <Loader className="animate-spin" /> Loading...
                    </Center>
                ) : (
                    <Box>
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
                                                        "rounded-tr-lg": i === 3,
                                                        "rounded-br-lg": i === 3,
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
                                            className={cn(
                                                "border-none hover:bg-[#f5f4fc] cursor-pointer",
                                                {
                                                    "bg-[#f5f4fc] rounded-lg": rowIndex % 2 === 1,
                                                    "bg-white ": rowIndex % 2 === 0,
                                                }
                                            )}
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell
                                                    className="py-4 px-5"
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
                                        <TableCell colSpan={columns.length} className="h-24 text-center">
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>

                        </Table>
                    </Box>
                )
            }
        </Box>
    )
}

export default Empinvoicetable