import Footer from '@/components/footer/Footer'
import Signin from '@/components/signin/signin'
import { Box } from '@/components/ui/box'
import React from 'react'

const Login: React.FC = () => {
  return (
    <Box>
        <Signin/>
        <Footer prop={80}/>
    </Box>
  )
}

export default Login