import { ReusableTable } from '@/components/reusable/reusableTable'
import { Box } from '@/components/ui/box'
import { Center } from '@/components/ui/center';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Flex } from '@/components/ui/flex';
import { Stack } from '@/components/ui/stack';
import { ColumnDef, Row } from '@tanstack/react-table';
import { Ellipsis, Loader } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { StaffManagementHeaderProps } from './staffmanagementheader';
import { Employeedetails, useAuthStore } from '@/store/userInfo.store';
import { Employee, useViewEmployeeStore } from '@/store/employeeinfo';
import { toast } from 'sonner';
import { axios } from '@/configs/axios.config';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

// const data: Data[] = [
//     {
//         id: "2401",
//         EmployeeName: "John Edwards",
//         EmailAdress: "johnedward@gmail.com",
//         Department: "Receptionist",
//         Contact: "+1 234-567-8901",
//         RegisteredOn: "2024-01-10"
//     },
//     {
//         id: "2401",
//         EmployeeName: "John Edwards",
//         EmailAdress: "johnedward@gmail.com",
//         Department: "Receptionist",
//         Contact: "+1 234-567-8901",
//         RegisteredOn: "2024-01-10",
//     },
//     {
//         id: "2401",
//         EmployeeName: "John Edwards",
//         EmailAdress: "johnedward@gmail.com",
//         Department: "Receptionist",
//         Contact: "+1 234-567-8901",
//         RegisteredOn: "2024-01-10",
//     },
//     {
//         id: "2401",
//         EmployeeName: "John Edwards",
//         EmailAdress: "johnedward@gmail.com",
//         Department: "Receptionist",
//         Contact: "+1 234-567-8901",
//         RegisteredOn: "2024-01-10",
//     },
//     {
//         id: "2401",
//         EmployeeName: "John Edwards",
//         EmailAdress: "johnedward@gmail.com",
//         Department: "Receptionist",
//         Contact: "+1 234-567-8901",
//         RegisteredOn: "2024-01-10",
//     },
//     {
//         id: "2401",
//         EmployeeName: "John Edwards",
//         EmailAdress: "johnedward@gmail.com",
//         Department: "Receptionist",
//         Contact: "+1 234-567-8901",
//         RegisteredOn: "2024-01-10",
//     },
//     {
//         id: "2401",
//         EmployeeName: "John Edwards",
//         EmailAdress: "johnedward@gmail.com",
//         Department: "Receptionist",
//         Contact: "+1 234-567-8901",
//         RegisteredOn: "2024-01-10",
//     },
//     {
//         id: "2401",
//         EmployeeName: "John Edwards",
//         EmailAdress: "johnedward@gmail.com",
//         Department: "Receptionist",
//         Contact: "+1 234-567-8901",
//         RegisteredOn: "2024-01-10",
//     },
//     {
//         id: "2401",
//         EmployeeName: "John Edwards",
//         EmailAdress: "johnedward@gmail.com",
//         Department: "Receptionist",
//         Contact: "+1 234-567-8901",
//         RegisteredOn: "2024-01-10",
//     },
// ];

export type Data = {
    id: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    Department: string;
    registrationNumber: string;
    RegisteredOn?: string;
    createdAt: string;
};

type Department = {
    employeeId: string;
    RoleName: string;
};

export const columns = (goToStep: StaffManagementHeaderProps["goToStep"], departments: Department[]): ColumnDef<Employeedetails>[] => [
    {
        id: "UniqueID",
        header: ({ table }) => (
            <Box className="text-start text-black flex items-center gap-2 w-20">
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
            <Flex className="text-black text-start gap-1 w-30">
                <h1 className="text-[#525252]">Employee Name</h1>
                <Stack className="gap-0 leading-3">
                    <TiArrowSortedUp className="size-3.5 text-[#525252]" />
                    <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
                </Stack>
            </Flex>
        ),
        cell: ({ row }) => (
            <Box className="text-start">{row.original.firstName + " " + row.original.lastName}</Box>
        ),
    },
    {
        accessorKey: "emailAddress",
        header: () => (
            <Flex className="text-black text-start gap-1 w-30">
                <h1 className="text-[#525252]">Email Adress</h1>
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
        accessorKey: "Department",
        header: () => (
            <Flex className="text-black text-start gap-1 w-40">
                <h1 className="text-[#525252]">Department</h1>
                <Stack className="gap-0 leading-3">
                    <TiArrowSortedUp className="size-3.5 text-[#525252]" />
                    <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
                </Stack>
            </Flex>
        ),
        cell: ({ row }) => {
            const empId = row.original.employeeId;
            const role = departments.find((department) => department.employeeId === empId);
            return (
                <Box>{role ? role.RoleName : "No Role Assigned"}</Box>
            )
        },
    },
    {
        accessorKey: "registrationNumber",
        header: () => (
            <Flex className="text-black text-start gap-1 w-20">
                <h1 className="text-[#525252]">Contact</h1>
                <Stack className="gap-0 leading-3">
                    <TiArrowSortedUp className="size-3.5 text-[#525252]" />
                    <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
                </Stack>
            </Flex>
        ),
        cell: ({ row }) => {
            return (
                <Box className="text-start">{row.original.registrationNumber}</Box>
            );
        },
    },
    {
        accessorKey: "startingDate",
        header: () => (
            <Flex className="text-black text-start gap-1 w-30">
                <h1 className="text-[#525252]">Registered On</h1>
                <Stack className="gap-0 leading-3">
                    <TiArrowSortedUp className="size-3.5 text-[#525252]" />
                    <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
                </Stack>
            </Flex>
        ),
        cell: ({ row }) => {
            return (
                <Box className="text-start">{new Date(row.original.startingDate).toLocaleString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                })}</Box>
            );
        },
    },
    {
        accessorKey: "Status",
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
            const employee = row.original;
            const isActive = employee.isActive;
            const updateEmployee = useAuthStore.getState().updateEmployee
            const { setLoading } = useAuthStore()
            const toggleStatus = async () => {
                const newStatus = !isActive
                try {
                    setLoading(true)
                    const response = await axios.post("/hospital/employee/status", {
                        employeeId: employee.employeeId,
                        status: newStatus ? "Active" : "Deactive"
                    },
                    );
                    toast.success(response.data.message);
                    updateEmployee(employee.employeeId, { isActive: newStatus })
                } catch (error: any) {
                    console.error(error);
                    toast.error(error?.response?.data?.error || "Something went wrong");
                } finally {
                    setLoading(false)
                }
            }
            return (

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Center
                            className={`cursor-pointer rounded-sm w-32 h-9 justify-between items-center 
                            ${isActive ? "bg-green-600" : "bg-red-600"} text-white`}
                        >
                            <h1 className="text-[14px] px-2">
                                {isActive ? "Active" : "Deactive"}
                            </h1>
                            <Center className="bg-black/20 rounded-tr-sm rounded-br-sm h-9 w-10">
                                <IoIosArrowDown className="size-4" />
                            </Center>
                        </Center>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="p-1">
                        <DropdownMenuCheckboxItem className="p-2" onClick={toggleStatus}>
                            {isActive ? "Deactive" : "Active"}
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
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
            const employee = row.original;
            return (
                <Center>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Ellipsis className="text-gray-400" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="p-0">
                            <DropdownMenuCheckboxItem
                                className="p-2 border-b-1 border-gray-200 rounded-none cursor-pointer"
                                onClick={async () => {
                                    try {
                                        const response = await axios.get(`/hospital/employeedetails/${employee.employeeId}`)
                                        const { employee: emp, dependents } = response.data
                                        useViewEmployeeStore.getState().setSelectedEmployee(emp)
                                        useViewEmployeeStore.getState().setDependents(dependents)
                                        goToStep("employee management")
                                    } catch (error: any) {
                                        console.error("Error fetching employee details:", error);
                                        toast.error(error)
                                    }
                                }
                                }                            >
                                View Details
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                onClick={async () => {
                                    useViewEmployeeStore.getState().setSelectedEmployee(employee as Employee);
                                    useViewEmployeeStore.getState().setMode("edit");
                                    goToStep("add employee")
                                }
                                }
                                className="p-2 border-b-1 border-gray-200 rounded-none cursor-pointer"
                            >
                                Edit
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem className="p-2 !text-red-500 cursor-pointer"
                                onClick={async () => {
                                    const employees = useAuthStore.getState().employees
                                    const setEmployees = useAuthStore.getState().setEmployees
                                    const setLoading = useAuthStore.getState().setLoading
                                    try {
                                        setLoading(true)
                                        const response = await axios.delete(`/hospital/employee/${employee.employeeId}`)
                                        toast.success(response.data.message)
                                        const updatedEmployees = employees.filter((emp) => emp.employeeId !== employee.employeeId);
                                        setEmployees(updatedEmployees);
                                    } catch (error: any) {
                                        toast.error(error?.response?.data?.error)
                                    } finally {
                                        setLoading(false)
                                    }
                                }}
                            >
                                Delete
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </Center>
            );
        },
    },
];


const Staffmanagement: React.FC<StaffManagementHeaderProps> = ({ goToStep }) => {
    const { setEmployees, employees, loading, setLoading } = useAuthStore();
    const [departments, setDepartments] = useState<Department[]>([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const limit = 10

    const handleAction = (action: string, row: Row<Data>) => {
        if (action === "employee management") {
            goToStep("view employee details");
        } else if (action === "add employee") {
            goToStep("add employee");
        } else if (action === "delete") {
            console.log("Deleting:", row.original);
        }
    };

    const handleStepChange = (step: string) => {
        if (step === "add employee") {
            goToStep("add employee");
        }
    };

    const fetchDepartment = async () => {
        try {
            const response = await axios.get("/hospital/department");
            setDepartments(response.data.department);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }

    const fetchHospitalEmployee = async (page: number) => {
        try {
            setLoading(true);
            const response = await axios.get(`/hospital/employees?page=${page}&limit=${limit}`);
            setEmployees(response.data.employees)
            const { totalPages, page: current } = response.data.pagination;
            setTotalPages(totalPages);
            setCurrentPage(current);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHospitalEmployee(currentPage);
    }, [currentPage]);

    useEffect(() => {
        fetchDepartment();
    }, []);

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
        <Box className='bg-white rounded-2xl'>
            <Stack className='gap-0'>
                <p className='font-medium px-1'>Staff Management</p>
                {
                    loading ? (
                        <Center className="py-10 text-gray-500"><Loader className="animate-spin" />Loading...</Center>
                    ) : (
                        <ReusableTable
                            data={employees}
                            columns={columns(handleAction, departments)}
                            headerDescription="View, update, and manage hospital staff profiles and benefit allocations."
                            headerDescriptionWidth="max-w-[600px]"
                            onRowClick={(row) => console.log("Row clicked:", row.original)}
                            enableHospitalColumnVisibility={false}
                            enableEmployeeColumnVisibility={true}
                            enableCompanyEmpManagement={false}
                            enableCompanyColumnVisibility={true}
                            enableActiveExportColumnVisibility={false}
                            searchInput={false}
                            addemployeelogo={false}
                            Filterbutton={false}
                            goToStep={handleStepChange}
                            addbuttontext={false}
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
    )
}

export default Staffmanagement