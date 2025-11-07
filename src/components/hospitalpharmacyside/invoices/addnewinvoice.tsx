import { Box } from '@/components/ui/box'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Flex } from '@/components/ui/flex'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Stack } from '@/components/ui/stack'
import { ComboBoxResponsive } from '@/components/westrance side users & roles/usersandrolesheader'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import calender from "/hospitalpharmacy/calender.svg";
import { toast } from 'sonner'
import { Loader } from 'lucide-react'
import { axios } from '@/configs/axios.config'
import { useAuthStore } from '@/store/userInfo.store'

const Benefits = [
  "In-Patient",
  "Out-Patient",
  "Virtual Primary Care",
];


const formSchema = z
  .object({
    PatientName: z.string().min(2, { message: "Patient Name must be at least 2 characters." }),
    EmployeeId: z.string().min(1, { message: "Employee ID is required" }),
    Amount: z.string().min(2, { message: "Amount is required" }),
    BenefitUsed: z.string().min(1, { message: "Select at least one benefit" }),
    SubmittedDate: z.date({ required_error: "Starting date is required" }),
  })

// interface PatientOption {
//   value: string;
//   label: string;
//   employeeId: string;
//   firstName: string;
//   lastName: string;
//   relation: string | null;
//   type: string;
// }

const Addnewinvoice: React.FC = () => {
  const [options, setOptions] = useState<{
    value: string;
    label: string;
    employeeId?: string;
    firstName?: string;
    lastName?: string;
    relation?: string | null;
    type?: string;
  }[]>([]);
  const { loading, setLoading } = useAuthStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      PatientName: "",
      EmployeeId: "",
      Amount: "",
      BenefitUsed: "",
      SubmittedDate: undefined,
    }
  });

  const amount = form.watch("Amount")

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      const response = await axios.post("/hospital/addinvoice", values)
      toast.success(response.data.message)
      form.reset()
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false)
    }
  }

  const fetchPatientbyNameAndId = async (query: string) => {
    try {
      const params: any = {};
      if (/^\d+$/.test(query) || query.length > 10) {
        params.employeeId = query;
      } else {
        params.SelectPatient = query;
      }
      setLoading(true);

      const response = await axios.get("/hospital/patientByNameAndId/search", {
        params,
      });

      const { patients = [] } = response.data;

      const mappedResults: {
        value: string;
        label: string;
        employeeId?: string;
        firstName?: string;
        lastName?: string;
        relation?: string | null;
        type?: string;
      }[] = [];

      patients.forEach((patient: any) => {
        mappedResults.push({
          type: patient.type,
          value: patient.employeeId,
          label: `${patient.firstName} ${patient.lastName}`,
          employeeId: patient.employeeId,
          firstName: patient.firstName,
          lastName: patient.lastName,
          relation: null,
        });

        // Map their dependents
        patient.dependents.forEach((dep: any) => {
          mappedResults.push({
            type: "dependent",
            value: `${dep.employeeId}-${dep.id}`,
            label: `${dep.firstName} (${dep.relation})`,
            employeeId: dep.employeeId,
            firstName: dep.firstName,
            lastName: dep.lastName,
            relation: dep.relation,
          });
        });
      });

      setOptions(mappedResults);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack className='gap-1'>
      {/* Top Bar */}
      {/* <Flex className='justify-end pr-6'>
        <Button className='px-8 py-6 font-medium cursor-pointer'>
          <img src={printer} alt="print" className='h-5' />
          Print
        </Button>
      </Flex> */}

      <h1 className='font-medium mt-8'>Adding New Invoice</h1>
      <Box className="bg-[#F6FAFF] rounded-md lg:w-[410px] md:w-[450px] px-4 py-4">
        <p>Upload invoices based on benefit claims submitted.</p>
      </Box>

      <Stack className='mt-12'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8 mt-6">

            {/* Patient Field */}
            <FormField
              control={form.control}
              name="PatientName"
              render={() => (
                <FormItem>
                  <FormLabel>
                    Select Patient <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <ComboBoxResponsive
                      value={form.watch("EmployeeId")}
                      onChange={(emp) => {
                        if (emp) {
                          form.setValue("PatientName", emp.label);
                          form.setValue("EmployeeId", emp.employeeId!);
                        }
                      }}
                      onInputChange={(inputVal) => {
                        if (inputVal.length > 1) {
                          fetchPatientbyNameAndId(inputVal);
                        } else {
                          setOptions([]);
                          form.setValue("EmployeeId", "");
                          form.setValue("PatientName", "");
                        }
                      }}
                      placeholder="Select & Search patient by name or id"
                      options={options}
                      loading={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Amount + Benefits */}
            <Flex className='gap-4 '>
              <FormField
                control={form.control}
                name="Amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Amount (GHS) <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="lg:w-70 md:w-96 py-6 bg-[#F8F8F8] placeholder:font-bold"
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
                name="BenefitUsed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Benefit Used <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-[350px] py-6 bg-[#F8F8F8]" >
                          <SelectValue placeholder="Select benefits" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup >
                            <SelectLabel>Select Benefits</SelectLabel>
                            {Benefits.map((benefit) => (
                              <SelectItem key={benefit} value={benefit}>
                                {benefit}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Flex className='items-center ml-auto pr-6'>
                <p>Amount (GHS) Package:</p>
                <Box className='bg-[#DFFFFC] px-8 py-2 rounded-md'>
                  <p>₵ {amount ? amount : "0.00"}</p>
                </Box>
              </Flex>
            </Flex>

            {/* Date Picker */}
            <Stack className="gap-0">
              <FormField
                control={form.control}
                name="SubmittedDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Submitted Date:<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full sm:w-96 md:w-96 lg:w-[290px] justify-start text-left font-normal bg-[#F8F8F8] py-7"
                          >
                            <img src={calender} alt="calender" className="text-muted-foreground w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span className="text-[#8E8E8E]">DD, MM , YYYY</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value ? new Date(field.value) : undefined}
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
            </Stack>

            {/* Submit */}
            <Flex className='py-8 pr-5'>
              <Button
                type="submit"
                className="h-12 lg:w-40 w-full bg-[#0A51BA] hover:bg-[#0a50bae1] cursor-pointer ml-auto"
              >
                {loading ? <Loader className="animate-spin" /> : "Save"}
              </Button>
            </Flex>
          </form>
        </Form>
      </Stack>
    </Stack>
  )
}


export default Addnewinvoice