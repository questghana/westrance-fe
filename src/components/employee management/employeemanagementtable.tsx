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
import { IoIosArrowDown } from "react-icons/io";
import { Checkbox } from "@/components/ui/checkbox";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { Box } from "../ui/box";
import { Flex } from "../ui/flex";
import { ReusableTable } from "../reusable/reusableTable";
import { EmployeeManagementHeaderProps } from "./employeemanagementheader";
import { Ellipsis, Loader } from "lucide-react";
import { useEffect, useState } from "react"
import { axios } from "@/configs/axios.config";
import { toast } from "sonner";
import { useAdminStore } from "@/store/admininfo";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";
import { Employee, useViewEmployeeStore } from "@/store/employeeinfo";
import { Employeedetails, useAuthStore } from "@/store/userInfo.store";


export type Data = {
  employeeId: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  emailAddress: string;
  registrationNumber: string;
  benefits: string;
  amountPackage: string;
  dependents: string;
  startingDate: string;
  duration: string;
  profileImage: string | null;
};

export const columns = (
  goToStep: EmployeeManagementHeaderProps["goToStep"]
): ColumnDef<Employeedetails>[] => [
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
          <h1 className="text-[#525252]">Employee ID</h1>

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
      accessorKey: "employeename",
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
        <Box className="text-start">{row.original.firstName + " " + row.original.lastName}</Box>
      ),
    },
    {
      accessorKey: "emailaddress",
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
      accessorKey: "phonenumber",
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
        <Box className="lowercase text-start">{row.original.registrationNumber}</Box>
      ),
    },
    {
      accessorKey: "registered",
      header: () => (
        <Flex className="text-black text-start gap-1">
          <h1 className="text-[#525252]">Registered On</h1>
          <Stack className="gap-0 leading-3">
            <TiArrowSortedUp className="size-3.5 text-[#525252]" />
            <TiArrowSortedDown className="size-3.5 text-[#525252] -mt-1.5" />
          </Stack>
        </Flex>
      ),
      cell: ({ row }) => (
        <Box className="lowercase text-start">{new Date(row.original.startingDate).toLocaleString("en-US", {
          month: "2-digit",
          year: "2-digit",
          day: "2-digit"
        })}</Box>
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
        const employee = row.original;
        const isActive = employee.isActive;
        const updateEmployee = useAuthStore.getState().updateEmployee
        const { setLoading } = useAuthStore()
        const toggleStatus = async () => {
          console.log(employee.employeeId);
          const newStatus = !isActive
          try {
            setLoading(true)
            const response = await axios.post("/admin/ActiveDeactive-Employee/Status", {
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
        const { setLoading } = useAdminStore()
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
                      setLoading(true)
                      const response = await axios.get(`/admin/get-Employees-dependents/${employee.employeeId}`)
                      console.log(response);
                      const { employee: emp, Westrancedependents } = response.data
                      useViewEmployeeStore.getState().setSelectedEmployee(emp)
                      useViewEmployeeStore.getState().setDependents(Westrancedependents)
                    } catch (error: any) {
                      toast.error(error?.response?.data?.error)
                    } finally {
                      setLoading(false)
                    }
                    goToStep("employee management")
                  }
                  }
                >
                  View Details
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  onClick={() => {
                    useViewEmployeeStore.getState().setSelectedEmployee(employee as Employee);
                    useViewEmployeeStore.getState().setMode("edit");
                    goToStep("edit employee")
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
                      const response = await axios.delete(`/admin/delete-Employee/${employee.employeeId}`)
                      const updatedEmployees = employees.filter((emp) => emp.employeeId !== employee.employeeId);
                      setEmployees(updatedEmployees);
                      toast.success(response.data.message)
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

export const EmployeeManagementTable: React.FC<
  EmployeeManagementHeaderProps
> = ({ goToStep }) => {
  const handleAction = (action: string, row: Row<Data>) => {
    if (action === "employee management") {
      goToStep("view employee details");
    } else if (action === "edit employee") {
      goToStep("edit employee");
    } else if (action === "delete") {
      console.log("Deleting:", row.original);
    }
  };

  const handleStepChange = (step: string) => {
    if (step === "add employee") {
      goToStep("add employee");
    }
  };
  const { loading, setLoading } = useAdminStore()
  const { employees, setEmployees } = useAuthStore()
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10

  const fetchWestranceEmployees = async (page: number) => {
    try {
      setLoading(true)
      const response = await axios.get(`/admin/get-Employees?page=${page}&limit=${limit}`)
      setEmployees(response.data.westranceEmployees)
      setTotalPages(response.data.pagination.totalPages)
      setCurrentPage(response.data.pagination.page)
    } catch (error: any) {
      toast.error(error?.response?.data?.error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWestranceEmployees(currentPage)
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

  return (
    <>
      {
        loading ? (
          <Center className="py-10 text-gray-500"><Loader className="animate-spin" />Loading...</Center>
        ) : (
          <ReusableTable
            data={employees}
            columns={columns(handleAction)}
            headerDescription="View, update, and manage employee profiles and benefit allocations."
            searchInput={false}
            onRowClick={(row) => console.log("Row clicked:", row.original)}
            enableCompanyColumnVisibility={false}
            enableEmployeeColumnVisibility={true}
            enableHospitalColumnVisibility={false}
            enableCompanyEmpManagement={false}
            headerDescriptionWidth="max-w-[600px]"
            goToStep={handleStepChange}
            addemployeelogo={false}
            Filterbutton={false}
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

    </>
  );
};
