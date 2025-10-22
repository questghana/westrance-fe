// import Empaddmodal from "@/components/modal/empaddmodal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog } from "@/components/ui/dialog";
import { Flex } from "@/components/ui/flex";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Stack } from "@/components/ui/stack";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Loader, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import calender from "/companyside/calender.svg";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import profileicon from "/Dashboardimg/profileicon.png";
import { axios } from "@/configs/axios.config";
import { useAuthStore } from "@/store/userInfo.store";
import convertToBase64 from "@/utils/covertbase64";
import { toast } from "sonner";
import { useViewEmployeeStore } from "@/store/employeeinfo";
import { EmployeeManagementStep } from "@/pages/westranceemployeemanagement.page";

const HospitalEmployeeSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    middleName: z.string().optional(),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    companyContact: z
      .string()
      .regex(/^\+\d{1,5}\s\d{11}$/, "Use format +<code> <11-digit number> e.g. +233 01234567890"),
    startingDate: z.date({ required_error: "Starting date is required" }),
    duration: z.string().min(1, "Please select a duration"),
    amount: z.string().min(1, "Amount is required"),
    benefits: z.string().min(1, "Please select benefits"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters"),
    dependents: z.number().min(0).max(3).optional().default(0),
    profilePhoto: z.union([z.instanceof(File), z.string()]).optional(),
    employeeId: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type HospitalEmployeeForm = z.infer<typeof HospitalEmployeeSchema>;
interface Props {
  goToStep: (step: EmployeeManagementStep) => void;
}

const Hospitalemployee = ({ goToStep }: Props) => {
  const [filename, setFilename] = useState("Choose Profile Photo");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [togglepass, setTogglepass] = useState(false);
  const [togglecpass, setTogglecpass] = useState(false);
  const [isChecked, setIsChecked] = useState<CheckedState>(false);
  const [open, setOpen] = useState(false);
  // const [copytxt, setCopytxt] = useState("");
  // const { addEmployee, token } = useAuthStore()
  const [countryCode, setCountryCode] = useState<string>("+233");
  const [isLoading, setIsLoading] = useState(false);
  const { addEmployee } = useAuthStore();
  const { selectedEmployee, mode } = useViewEmployeeStore()

  const form = useForm<HospitalEmployeeForm>({
    resolver: zodResolver(HospitalEmployeeSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      companyContact: "",
      startingDate: undefined,
      duration: "",
      amount: "",
      benefits: "",
      password: "",
      confirmPassword: "",
      dependents: 0,
      profilePhoto: '',
    },
  });

  const HandlefileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFilename(file.name);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      form.setValue("profilePhoto", file);
    } else {
      setFilename("Choose Profile Photo");
      setPreviewUrl(null);
      form.setValue("profilePhoto", undefined);
    }
  };

  const HandleAddDependent = () => {
    if (form.getValues("dependents")! < 3) {
      form.setValue("dependents", (form.getValues("dependents") || 0) + 1);
    }
  };

  const HandleRemoveDependent = () => {
    form.setValue(
      "dependents",
      Math.max((form.getValues("dependents") || 0) - 1, 0)
    );
  };

  useEffect(() => {
    if (mode === "edit" && selectedEmployee) {
      const raw = selectedEmployee.registrationNumber || "";
      const codeMatch = raw.match(/^\+\d{1,5}/);
      let code = "+233";
      let local = "";
      if (codeMatch) {
        code = codeMatch[0];
        const restDigits = raw.slice(codeMatch[0].length).replace(/\D/g, "");
        local = restDigits.slice(0, 11);
      } else {
        const digitsOnly = raw.replace(/\D/g, "");
        if (digitsOnly.length >= 11) {
          local = digitsOnly.slice(-11);
        } else {
          local = digitsOnly;
        }
      }
      setCountryCode(code);
      setPreviewUrl(selectedEmployee.profileImage || '');
      setFilename("Uploaded Image");
      form.reset({
        employeeId: selectedEmployee.employeeId,
        firstName: selectedEmployee.firstName,
        middleName: selectedEmployee.middleName || "",
        lastName: selectedEmployee.lastName,
        email: selectedEmployee.emailAddress,
        companyContact: `${code} ${local}`.trim(),
        startingDate: new Date(selectedEmployee.startingDate),
        duration: selectedEmployee.duration,
        amount: selectedEmployee.amountPackage,
        benefits: selectedEmployee.benefits,
        dependents: Number(selectedEmployee.dependents),
        password: "",
        confirmPassword: "",
        profilePhoto: selectedEmployee?.profileImage || '',
      })
    }
  }, [selectedEmployee, mode])

  const onSubmit = async (data: HospitalEmployeeForm) => {
    setIsLoading(true);
    try {
      if (mode === "add") {
        const fileInput = document.getElementById('fileinp') as HTMLInputElement;
        const file = fileInput?.files?.[0];
        let payload = { ...data };
        if (file) {
          const base64Image = await convertToBase64(file);
          payload = {
            ...data,
            profilePhoto: base64Image,
          };
        }
        const response = await axios.post("/admin/add-Employee", payload)
        toast.success(response.data.message)
        const employee = response.data.data.employee
        addEmployee(employee)
        useAuthStore.getState().setnewEmployeeId(employee.employeeId)
        form.reset()
        goToStep("employee management")
      }
      else if (mode === "edit" && selectedEmployee?.employeeId) {
        const fileInput = document.getElementById('fileinp') as HTMLInputElement;
        const file = fileInput?.files?.[0];
        let payload = { ...data };
        if (file) {
          const base64Image = await convertToBase64(file);
          payload = {
            ...data,
            employeeId: selectedEmployee?.employeeId,
            profilePhoto: base64Image,
          };
        }
        const response = await axios.put(`/admin/edit-Employee`, payload)
        toast.success(response.data.message)
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Box className="bg-white py-3 rounded-2xl">
          <Box className="pt-6">
            <Box className="flex gap-2 items-center">
              <p className="whitespace-nowrap font-medium">
                Your Personal Information
              </p>
              <Box className="border-[1px] border-[#D0D8ED] w-full" />
            </Box>
            <Box className="flex flex-col lg:flex-row justify-between pt-4 gap-4">
              <Stack>
                <Flex className="flex-col items-center lg:items-start lg:flex-row gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          First Name: <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="lg:w-70 md:w-96 py-6 bg-[#F8F8F8]"
                            placeholder="Enter first name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="middleName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Middle Name (Optional):</FormLabel>
                        <FormControl>
                          <Input
                            className="lg:w-70 md:w-96 py-6 bg-[#F8F8F8]"
                            placeholder="Enter middle name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Flex>
                <Box className="pt-3 flex flex-col lg:flex-row justify-between items-center gap-4">
                  <Box className="flex flex-col items-center lg:items-start gap-6">
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Last Name: <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="lg:w-70 md:w-96 py-6 bg-[#F8F8F8]"
                              placeholder="Enter last name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Email Address:{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="md:w-96 py-6 bg-[#F8F8F8]"
                              placeholder="Enter email address"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="companyContact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Phone Number: {" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Box className="flex flex-col lg:flex-row items-center gap-2 w-[100%]">
                              <Input
                                value={countryCode}
                                onChange={(e) => {
                                  const next = e.target.value
                                    .replace(/[^+\d]/g, '')
                                    .replace(/(?!^)[+]/g, '')
                                    .slice(0, 5);
                                  setCountryCode(next);
                                  const local = (form.getValues('companyContact')?.split(' ')[1] || '');
                                  form.setValue('companyContact', `${next} ${local}`.trim(), { shouldValidate: true, shouldDirty: true });
                                }}
                                className="bg-[#F4F4F4] text-[#222] py-7 px-3 rounded-md text-sm border border-[#DCDEE2] w-24"
                                placeholder="+233"
                              />
                              <Input
                                value={(field.value?.split(' ')[1] || '').replace(/\D/g, '').slice(0, 11)}
                                onChange={(e) => {
                                  const local = e.target.value.replace(/\D/g, '').slice(0, 11);
                                  form.setValue('companyContact', `${countryCode} ${local}`.trim(), { shouldValidate: true, shouldDirty: true });
                                }}
                                inputMode="numeric"
                                pattern="\d{11}"
                                maxLength={11}
                                className="md:w-96 bg-[#F8F8F8] placeholder:text-[#8E8E8E] placeholder:pl-2 py-7"
                                placeholder="Enter 11-digit number"
                              />
                            </Box>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </Box>
                </Box>
              </Stack>
              <Box className="flex flex-col items-center md:gap-4 gap-4">
                <Avatar className="w-[220px] h-[220px] bg-[#FBFBFB] rounded-lg px-6 py-6 border-2 border-dashed">
                  {previewUrl ? (
                    <AvatarImage
                      src={previewUrl}
                      alt="@shadcn"
                      className="object-contain max-h-full max-w-full"
                    />
                  ) : (
                    <AvatarFallback className="flex items-end overflow-hidden">
                      <img
                        src={profileicon}
                        alt="profileicon"
                        className="h-35"
                      />
                    </AvatarFallback>
                  )}
                </Avatar>
                <Input
                  type="file"
                  onChange={HandlefileChange}
                  className="hidden"
                  id='fileinp'
                />
                <label
                  htmlFor={`fileinp`}
                  className="rounded-md shadow bg-linear-to-t from-[#EEEEEE] to-[#FFFFFF] border border-[#ECECEC] px-8 py-3 font-medium cursor-pointer"
                >
                  {filename}
                </label>
                <p className="text-[#727481] md:text-start text-center">
                  At least 800 x 800 px recommended. <br />
                  <p className="text-center"> JPG or PNG is allowed</p>
                </p>
              </Box>
            </Box>
          </Box>
          <Flex className="pt-6 gap-2 items-center">
            <p className="whitespace-nowrap font-medium">Set Duration</p>
            <Box className="border-[1px] border-[#D0D8ED] w-[600px]" />
          </Flex>
          <Flex className="flex-col lg:flex-row pt-4 gap-6">
            <FormField
              control={form.control}
              name="startingDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Starting Date: <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="md:w-96 lg:w-[290px] w-60 justify-start text-left font-normal bg-[#F8F8F8] py-7"
                        >
                          <img
                            src={calender}
                            alt="calender"
                            className="text-muted-foreground w-4 mr-2"
                          />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span className="text-[#8E8E8E]">Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          captionLayout="dropdown"
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Month Or Year: <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select key={field.value} onValueChange={field.onChange} value={field.value || ""}>
                      <SelectTrigger className="md:w-96 lg:w-[385px] w-60 py-7 bg-[#F8F8F8] custom-placeholder">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent >
                        <SelectGroup>
                          <SelectLabel>Select Duration</SelectLabel>
                          <SelectItem value="1Month">1 Month</SelectItem>
                          <SelectItem value="3Month">3 Month</SelectItem>
                          <SelectItem value="6Month">6 Month</SelectItem>
                          <SelectItem value="1Year">1 Year</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Flex>
          <Flex className="pt-6 gap-2 items-center">
            <p className="whitespace-nowrap font-medium">Benefit Allocation</p>
            <Box className="border-[1px] border-[#D0D8ED] w-[565px]" />
          </Flex>
          <Flex className="flex-col lg:flex-row pt-4 gap-6">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Amount (GHS) Package:{" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="lg:w-72 md:w-96 py-7 bg-[#F8F8F8] placeholder:font-bold"
                      placeholder="₵ 0.00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="benefits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Benefits: <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select key={field.value} onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="md:w-96 lg:w-[390px] w-60 py-7 bg-[#F8F8F8] custom-placeholder">
                        <SelectValue placeholder="Select Benefits" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select Benefits</SelectLabel>
                          <SelectItem value="In-Patient">In-Patient</SelectItem>
                          <SelectItem value="Out-Patient">Out-Patient</SelectItem>
                          <SelectItem value="Virtual Primary Care">Virtual Primary Care</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Flex>
          <Flex className="pt-6 gap-2 items-center">
            <p className="whitespace-nowrap font-medium">Set Credentials</p>
            <Box className="border-[1px] border-[#D0D8ED] w-[580px]" />
          </Flex>
          <Flex className="flex-col lg:flex-row pt-4 gap-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Password: <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Box>
                      <Input
                        type={togglepass ? "text" : "password"}
                        placeholder="Create a password"
                        className="lg:w-100 md:w-96 py-7 bg-[#F8F8F8]"
                        {...field}
                      />
                      <Box className="flex justify-between mt-2">
                        <FormMessage />
                        <p onClick={() => setTogglepass(!togglepass)} className="ml-auto text-[#1E6EE5] underline cursor-pointer text-sm">{togglepass ? "Hide Password" : "Show Password"}</p>
                      </Box>
                    </Box>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Confirm Password: <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Box>
                      <Input
                        type={togglecpass ? "text" : "password"}
                        placeholder="Re-enter Your password"
                        className="lg:w-100 md:w-96 py-7 bg-[#F8F8F8]"
                        {...field}
                      />
                      <Box className="flex justify-between mt-2">
                        <FormMessage />
                        <p onClick={() => setTogglecpass(!togglecpass)} className="ml-auto text-[#1E6EE5] underline cursor-pointer text-sm">{togglecpass ? "Hide Password" : "Show Password"}</p>
                      </Box>
                    </Box>
                  </FormControl>
                </FormItem>
              )}
            />
          </Flex>
          <Stack className="pt-6">
            <Flex>
              <Checkbox
                checked={isChecked}
                onCheckedChange={setIsChecked}
                className="data-[state=checked]:bg-[#2B76E6] outline-none"
              />
              <p className="font-semibold">
                Add Dependents<span className="font-light">(Optional)</span>
              </p>
            </Flex>
            {isChecked && (
              <Box>
                <Box className="bg-[#F6FAFF] rounded-md lg:w-[550px] md:w-[450px] px-4 py-4">
                  <p>
                    The number of dependents you add here will define how many{" "}
                    <br /> dependent details the employee can submit later in
                    their portal.
                  </p>
                </Box>
                <Stack className="items-center lg:items-start pt-6">
                  <FormField
                    control={form.control}
                    name="dependents"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Number of Dependents:{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Flex className="relative rounded-md">
                            <Input
                              type="text"
                              value={`${field.value || 0} dependents`}
                              readOnly
                              className="lg:w-100 md:w-105 w-80 shadow-none py-7"
                            />
                            <Flex className="absolute lg:left-78 md:left-80 left-60">
                              <Box
                                className="bg-[#C0C0C0] p-1 rounded-full"
                                onClick={HandleRemoveDependent}
                              >
                                <Minus className="h-5 w-5 text-white cursor-pointer" />
                              </Box>
                              <Box className="border-1 border-[#BABECA] h-6" />
                              <Box
                                className={`${(field.value || 0) < 3
                                  ? "bg-[#0A51BA] cursor-pointer"
                                  : "bg-[#C0C0C0] cursor-not-allowed"
                                  } p-1 rounded-full`}
                                onClick={HandleAddDependent}
                              >
                                <Plus className="h-5 w-5 text-white" />
                              </Box>
                            </Flex>
                          </Flex>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Stack>
              </Box>
            )}
          </Stack>
          <Dialog open={open} onOpenChange={setOpen}>
            <Flex className="lg:justify-end justify-center px-4 py-6 cursor-pointer">
              <Button
                type="submit"
                className="h-12 lg:w-40 md:w-96 w-60 bg-[#0A51BA] hover:bg-[#0a50bae1] cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? <Loader className="animate-spin" /> : "Save"}
              </Button>
            </Flex>

            {/* {open === true ? (
              <DialogContent className="[&>button]:hidden rounded-3xl bg-white">
                <Empaddmodal copytxt={copytxt} setCopytxt={setCopytxt} onGoToList={onGoToList} />
              </DialogContent>
            ) : null} */}
          </Dialog>
        </Box>
      </form>
    </FormProvider>
  );
}

export default Hospitalemployee


