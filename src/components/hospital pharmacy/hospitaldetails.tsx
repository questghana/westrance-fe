import { FC, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Flex } from "../ui/flex";
import { Button } from "../ui/button";
import { ExternalLink, Loader, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Center } from "../ui/center";
import { IoIosArrowDown } from "react-icons/io";
import { Box } from "../ui/box";
import { Stack } from "../ui/stack";
import { cn } from "@/lib/utils";
import { HospitalPharmacyHeaderProps } from "./hospitalheader";
import { HospitalEmployeeTable } from "./hospitalemployeetable";
import { useAdminStore, useCompanyStore } from "@/store/admininfo";
import { axios } from "@/configs/axios.config";
import { toast } from "sonner";

// const conpamnyDetails = [
//   {
//     name: "Hospital Name:",
//     detail: "Medilife Hospital",
//   },
//   {
//     name: "Hospital Type:",
//     detail: "Private Healthcare Facility",
//   },
//   {
//     name: "Industry:",
//     detail: "Hospital & Clinical Services",
//   },
//   {
//     name: "Registered Phone Number:",
//     detail: "+233 123 0000 256",
//   },
//   {
//     name: "Numbers of Employess:",
//     detail: "12",
//   },
// ];
// const conpamnyDetails2 = [
//   {
//     name: "Region:",
//     detail: "Ashanti",
//   },
//   {
//     name: "City:",
//     detail: "Kumasi",
//   },
//   {
//     name: "Address:",
//     detail: "No. 10 Bantama High Street",
//   },
//   {
//     name: "Website:",
//     detail: "medilifehosp.com",
//   },
// ];
// const conpamnyDetails3 = [
//   {
//     name: "Administrative Full Name:",
//     detail: "Dr. Efua Owusu-Ansah",
//   },
//   {
//     name: "Administrative Email Address:",
//     detail: "efua.ansah@medilifehosp.com",
//   },
// ];

export const HospitalDetails: FC<HospitalPharmacyHeaderProps> = ({
  ...props
}) => {
  const [activeTab, setActiveTab] = useState("Details");
  const { selectedCompany, UpdateCompanyStatus } = useCompanyStore()
  const { loading, setLoading } = useAdminStore()
  const companyId = selectedCompany?.companyId

  const handleDelete = async () => {
    try {
      setLoading(true)
      const response = await axios.delete(`/admin/deleteHospitalPharmacy/${companyId}`)
      toast.success(response.data.message)
      props.goToStep("hospital pharmacy")
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }
  const updateCompanyStatus = async (companyId: string | undefined, status: string) => {
    try {
      const response = await axios.patch(`/admin/Active-Deactive-Company/${companyId}/status`, 
      {
       status
      })
      toast.success(response.data.message)
      UpdateCompanyStatus(response.data.company.isActive)
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    }
  }

  if (!selectedCompany) return <p>No Company Selected</p>

  return (
    <Tabs
      defaultValue="Details"
      className="w-full mt-6"
      onValueChange={setActiveTab}
    >
      <Flex className="justify-between max-md:flex-col items-start">
        <TabsList className="bg-[#ebf2fd]">
          <TabsTrigger value="Details">Hospital Details</TabsTrigger>
          <TabsTrigger value="Employees">Hospital Employees</TabsTrigger>
        </TabsList>

        {activeTab === "Details" && (
          <Flex>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Center className={`${selectedCompany.isActive ? 'bg-green-600' : 'bg-red-600'} text-white cursor-pointer rounded-sm w-38 h-10 justify-between items-center`}>
                  <h1 className="text-[14px] px-4">{selectedCompany.isActive ? "Active" : "Deactive"}</h1>
                  <Center className={`${selectedCompany.isActive ? 'bg-green-600' : 'bg-red-600'} rounded-tr-sm rounded-br-sm h-10 w-10`}>
                    <IoIosArrowDown className="size-4" />
                  </Center>
                </Center>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="p-1">
                <DropdownMenuCheckboxItem className="p-2" onClick={() => updateCompanyStatus(companyId, "Active")}>
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="p-2" onClick={() => updateCompanyStatus(companyId, "Deactive")}>
                  Deactive
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button onClick={handleDelete} className="w-42 h-10 rounded-md bg-[#FF4E4E] hover:bg-[#FF4E4E]/80 cursor-pointer">
              <Trash2 />
              Delete Hospital
            </Button>
          </Flex>
        )}
      </Flex>

      <TabsContent value="Details" className="mt-6">
        {
          loading ? (
            <Center className="py-10 text-gray-500">
              <Loader className="animate-spin" /> Loading...
            </Center>
          ) : (
            <>
              <Center className="gap-2 items-center text-center">
                <h1>Details</h1>
                <Box className="bg-[#D0D8ED] w-full h-[1px]"></Box>
              </Center>

              <Flex className="justify-between mt-6 max-sm:flex-col-reverse gap-0 items-start">
                <Stack>
                  <Flex className="gap-0">
                    <Box className="w-52 text-gray-400 font-normal text-[15px]">
                      Hospital Name:
                    </Box>
                    <Box>{selectedCompany?.companyName}</Box>
                  </Flex>
                  <Flex className="gap-0">
                    <Box className="w-52 text-gray-400 font-normal text-[15px]">
                      Hospital Type:
                    </Box>
                    <Box>{selectedCompany?.companyType}</Box>
                  </Flex>
                  <Flex className="gap-0">
                    <Box className="w-52 text-gray-400 font-normal text-[15px]">
                      Industry:
                    </Box>
                    <Box>{selectedCompany?.industry ? selectedCompany?.industry : "-"}</Box>
                  </Flex>
                  <Flex className="gap-0">
                    <Box className="w-52 text-gray-400 font-normal text-[15px]">
                      Registered Phone Number:
                    </Box>
                    <Box>{selectedCompany?.registrationNumber}</Box>
                  </Flex>
                  <Flex className="gap-0">
                    <Box className="w-52 text-gray-400 font-normal text-[15px]">
                      Numbers of Employess:
                    </Box>
                    <Box>{selectedCompany?.numberOfEmployees}</Box>
                  </Flex>
                  <Flex className="gap-0">
                    <Box className="w-52 text-gray-400 font-normal text-[15px]">
                      Phone Number: 
                    </Box>
                    <Box>{selectedCompany?.phoneNumber}</Box>
                  </Flex>
                </Stack>

                <Center className="flex-col">
                  <img
                    src={selectedCompany?.profileImage ? selectedCompany?.profileImage : "/Logo/compnaylogo.svg"}
                    alt="Hospital Logo"
                    width={90}
                    height={90}
                  />
                  <h1 className="text-gray-400">Hospital Logo</h1>
                </Center>
              </Flex>
              <Box className="bg-[#D0D8ED] w-2xl max-lg:w-full h-[1px] mt-6"></Box>

              <Flex className="justify-between mt-6 max-sm:flex-col-reverse gap-0 items-start">
                <Stack className="mt-6">
                  <Flex className="gap-0">
                    <Box
                      className={cn("w-52 text-gray-400 font-normal text-[15px]")}
                    >
                      Region:
                    </Box>
                    <Box>{selectedCompany?.region}</Box>
                  </Flex>
                  <Flex className="gap-0">
                    <Box
                      className={cn("w-52 text-gray-400 font-normal text-[15px]")}
                    >
                      City:
                    </Box>
                    <Box>{selectedCompany?.city}</Box>
                  </Flex>
                  <Flex className="gap-0">
                    <Box
                      className={cn("w-52 text-gray-400 font-normal text-[15px]")}
                    >
                      Address:
                    </Box>
                    <Box>{selectedCompany?.address}</Box>
                  </Flex>
                  <Flex className="gap-0">
                    <Box
                      className={cn("w-52 text-gray-400 font-normal text-[15px]")}
                    >
                      Website:
                    </Box>
                    <Box>{selectedCompany?.website ? (
                      <Flex className="gap-1 underline text-blue-500 cursor-pointer items-center">
                        <a
                          href={selectedCompany.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {selectedCompany.website}
                        </a>
                        <ExternalLink className="text-blue-500 size-3.5" />
                      </Flex>
                    ) : (
                      <Box>-</Box>
                    )
                    }
                    </Box>
                  </Flex>
                </Stack>
              </Flex>
              <Box className="bg-[#D0D8ED] w-2xl max-lg:w-full h-[1px] mt-6"></Box>

              <Stack className="mt-6">
                <Flex className="gap-0">
                  <Box className="w-52 text-gray-400 font-normal text-[15px]">
                    Administrative Full Name:
                  </Box>
                  <Box>{selectedCompany?.administrativeName}</Box>
                </Flex>
                <Flex className="gap-0">
                  <Box className="w-52 text-gray-400 font-normal text-[15px]">
                    Administrative Email Address:
                  </Box>
                  <Box>{selectedCompany?.administrativeEmail}</Box>
                </Flex>
              </Stack>
            </>
          )
        }
      </TabsContent>

      <TabsContent value="Employees">
        <HospitalEmployeeTable {...props} />
      </TabsContent>
    </Tabs>
  );
};
