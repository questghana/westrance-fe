import { UseStepper } from "@/hooks/usestepper";
import { FC, ReactNode } from "react";
import { Flex } from "../ui/flex";
import { CompanyStep } from "@/pages/companymanagement.page";
import { ComponentWrapper } from "../common/componentwrapper";
import { ArrowLeft } from "lucide-react";

export interface CompanyManagementHeaderProps extends UseStepper<CompanyStep> {
  steps: CompanyStep[];
  children?: ReactNode;
}

const CompanyManagementHeader: FC<CompanyManagementHeaderProps> = ({
  children,
  step,
  steps,
  goToStep,
}) => {
  return (
    <ComponentWrapper className="p-4 mt-4 max-sm:px-3">
      <Flex className="justify-between max-md:flex-col items-start">
        {step === steps[0] && (
          <h1 className="text-lg font-medium capitalize">Company Management</h1>
        )}

        {step === steps[1] && (
          <Flex className="justify-between w-full">
            <Flex
              className="text-lg font-medium capitalize cursor-pointer"
              onClick={() => goToStep("company management")}
            >
              <Flex className="rounded-full p-2 bg-[#ebf2fd]">
                <ArrowLeft className="size-4" />
              </Flex>
              Back to the Company List
            </Flex>
          </Flex>
        )}

        {step === steps[2] && (
          <Flex className="justify-between w-full">
            <Flex
              className="text-lg font-medium capitalize cursor-pointer"
              onClick={() => goToStep("view company details")}
            >
              <Flex className="rounded-full p-2 bg-[#ebf2fd]">
                <ArrowLeft className="size-4" />
              </Flex>
              Back to the Company Details
            </Flex>
            {/* <h1 className="bg-[#FFF9E6] rounded-lg px-6 py-2">
              Total Depended Allowed: 3
            </h1> */}
          </Flex>
        )}
      </Flex>

      {children}
    </ComponentWrapper>
  );
};

export { CompanyManagementHeader };
