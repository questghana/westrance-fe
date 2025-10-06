import { UseStepper } from "@/hooks/usestepper";
import { FC, ReactNode } from "react";
import { ComponentWrapper } from "../common/componentwrapper";
import { Flex } from "../ui/flex";
import { ArrowLeft } from "lucide-react";
import { HospitalPharmacyStep } from "@/pages/westrancehospital.page";

export interface HospitalPharmacyHeaderProps
  extends UseStepper<HospitalPharmacyStep> {
  steps: HospitalPharmacyStep[];
  children?: ReactNode;
}
export const HospitalHeader: FC<HospitalPharmacyHeaderProps> = ({
  step,
  steps,
  goToStep,
  children,
}) => {
  return (
    <ComponentWrapper className="p-4 mt-4 max-sm:px-3">
      <Flex className="justify-between max-md:flex-col items-start">
        {step === steps[0] && (
          <h1 className="text-lg font-medium capitalize">
            Hospital & Pharmacies
          </h1>
        )}

        {step === steps[1] && (
          <Flex className="justify-between w-full">
            <Flex
              className="text-lg font-medium capitalize cursor-pointer"
              onClick={() => goToStep("hospital pharmacy")}
            >
              <Flex className="rounded-full p-2 bg-[#ebf2fd]">
                <ArrowLeft className="size-4" />
              </Flex>
              Back to the Hospital & Pharmacies List
            </Flex>
          </Flex>
        )}

        {step === steps[2] && (
          <Flex className="justify-between w-full">
            <Flex
              className="text-lg font-medium capitalize cursor-pointer"
              onClick={() => goToStep("view hospital pharmacy details")}
            >
              <Flex className="rounded-full p-2 bg-[#ebf2fd]">
                <ArrowLeft className="size-4" />
              </Flex>
              Back to the Hospital & Pharmacies Details
            </Flex>
          </Flex>
        )}
      </Flex>

      {children}
    </ComponentWrapper>
  );
};
