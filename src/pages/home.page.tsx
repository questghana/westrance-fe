import Footer from '@/components/footer/Footer'
import EmployerExperience from '@/components/home/EmployerExperience'
import Experiencesection from '@/components/home/experiencesection'
import Herosection from '@/components/home/Herosection'
import Member from '@/components/home/Member'
import Planssection from '@/components/home/Planssection'
import Servicesection from '@/components/home/servicesection'
import Structuresection from '@/components/home/structuresection'
import { Box } from '@/components/ui/box'
import React from 'react'

const Home: React.FC = () => {
  return (
    <Box>
        <Herosection/>
        <Servicesection/>
        <Structuresection/>
        <Experiencesection/>
        <EmployerExperience/>
        <Member/>
        <Planssection/>
        <Footer prop={120}/>
    </Box>
  )
}

export default Home