import React, { useState } from "react";
import { Box } from "../ui/box";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import profileicon from "/Dashboardimg/profileicon.png";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
// import PhoneInput from "react-phone-number-input";
import "react-phone-input-2/lib/style.css";
import "react-phone-number-input/style.css";
import { Flex } from "../ui/flex";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useAuthStore } from "@/store/userInfo.store";
import convertToBase64 from "@/utils/covertbase64";
import { axios } from "@/configs/axios.config";

const dependedschema = z.object({
  FirstName: z.string().min(1, "First Name is required"),
  MiddleName: z.string().optional(),
  LastName: z.string().min(1, "Last Name is required"),
  EmailAddress: z.string().optional(),
  Relation: z.string().min(1, "Relation is required"),
  PhoneNumber: z
    .string()
    .regex(/^\+\d{1,5}\s\d{10}$/, "Use format +<code> <10-digit number> e.g. +233 0123456789")
    .optional(),
  profilePhoto: z.union([z.instanceof(File), z.string()]).optional(),
});

type dependedform = z.infer<typeof dependedschema>;

const DependedForm: React.FC<{ index: number; totalForms: number; onAdd: () => void; onRemove: () => void; canAdd: boolean }> = ({ index, totalForms, onAdd, onRemove, canAdd }) => {
  const [filename, setFilename] = useState("Choose Profile Photo");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState<string>(""); // Initialize countryCode
  const [loading, setLoading] = useState(false)
  const { employee, role } = useAuthStore()
  const employeeId = employee?.employeeId
  const form = useForm<dependedform>({
    resolver: zodResolver(dependedschema),
    defaultValues: {
      FirstName: '',
      MiddleName: '',
      LastName: '',
      EmailAddress: '',
      Relation: '',
      PhoneNumber: '',
      profilePhoto: '',
    }
  });

  const { control, handleSubmit, formState: { isSubmitting } } = form;

  const onSubmit = async (data: dependedform) => {
    setLoading(true)
    try {
      if (role === "Employee") {
        const fileInput = document.getElementById('fileinp') as HTMLInputElement;
        const file = fileInput?.files?.[0];
        let payload: any = {
          ...data,
          employeeId,
        };

        if (file) {
          const base64Image = await convertToBase64(file);
          payload.profilePhoto = base64Image;
        }
        console.log(payload)
        const response = await axios.post("/employee/add-dependent", payload)
        toast.success(response.data.message)
      }
      else if (role === "Hospital Employee") {
        const fileInput = document.getElementById('fileinp') as HTMLInputElement;
        const file = fileInput?.files?.[0];
        let payload: any = {
          ...data,
          employeeId,
        };

        if (file) {
          const base64Image = await convertToBase64(file);
          payload.profilePhoto = base64Image;
        }
        console.log(payload)
        const response = await axios.post("/hospital/addHospitalDependents", payload)
        toast.success(response.data.message)
      }
      else if (role === "Westrance Employee") {
        const fileInput = document.getElementById('fileinp') as HTMLInputElement;
        const file = fileInput?.files?.[0];
        let payload: any = {
          ...data,
          employeeId,
        };

        if (file) {
          const base64Image = await convertToBase64(file);
          payload.profilePhoto = base64Image;
        }
        const response = await axios.post("/employee/add-Westrance-dependent", payload)
        toast.success(response.data.message)
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Something went wrong")
    } finally {
      setLoading(false)
      form.reset()
      setPreviewUrl(null);
      setFilename("Choose Profile Photo");
      const fileInput = document.getElementById('fileinp') as HTMLInputElement;
      if (fileInput) fileInput.value = ''
    }
  };

  const HandlefileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFilename(file.name);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    } else {
      setFilename("Choose Profile Photo");
      setPreviewUrl(null);
    }
  };

  return (
    <Box className="pt-4">
      <Box className="flex gap-2 items-center">
        <p className="whitespace-nowrap font-medium">
          Depended {index + 1}/{index === totalForms - 1 ? 0 : totalForms - 1}
        </p>
        <Box className="border-[1px] border-[#D0D8ED] w-full" />
        {canAdd && (
          <Button
            onClick={onAdd}
            className="rounded-3xl text-2xl h-10 w-10 px-4 cursor-pointer bg-[#0A51BA] hover:bg-[#4c668d]"
          >
            +
          </Button>
        )}
        {index > 0 && (
          <Button
            onClick={onRemove}
            className="rounded-3xl text-2xl h-10 w-10 px-4 cursor-pointer bg-red-500 hover:bg-red-600"
          >
            -
          </Button>
        )}
      </Box>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="pt-4 flex flex-col lg:flex-row justify-between lg:items-start items-center gap-6">
            <Box className="flex flex-col gap-6">
              <Box className="flex flex-col lg:flex-row gap-6">
                <FormField
                  control={control}
                  name="FirstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        First Name: <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} className="lg:w-70 py-6 bg-[#F8F8F8]" placeholder="Enter first name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="MiddleName"
                  render={({ field }) => (
                    <FormItem>
                      <Box>
                        <FormLabel className="text-sm font-medium">
                          Middle Name: (Optional)
                        </FormLabel>
                        <FormControl>
                          <Input {...field} className="lg:w-70 py-6 bg-[#F8F8F8]" placeholder="Enter middle name" />
                        </FormControl>
                      </Box>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Box>

              <FormField
                control={control}
                name="LastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Last Name: <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="lg:w-70 py-6 bg-[#F8F8F8]" placeholder="Enter last name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="EmailAddress"
                render={({ field }) => (
                  <FormItem>
                    <Box>
                      <FormLabel className="text-sm font-medium">Email Address:</FormLabel>
                      <FormControl>
                        <Input {...field} className="lg:w-120 py-7 bg-[#F8F8F8]" placeholder="Enter email address" />
                      </FormControl>
                    </Box>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="Relation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Relation: <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="md:w-96 lg:w-[385px] w-63 py-7 bg-[#F8F8F8] custom-placeholder">
                          <SelectValue placeholder="Select your relationship" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Select your relationship</SelectLabel>
                            <SelectItem value="Mother">Mother</SelectItem>
                            <SelectItem value="Father">Father</SelectItem>
                            <SelectItem value="Brother">Brother</SelectItem>
                            <SelectItem value="Sister">Sister</SelectItem>
                            <SelectItem value="Spouse">Spouse</SelectItem>
                            <SelectItem value="Daughter">Daughter</SelectItem>
                            <SelectItem value="Son">Son</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="PhoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <Box>
                      <FormLabel className="text-sm font-medium">
                        Phone Number:
                      </FormLabel>
                      <Box className="flex flex-col lg:flex-row items-center gap-4 w-[100%]">
                        <Input
                          value={countryCode}
                          onChange={(e) => {
                            const next = e.target.value
                              .replace(/[^+0-9]/g, '')
                              .replace(/(?!^)[+]/g, '')
                              .slice(0, 5);
                            setCountryCode(next);
                            const local = (form.getValues('PhoneNumber')?.split(' ')[1] || '');
                            form.setValue('PhoneNumber', `${next} ${local}`.trim(), { shouldValidate: true, shouldDirty: true });
                          }}
                          className="bg-[#F4F4F4] text-[#222] py-7 px-3 rounded-md text-sm border border-[#DCDEE2] w-24"
                          placeholder="+233"
                        />
                        <Input
                          value={(field.value?.split(' ')[1] || '').replace(/\D/g, '').slice(0, 10)}
                          onChange={(e) => {
                            const local = e.target.value.replace(/\D/g, '').slice(0, 10);
                            form.setValue('PhoneNumber', `${countryCode} ${local}`.trim(), { shouldValidate: true, shouldDirty: true });
                          }}
                          inputMode="numeric"
                          pattern="\d{10}"
                          maxLength={10}
                          className="lg:w-70 py-7 bg-[#F8F8F8]" 
                          placeholder="Enter Phone Number" 
                          />
                      </Box>
                    </Box>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Box>

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
                    <img src={profileicon} alt="profileicon" className="h-35" />
                  </AvatarFallback>
                )
                }
              </Avatar>
              <Input
                type="file"
                onChange={HandlefileChange}
                className="hidden"
                id={`fileinp`}
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
          <Flex className="justify-center lg:justify-end py-6 lg:mr-6">
            <Button disabled={isSubmitting} type="submit"
              className="lg:w-46 md:w-90 px-16 py-6 cursor-pointer bg-[#0A51BA] hover:bg-[#0a50bae8]">
              {loading ? <Loader className="animate-spin" /> : "Save"}
            </Button>
          </Flex>
        </form>
      </Form>
    </Box>
  );
};

const DependedFormContainer: React.FC = () => {
  const [formCount, setFormCount] = useState(1);
  const maxForms = 3;

  const handleAddForm = () => {
    if (formCount < maxForms) {
      setFormCount((prev) => prev + 1);
    }
  };

  const handleRemoveForm = () => {
    setFormCount((prev) => prev - 1);
  };

  return (
    <Box>
      {Array.from({ length: formCount }).map((_, index) => (
        <DependedForm
          key={index}
          index={index}
          totalForms={formCount}
          onAdd={handleAddForm}
          onRemove={handleRemoveForm}
          canAdd={formCount < maxForms}
        />
      ))}
    </Box>
  );
};

export default DependedFormContainer;