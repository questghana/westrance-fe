import Benefitstype from '@/components/companyside/benefitstype'
import Companychart from '@/components/companyside/companychart'
import Companyinvtable from '@/components/companyside/companyinvtable'
import Companystats from '@/components/companyside/companystats'
import Dependentratio from '@/components/companyside/dependentratio'
import { Flex } from '@/components/ui/flex'
import { Stack } from '@/components/ui/stack'
import React from 'react'

const Companydashboardpage: React.FC = () => {
    return (
        <Stack className='pt-4'>
            <Companystats />
            <Flex className="max-[950px]:flex-col items-start">
                <Flex className="w-full flex-col lg:flex-row items-start gap-3">
                    <Companychart />
                    <Benefitstype />
                </Flex>
            </Flex>
            <Flex className="max-[950px]:flex-col items-start pt-2">
                <Flex className="w-full flex-col lg:flex-row items-start gap-3">
                    <Companyinvtable />
                    <Dependentratio />
                </Flex>
            </Flex>
        </Stack>
    )
}

export default Companydashboardpage