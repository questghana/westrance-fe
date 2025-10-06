import React from 'react'
import { Box } from '../ui/box'
import Regsuccess from "/Registration/Registrationsuccess.png"
import { Alert, AlertDescription } from '../ui/alert'
import { Button } from '../ui/button'
import { Link } from 'react-router'

const Registerdialog: React.FC = () => {
  return (
    <Box>
      <Box className='flex justify-center -mt-16'>
        <img src={Regsuccess} alt="Regsuccess" className='h-60' />
      </Box>
      <Box>
        <p className='text-[#0A51BA] text-center font-bold text-3xl'>Registration Completed</p>
        <p className='text-center text-[#404040] text-sm'>Thank you for your patience</p>
      </Box>
      <Box className='py-4'>
        <Alert className='bg-[#F6FAFF] border-none'>
          <AlertDescription className='flex justify-center text-center text-[#0C1F3C]'>
            Our team is currently reviewing your submitted details. <br /> Approval typically takes 1–2 business days.
          </AlertDescription>
        </Alert>
      </Box>
      <Box className='text-center'>
        <p className='text-[#0C1F3C] text-md'>You will be notified via email once your account has been approved and activated.</p>
      </Box>
      <Box className='flex justify-center py-6'>
        <Link to={'/'}>
        <Button className='h-12 px-12 bg-[#0A51BA] hover:bg-[#0A51BA] cursor-pointer'>Go to homepage</Button>
        </Link>
      </Box>
    </Box>
  )
}

export default Registerdialog