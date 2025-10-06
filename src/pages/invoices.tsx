import Invoices from '@/components/companyside/invoices'
import { Box } from '@/components/ui/box'
import React from 'react'

const InvoicesPage:React.FC = () => {
  return (
    <Box className='pt-4'>
        <Invoices/>
    </Box>
  )
}

export default InvoicesPage