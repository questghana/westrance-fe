import Patientlookup from '@/components/hospitalpharmacyside/patientlookup/patientlookup'
import { Box } from '@/components/ui/box'
import React from 'react'

const PatientLookupPage:React.FC = () => {
  return (
    <Box className='pt-4'>
        <Patientlookup/>
    </Box>
  )
}

export default PatientLookupPage