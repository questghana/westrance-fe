import Hospitalbenefitstype from '@/components/hospitalpharmacyside/dashboard/hospitalbenefitstype'
import Hospitalchart from '@/components/hospitalpharmacyside/dashboard/hospitalchart'
import Hospitalinvtable from '@/components/hospitalpharmacyside/dashboard/hospitalinvtable'
import Hospitalstats from '@/components/hospitalpharmacyside/dashboard/hospitalstats'
import Patienttype from '@/components/hospitalpharmacyside/dashboard/patienttype'
import { Flex } from '@/components/ui/flex'
import { Stack } from '@/components/ui/stack'
import React from 'react'

const Hospitalpharmacy: React.FC = () => {
    return (
        <Stack className='pt-4'>
            <Hospitalstats />
            <Flex className="max-[950px]:flex-col items-start">
                <Flex className="w-full max-md:flex-col items-start gap-3">
                    <Hospitalchart />
                    <Hospitalbenefitstype />
                </Flex>
            </Flex>
            <Flex className="max-[950px]:flex-col items-start pt-2">
                <Flex className="w-full max-md:flex-col items-start gap-3">
                    <Hospitalinvtable />
                    <Patienttype />
                </Flex>
            </Flex>
        </Stack>
    )
}

export default Hospitalpharmacy