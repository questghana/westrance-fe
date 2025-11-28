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
import { EmployeeManagementHeaderProps } from "./employeemanagementheader";
import { Ellipsis, Loader } from "lucide-react";
import { Box } from "@/components/ui/box";
import { Flex } from "@/components/ui/flex";
import { ReusableTable } from "@/components/reusable/reusableTable";
// import { format } from "date-fns";
import { Employeedetails, useAuthStore } from "@/store/userInfo.store";
import { useEffect } from "react";
import { Employee, useViewEmployeeStore } from "@/store/employeeinfo";
import { toast } from "sonner";
import fetchMyEmployees from "@/hooks/useemployee";
import { axios } from "@/configs/axios.config";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

// const data: Data[] = [
//   {
//     id: "98324567109231",
//     phonenumber: "+1 202-555-0145",
//     employeename: "Olivia Johnson",
//     dependents: "2",
//     startDate: format(new Date("2025-04-01"), "yyyy-MM-dd"),
//     emailaddress: "olivia.johnson@email.com",
//     duration: "6 month",
//   },
//   {
//     id: "98324567109231",
//     phonenumber: "+1 312-555-0132",
//     employeename: "Liam Anderson",
//     dependents: "0",
//     startDate: format(new Date("2025-04-01"), "yyyy-MM-dd"),
//     emailaddress: "liam.a@email.com",
//     duration: "1 Year",
//   },
//   {
//     id: "98324567109231",
//     phonenumber: "+1 202-555-0145",
//     employeename: "Olivia Johnson",
//     dependents: "2",
//     startDate: format(new Date("2025-04-01"), "yyyy-MM-dd"),
//     emailaddress: "olivia.johnson@email.com",
//     duration: "6 month",
//   },
//   {
//     id: "98324567109231",
//     phonenumber: "+1 202-555-0145",
//     employeename: "Olivia Johnson",
//     dependents: "2",
//     startDate: format(new Date("2025-04-01"), "yyyy-MM-dd"),
//     emailaddress: "olivia.johnson@email.com",
//     duration: "6 month",
//   },
//   {
//     id: "98324567109231",
//     phonenumber: "+1 202-555-0145",
//     employeename: "Olivia Johnson",
//     dependents: "2",
//     startDate: format(new Date("2025-04-01"), "yyyy-MM-dd"),
//     emailaddress: "olivia.johnson@email.com",
//     duration: "6 month",
//   },
//   {
//     id: "98324567109231",
//     phonenumber: "+1 202-555-0145",
//     employeename: "Olivia Johnson",
//     dependents: "2",
//     startDate: format(new Date("2025-04-01"), "yyyy-MM-dd"),
//     emailaddress: "olivia.johnson@email.com",
//     duration: "6 month",
//   },
//   {
//     id: "98324567109231",
//     phonenumber: "+1 202-555-0145",
//     employeename: "Olivia Johnson",
//     dependents: "2",
//     startDate: format(new Date("2025-04-01"), "yyyy-MM-dd"),
//     emailaddress: "olivia.johnson@email.com",
//     duration: "6 month",
//   },
//   {
//     id: "98324567109231",
//     phonenumber: "+1 202-555-0145",
//     employeename: "Olivia Johnson",
//     dependents: "2",
//     startDate: format(new Date("2025-04-01"), "yyyy-MM-dd"),
//     emailaddress: "olivia.johnson@email.com",
//     duration: "6 month",
//   },
//   {
//     id: "98324567109231",
//     phonenumber: "+1 202-555-0145",
//     employeename: "Olivia Johnson",
//     dependents: "2",
//     startDate: format(new Date("2025-04-01"), "yyyy-MM-dd"),
//     emailaddress: "olivia.johnson@email.com",
//     duration: "6 month",
//   },
// ];

// export type Data = {
//   id: string;
//   phonenumber: string;
//   dependents: string;
//   employeename: string;
//   startDate: string;
//   emailaddress?: string;
//   duration?: string;
//   status: "active" | "deactive";
// };

export const columns = (
  goToStep: EmployeeManagementHeaderProps["goToStep"]
): ColumnDef<Employeedetails>[] => [
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
      accessorKey: "startDate",
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
          {row.original.startingDate.split('T')[0]}
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
        const updateEmployee = useAuthStore.getState().updateEmployee;
        const { setLoading } = useAuthStore()
        const toggleStatus = async () => {
          const newStatus = !isActive;
          try {
            setLoading(true)
            const response = await axios.post(`/company/employee/status`, { employeeId: employee.employeeId, status: newStatus ? "Active" : "Deactive" });
            toast.success(response.data.message);
            updateEmployee(employee.employeeId, { isActive: newStatus });
          } catch (err: any) {
            console.error(err);
            toast.error(err?.response?.data?.error || "Something went wrong");
          } finally {
            setLoading(false)
          }
        };

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
        <Box className="capitalize text-start">
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
                      const response = await axios.get(`/company/employee/details/${employee.employeeId}`)
                      const { employee: emp, dependents } = response.data
                      useViewEmployeeStore.getState().setSelectedEmployee(emp)
                      useViewEmployeeStore.getState().setDependents(dependents)
                      goToStep("employee management")
                    } catch (error: any) {
                      console.error("Error fetching employee details:", error);
                      toast.error(error)
                    }
                  }
                  }
                >
                  View Details
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  className="p-2 border-b-1 border-gray-200 rounded-none cursor-pointer"
                  onClick={async () => {
                    useViewEmployeeStore.getState().setSelectedEmployee(employee as unknown as Employee);
                    useViewEmployeeStore.getState().setMode("edit");
                    goToStep("edit employee")
                  }
                  }
                >
                  Edit
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="p-2 text-red-500"
                  onClick={async () => {
                    const employees = useAuthStore.getState().employees
                    const setEmployees = useAuthStore.getState().setEmployees
                    const setLoading = useAuthStore.getState().setLoading
                    try {
                      setLoading(true)
                      const response = await axios.delete(`/company/employee/${employee.employeeId}`)
                      const updatedEmployees = employees.filter((emp) => emp.employeeId !== employee.employeeId);
                      setEmployees(updatedEmployees);
                      toast.success(response.data.message)
                    } catch (error: any) {
                      console.error("Error deleting employee:", error);
                      toast.error(error)
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
  const handleAction = (action: string, row: Row<Employeedetails>) => {
    if (action === "employee management") {
      goToStep("view employee details");
    } else if (action === "edit employee") {
      goToStep("edit employee");
    } else if (action === "delete") {
      console.log("Deleting:", row.original);
    }
  };

  const { employees, loading } = useAuthStore()
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const limit = 10


  useEffect(() => {
    const loadEmployees = async () => {
      const pagination = await fetchMyEmployees(currentPage, limit);
      if (pagination) {
        setTotalPages(pagination.totalPages);
      }
    };
    loadEmployees();
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
  const handleStepChange = (step: string) => {
    if (step === "add employee") {
      goToStep("add employee");
    }
  };
  {
    return loading ? (
      <Center className="py-10 text-gray-500"><Loader className="animate-spin" />Loading...</Center>
    ) : (
      <>
        <ReusableTable
          data={employees}
          columns={columns(handleAction)}
          headerDescription="Easily register, update, and view your employees. Add new members to get started with benefit allocation and healthcare tracking."
          onRowClick={(row) => console.log("Row clicked:", row.original)}
          enableCompanyColumnVisibility={false}
          enableEmployeeColumnVisibility={true}
          enableHospitalColumnVisibility={false}
          enableActiveExportColumnVisibility={true}
          enableCompanyEmpManagement={true}
          addemployeelogo={true}
          headerDescriptionWidth="max-w-[540px]"
          goToStep={handleStepChange}
          Filterbutton={false}
          addbuttontext={false}
        />
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
  }
};
