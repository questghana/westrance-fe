import { cn } from "@/lib/utils";
import { Box } from "../ui/box";
import { Center } from "../ui/center";
import { Flex } from "../ui/flex";
import { Stack } from "../ui/stack";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { ChevronDownIcon, User } from "lucide-react";
import { FC } from "react";
import { useViewEmployeeStore } from "@/store/employeeinfo";
import { useCompanyStore } from "@/store/admininfo";

type ReusableEmployeeInforProps = {
  dependentDetials: any[];
  employeeDetails: any[];
  headingshow?: boolean
};

export const ReusableEmployeeInfor: FC<ReusableEmployeeInforProps> = ({ headingshow }) => {
  const { dependents, selectedEmployee } = useViewEmployeeStore()
  const { employee } = useCompanyStore()
  return (
    <Box className="bg-white rounded-xl w-full">
      {headingshow && <Center className="gap-2 items-center text-center mt-8">
        <h1 className="whitespace-nowrap font-medium">
          Your Personal Information
        </h1>
        <Box className="bg-[#D0D8ED] w-full h-[1px]"></Box>
      </Center>
      }
      <Flex className="lg:flex-row flex-col justify-between items-start mt-8">
        <Stack>
          <Flex className="flex-col md:flex-col items-start gap-3">
            <Box className="md:gap-27 flex flex-col md:flex-row justify-center text-gray-400">
              First Name:
              <Box className="text-black font-medium text-[15px] capitalize">
                {selectedEmployee?.firstName || employee?.firstName}
              </Box>
            </Box>
            <Box className="md:gap-28 flex flex-col md:flex-row justify-center text-gray-400">
              Last Name:
              <Box className="text-black font-medium text-[15px] capitalize">
                {selectedEmployee?.lastName || employee?.lastName}
              </Box>
            </Box>
            <Box className="md:gap-36 flex flex-col md:flex-row justify-center text-gray-400">
              Email:
              <Box className="text-black font-medium text-[15px] capitalize">
                {selectedEmployee?.emailAddress || employee?.emailAddress}
              </Box>
            </Box>
            <Box className="md:gap-10 flex flex-col md:flex-row justify-center text-gray-400">
              Phone Number:
              <Box className="text-black font-medium text-[15px] capitalize ">
                {selectedEmployee?.registrationNumber || employee?.PhoneNumber}
              </Box>
            </Box>
            <Box className="md:gap-32 flex flex-col md:flex-row justify-center text-gray-400">
              Benefits:
              <Box className="text-black font-medium text-[15px] capitalize">
                {selectedEmployee?.benefits || employee?.benefits}
              </Box>
            </Box>
            <Box className="md:gap-18 flex flex-col md:flex-row justify-center md:items-center items-start text-gray-400">
              Amount Package:
              <Box className="capitalize font-medium text-[15px] bg-[#f3f6fe] p-2 rounded-xl text-[#0C2367]">
                ¢ {selectedEmployee?.amountPackage || employee?.amountPackage}
              </Box>
            </Box>
            <Box className="md:gap-8 flex flex-col md:flex-row justify-center md:items-center items-start text-gray-400">
              Number of Dependents:
              <Box className="text-black capitalize font-medium text-[15px] bg-[#f3f6fe] p-2 rounded-xl">
                {selectedEmployee?.dependents || employee?.dependents}
              </Box>
            </Box>
          </Flex>
        </Stack>
        {
          selectedEmployee?.profileImage || employee?.profileImage ? (
            <img
              width={160}
              height={160}
              src={selectedEmployee?.profileImage || employee?.profileImage}
              className="rounded-md"
              alt="profileImage"
            />
          ) : (
            <div className="w-[160px] h-[160px] flex items-center justify-center rounded-md bg-gray-200 text-gray-600">
              <User size={64} />
            </div>
          )
        }
      </Flex>

      <Box className="mt-6">
        <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
          {dependents?.length === 0 ? (
            <h1 className="text-center text-[#2357EE] font-semibold text-xl">No dependent found</h1>
          ) : (
            dependents?.map((dependent, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="cursor-pointer text-[18px] text-blue-500/80 font-normal">
                  See Dependent {index + 1}
                  <ChevronDownIcon
                    aria-hidden
                    className="text-white pointer-events-none size-6 !flex justify-center items-center text-center mr-auto bg-[#2357EE] rounded-full p-1"
                  />
                </AccordionTrigger>
                <AccordionContent className="flex flex-col text-balance">
                  <Flex className="lg:flex-row flex-col justify-between items-start gap-4">
                    <Stack>
                      <Flex key={index} className="flex-col md:flex-col items-start gap-3">
                        <Box className="flex flex-col md:flex-row justify-center md:gap-30 text-gray-400">
                          First Name:
                          <Box className="text-black font-medium text-[15px] capitalize">
                            {dependent.firstName}
                          </Box>
                        </Box>
                        <Box className="flex flex-col md:flex-row justify-center md:gap-25 text-gray-400">
                          Middle Name:
                          <Box className="text-black font-medium text-[15px] capitalize">
                            {dependent.middleName ? dependent.middleName : "-"}
                          </Box>
                        </Box>
                        <Box className="flex flex-col md:flex-row md:gap-29 text-gray-400">
                          Last Name:
                          <Box className="text-black font-medium text-[15px] capitalize">
                            {dependent.lastName}
                          </Box>
                        </Box>
                        <Box className="flex flex-col md:flex-row md:gap-22 text-gray-400">
                          Phone Number:
                          <Box className="text-black font-medium text-[15px] capitalize">
                            {dependent.PhoneNumber ? dependent.PhoneNumber : "-"}
                          </Box>
                        </Box>
                        <Box className="flex flex-col md:flex-row md:gap-36 text-gray-400">
                          Email:
                          <Box className="text-black font-medium text-[15px] capitalize">
                            {dependent.emailAddress ? dependent.emailAddress : "-"}
                          </Box>
                        </Box>
                        <Box className="flex items-center md:gap-30 text-gray-400">
                          Relation:
                          <Box
                            className={cn(
                              "font-medium text-[15px] bg-[#f3f6fe] p-2 rounded-xl text-[#0C2367]"
                            )}
                          >
                            {dependent.relation}
                          </Box>
                        </Box>
                      </Flex>
                    </Stack>
                    {dependent.profileImage ? (
                      <img
                        width={160}
                        height={160}
                        src={dependent.profileImage}
                        className="rounded-md object-cover"
                        alt="profileImage"
                      />
                    ) : (
                      <div className="w-[160px] h-[160px] flex items-center justify-center rounded-md bg-gray-200 text-gray-600">
                        <User size={64} />
                      </div>
                    )}
                  </Flex>
                </AccordionContent>
              </AccordionItem>
            ))
          )}
        </Accordion>
      </Box>
    </Box>
  );
};
