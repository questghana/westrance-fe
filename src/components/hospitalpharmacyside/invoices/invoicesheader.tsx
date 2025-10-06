import { ComponentWrapper } from '@/components/common/componentwrapper';
import { Flex } from '@/components/ui/flex';
import { UseStepper } from '@/hooks/usestepper';
import { InvoiceStep } from '@/pages/hospitalpharmacyinv.page';
import { ArrowLeft } from 'lucide-react';
import React, { ReactNode } from 'react'

export interface InvoiceHeaderProps
  extends UseStepper<InvoiceStep> {
  steps: InvoiceStep[];
  children?: ReactNode;
}

const Invoicesheader: React.FC<InvoiceHeaderProps> = ({
  step,
  steps,
  children,
  goToStep,
}) => {

  return (
    <ComponentWrapper className="p-3 mt-4 max-sm:px-3">
      <Flex className="justify-between max-md:flex-col items-start">
        {step === steps[1] && (
          <>
            <Flex className="justify-between w-full">
              <Flex
                className="text-lg font-medium capitalize cursor-pointer"
                onClick={() => goToStep("Invoice")}
              >
                <Flex className="rounded-full p-2 bg-[#ebf2fd]">
                  <ArrowLeft className="size-4" />
                </Flex>
                Back To Record List
              </Flex>
            </Flex>
          </>
        )}
      </Flex>
      {children}
    </ComponentWrapper>
  )
}

export default Invoicesheader