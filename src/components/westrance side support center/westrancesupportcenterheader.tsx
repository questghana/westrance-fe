import { UseStepper } from "@/hooks/usestepper";
import { FC, ReactNode } from "react";
import { Flex } from "../ui/flex";
import { ComponentWrapper } from "../common/componentwrapper";
import { ArrowLeft } from "lucide-react";
import { SupportCenterStep } from "@/pages/westrancesupportcenter.page";

export interface WestranceSupportCenterHeaderProps
  extends UseStepper<SupportCenterStep> {
  steps: SupportCenterStep[];
  children?: ReactNode;
}

const WestranceSupportCenterHeader: FC<WestranceSupportCenterHeaderProps> = ({
  children,
  step,
  steps,
  goToStep,
}) => {
  return (
    <ComponentWrapper className="p-4 mt-4 max-sm:px-3">
      <Flex className="justify-between max-md:flex-col items-start">
        {step === steps[0] && (
          <h1 className="text-lg font-medium capitalize">Support Center</h1>
        )}

        {step === steps[1] && (
          <Flex className="justify-between w-full">
            <Flex
              className="text-lg font-medium capitalize cursor-pointer"
              onClick={() => goToStep("support center")}
            >
              <Flex className="rounded-full p-2 bg-[#ebf2fd]">
                <ArrowLeft className="size-4" />
              </Flex>
              Back to the Support Center List
            </Flex>
          </Flex>
        )}
      </Flex>

      {children}
    </ComponentWrapper>
  );
};

export { WestranceSupportCenterHeader };
