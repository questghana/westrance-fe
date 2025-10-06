import { UseStepper } from "@/hooks/usestepper";
import { FC, ReactNode, useState } from "react";
import { ComponentWrapper } from "../common/componentwrapper";
import { Flex } from "../ui/flex";
import { ArrowLeft, CopyCheck } from "lucide-react";
import { EmployeeManagementStep } from "@/pages/westranceemployeemanagement.page";
import { Stack } from "../ui/stack";
import { Box } from "../ui/box";
import { IoCopyOutline } from "react-icons/io5";

export interface EmployeeManagementHeaderProps
  extends UseStepper<EmployeeManagementStep> {
  steps: EmployeeManagementStep[];
  children?: ReactNode;
}
export const EmployeeManagementHeader: FC<EmployeeManagementHeaderProps> = ({
  step,
  steps,
  children,
  goToStep,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [copytxt, setCopytxt] = useState("De345AB2098321p");

  const handleCopy = () => {
    setCopytxt(copytxt);
    navigator.clipboard.writeText(copytxt);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <ComponentWrapper className="p-4 mt-4 max-sm:px-3">
      <Flex className="justify-between max-md:flex-col items-start">
        {step === steps[0] && (
          <h1 className="text-lg font-medium capitalize">
            Employee Management
          </h1>
        )}

        {step === steps[1] && (
          <Flex className="justify-between w-full">
            <Flex
              className="text-lg font-medium capitalize cursor-pointer"
              onClick={() => goToStep("employee management")}
            >
              <Flex className="rounded-full p-2 bg-[#ebf2fd]">
                <ArrowLeft className="size-4" />
              </Flex>
              Back to the Employee List
            </Flex>
          </Flex>
        )}

        {step === steps[2] && (
          <>
            <Flex className="justify-between w-full">
              <Stack>
                <Flex
                  className="text-lg font-medium capitalize cursor-pointer"
                  onClick={() => goToStep("employee management")}
                >
                  <Flex className="rounded-full p-2 bg-[#ebf2fd]">
                    <ArrowLeft className="size-4" />
                  </Flex>
                  Back to the Employee List
                </Flex>
              </Stack>
            </Flex>
          </>
        )}

        {step === steps[3] && (
          <>
            <Flex className="justify-between w-full">
              <Stack>
                <Flex
                  className="text-lg font-medium capitalize cursor-pointer"
                  onClick={() => goToStep("employee management")}
                >
                  <Flex className="rounded-full p-2 bg-[#ebf2fd]">
                    <ArrowLeft className="size-4" />
                  </Flex>
                  Back to the Employee List
                </Flex>
              </Stack>
            </Flex>
          </>
        )}
      </Flex>

    {(step === "add employee" || step === "edit employee") && (
       <Flex className="pt-4 justify-between flex-col lg:flex-row ">
          <Stack>
            <p className="font-medium">{step === "add employee" ? "Add New Employee" : step === "edit employee" ? "Edit Employee" : ""}</p>
            <Box className="bg-[#F6FAFF] rounded-md lg:w-[500px] md:w-[450px] px-4 py-4">
              <p>
                {step === "add employee" ?
                  "Securely register a new employee, set benefit limits, and manage dependents with ease." :
                  step === "edit employee" ? "Update employee details, adjust benefit limits, and manage dependents with accuracy and control." : ""
                }
              </p>
            </Box>
          </Stack>
          <Flex>
            <p>Unique ID:</p>
            <Flex className="items-center bg-[#ECFBEC] rounded-lg px-6 py-2">
              <p>{copytxt}</p>
              <Box className="border-1 border-[#3C503C] h-6" />
              {isCopied === false ? (
                <IoCopyOutline
                  size={20}
                  className="cursor-pointer"
                  onClick={handleCopy}
                />
              ) : (
                <CopyCheck />
              )}
            </Flex>
          </Flex>
        </Flex>
    )}


      {children}
    </ComponentWrapper>
  );
};
