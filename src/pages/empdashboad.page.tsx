import Empinvoicetable from '@/components/employeside/empinvoicetable'
import Empstats from '@/components/employeside/empstats'
import { Box } from '@/components/ui/box'
import { Stack } from '@/components/ui/stack'
import React from 'react'

const EmpDashboadPage: React.FC = () => {
    return (
        <Stack className='pt-4'>
            <Empstats />
            <Box className='pt-4'>
            <Empinvoicetable/>
            </Box>
        </Stack>
    )
}

export default EmpDashboadPage