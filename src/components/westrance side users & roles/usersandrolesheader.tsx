import { z } from "zod";
import { ComponentWrapper } from "../common/componentwrapper";
import { Box } from "../ui/box";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import {
  Command,
  // CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FC, useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { ChevronDown, Loader } from "lucide-react";
import { Flex } from "../ui/flex";
import { Textarea } from "../ui/textarea";
import { Stack } from "../ui/stack";
import { useAuthStore } from "@/store/userInfo.store";
import { Center } from "../ui/center";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner";
import { axios } from "@/configs/axios.config";

const formSchema = z
  .object({
    EmployeeName: z.object({
      value: z.string({ required_error: "Employee value is required" }),
      label: z.string({ required_error: "Employee name is required" }),
      employeeId: z.string().optional(),
    }).refine((data) => data.value.trim() !== "" && data.label.trim() !== "", {
      message: "Employee must be selected",
    }),
    RoleName: z.string().min(2, { message: "Please select a role.", }),
    RoleDescription: z.string().optional(),
    Password: z.string().min(8, "Password must be at least 8 characters"),
    ConfirmPassword: z.string().min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.Password === data.ConfirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type stylingProps = {
  margin: string;
  padding: string;
}

const RoleName = [
  {
    value: "Dashboard",
    label: "Dashboard",
  },
  {
    value: "Company Management",
    label: "Company Management",
  },
  {
    value: "Hospital & Pharmacy",
    label: "Hospital & Pharmacy",
  },
  {
    value: "Employee Management",
    label: "Employee Management",
  },
  {
    value: "Invoices",
    label: "Invoices",
  },
  {
    value: "Support Center",
    label: "Support Center",
  },
];

export const UsersAndRolesHeader: FC<stylingProps> = ({ margin, padding }) => {
  const [togglepassconfirm, setTogglepassconfirm] = useState(false);
  const [togglepass, setTogglepass] = useState(false);
  const { token, loading, setLoading } = useAuthStore();
  const [employees, setEmployees] = useState<
    { value: string; label: string; employeeId: string }[]
  >([]);

  useEffect(() => {
    const getWestranceEmployees = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/admin/get-Employees");
        console.log(response);
        const data = response.data.westranceEmployees.map((emp: any) => ({
          value: emp.employeeId,
          label: `${emp.firstName} ${emp.lastName}`,
          employeeId: emp.employeeId,
        }));
        setEmployees(data);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    getWestranceEmployees();
  }, [token]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      EmployeeName: { value: "", label: "", employeeId: "" },
      RoleDescription: "",
      RoleName: "",
      Password: "",
      ConfirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = {
      ...values,
      EmployeeName: values.EmployeeName.label,
    };
    try {
      setLoading(true)
      const response = await axios.post("/admin/add-EmployeeRoles", payload);
      toast.success(response.data.message);
      form.reset()
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false)
    }
  }

  return (
    <ComponentWrapper className={`mt-${margin} p-${padding}`}>
      <h1 className="text-[18px]">Users & Roles Management</h1>
      <Box className="mt-2 bg-[#F6FAFF] rounded-md lg:w-[630px] md:w-[450px] px-4 py-4">
        <p>
          Define roles, manage internal access levels, and assign permissions to
          Westrance team members.
        </p>
      </Box>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-8 mt-6"
        >
          <FormField
            control={form.control}
            name="EmployeeName"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>
                    Add Employee: <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <ComboBoxResponsive
                      value={field.value.value}
                      onChange={field.onChange}
                      placeholder="Select"
                      options={employees}
                      loading={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }
            }
          />

          <FormField
            control={form.control}
            name="RoleName"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>
                    Role Name: <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="lg:w-70 md:w-96 max-sm:w-full py-6 bg-[#F8F8F8]">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          RoleName.map((role) => (
                            <SelectItem key={role.value} value={role.value}>
                              {role.label}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />


          <FormField
            control={form.control}
            name="RoleDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Role Description:
                </FormLabel>
                <FormControl>
                  <Textarea
                    rows={14}
                    cols={80}
                    className="lg:w-lg md:w-96 h-44 py-6 bg-[#F8F8F8]"
                    placeholder="Responsible for overseeing daily operations and managing workflows"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Stack className="gap-0">
            <Flex className="pt-4 items-center">
              <p className="whitespace-nowrap font-medium">Set Credentials</p>
              <Box className="border-[1px] border-[#D0D8ED] w-[550px]" />
            </Flex>

            <Flex className="flex-wrap flex-col lg:flex-row gap-8 mt-4 items-start">
              <FormField
                control={form.control}
                name="Password"
                render={({ field }) => (
                  <FormItem className="w-full lg:w-1/3">
                    <FormLabel>
                      Password: <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type={togglepass ? "text" : "password"}
                        className="w-full bg-[#F8F8F8] placeholder:text-[#8E8E8E] placeholder:pl-2 py-7"
                        placeholder="Create a Password"
                        {...field}
                      />
                    </FormControl>

                    <Flex className="justify-start max-sm:flex-col text-start w-full items-start">
                      <FormMessage className="text-nowrap" />
                      <p
                        onClick={() => setTogglepass(!togglepass)}
                        className="text-nowrap ml-auto lg:text-right text-[#1E6EE5] underline cursor-pointer text-sm"
                        style={{
                          userSelect: "none",
                        }}
                      >
                        {togglepass ? "Hide Password" : "Show Password"}
                      </p>
                    </Flex>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ConfirmPassword"
                render={({ field }) => (
                  <FormItem className="w-full lg:w-1/3">
                    <FormLabel>
                      Confirm Password: <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type={togglepassconfirm ? "text" : "password"}
                        className="w-full bg-[#F8F8F8] placeholder:text-[#8E8E8E] placeholder:pl-2 py-7"
                        placeholder="Re-enter your password"
                      />
                    </FormControl>
                    <Flex className="justify-start max-sm:flex-col text-start w-full items-start">
                      <FormMessage className="text-nowrap" />
                      <p
                        onClick={() => setTogglepassconfirm(!togglepassconfirm)}
                        className="text-nowrap ml-auto lg:text-right text-[#1E6EE5] underline cursor-pointer text-sm "
                      >
                        {togglepassconfirm ? "Hide Password" : "Show Password"}
                      </p>
                    </Flex>
                  </FormItem>
                )}
              />
            </Flex>
          </Stack>

          <Button
            type="submit"
            className="h-12 lg:w-40 w-full bg-[#0A51BA] hover:bg-[#0a50bae1] cursor-pointer ml-auto"
          >
            {loading ? <Loader className="animate-spin" /> : "Save"}
          </Button>
        </form>
      </Form>
    </ComponentWrapper>
  );
};


export function ComboBoxResponsive({
  value,
  onChange,
  placeholder,
  onInputChange,
  options,
  loading = false,
}: {
  value: string;
  onChange: (option: { value: string; label: string; employeeId?: string } | null) => void;
  placeholder: string;
  options: { value: string; label: string; employeeId?: string; firstName?: string; lastName?: string }[];
  loading?: boolean;
  onInputChange?: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const selectedStatus = options.find(opt => opt.value === value) || null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between lg:w-[400px] md:w-96 py-6 bg-[#F8F8F8] text-gray-800 font-medium rounded-lg border border-gray-300"
        >
          <Flex className="w-full justify-between items-center">
            <Box className={selectedStatus ? "text-gray-800" : "text-gray-400"}>
              {selectedStatus ? selectedStatus.label : placeholder}
            </Box>
            <ChevronDown
              className={`h-5 w-5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            />
          </Flex>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className={`p-0 ${isDesktop ? "w-[400px]" : "w-[90vw] max-w-[350px] max-h-[70vh] mx-auto"} rounded-xl shadow-lg bg-white border border-gray-200`}
        align={isDesktop ? "start" : "center"}
      >
        <StatusList
          options={options}
          loading={loading}
          onSelect={(emp) => {
            onChange(emp);
            setOpen(false);
          }}
          onInputChange={onInputChange}
        />
      </PopoverContent>
    </Popover>
  );
}


function StatusList({
  options,
  onSelect,
  onInputChange,
  loading = false,
}: {
  onSelect: (emp: { value: string; label: string; employeeId?: string } | null) => void;
  options: { value: string; label: string; employeeId?: string; firstName?: string; lastName?: string }[];
  onInputChange?: (value: string) => void;
  loading?: boolean;
}) {
  return (
    <Command className="bg-white rounded-xl">
      <CommandInput
        placeholder="Search by Name or Employee ID..."
        className="h-12 text-base border-b border-gray-200 focus:outline-none px-4"
        onValueChange={onInputChange}
      />
      <CommandList className="max-h-[250px] overflow-y-auto">
        {loading ? (
          <Center className="py-4 text-gray-500">
            <Loader className="animate-spin" /> Loading...
          </Center>
        ) : (
          <CommandGroup>
            {options.map((emp) => {
              // console.log(emp)
              return (
                <CommandItem
                  key={emp.value}
                  value={`${emp.label} ${emp.value}`}
                  onSelect={() => onSelect(emp)}
                  className="py-3 px-4 text-base cursor-pointer hover:bg-blue-50 hover:text-blue-700"
                >
                  <div className="flex flex-col">
                    <span>{emp.label}</span>
                    <span className="text-sm text-gray-500">ID: {emp.employeeId}</span>
                  </div>
                </CommandItem>
              )
            })}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
}

