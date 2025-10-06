import { ComponentWrapper } from '@/components/common/componentwrapper'
import { Flex } from '@/components/ui/flex'
import { UseStepper } from '@/hooks/usestepper';
import { StaffManagementStep } from '@/pages/Staffmanagement.page';
import { ArrowLeft } from 'lucide-react'
import React, { ReactNode } from 'react'

export interface StaffManagementHeaderProps
    extends UseStepper<StaffManagementStep> {
    steps: StaffManagementStep[];
    children?: ReactNode;
}

const Staffmanagementheader: React.FC<StaffManagementHeaderProps> = ({
    step,
    steps,
    children,
    goToStep,
}) => {
    return (
    <ComponentWrapper className="p-4 mt-4 max-sm:px-3">
      <Flex className="justify-between max-md:flex-col items-start">
        {step === steps[1] && (
          <Flex className="justify-between w-full">
            <Flex
              className="text-lg font-medium capitalize cursor-pointer"
              onClick={() => goToStep("employee management")}
            >
              <Flex className="rounded-full p-2 bg-[#ebf2fd]">
                <ArrowLeft className="size-4" />
              </Flex>
              Back to the Hospital Employee List
            </Flex>
          </Flex>
        )}

        {step === steps[2] && (
          <Flex className="justify-between w-full">
            <Flex
              className="text-lg font-medium capitalize cursor-pointer"
              onClick={() => goToStep("employee management")}
            >
              <Flex className="rounded-full p-2 bg-[#ebf2fd]">
                <ArrowLeft className="size-4" />
              </Flex>
              Back to the Hospital Employee List
            </Flex>
          </Flex>
        )}
      </Flex>

      {children}
    </ComponentWrapper>
    )
}

export default Staffmanagementheader