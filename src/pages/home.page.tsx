import Footer from '@/components/footer/Footer'
import EmployerExperience from '@/components/home/EmployerExperience'
import Experiencesection from '@/components/home/experiencesection'
import Herosection from '@/components/home/Herosection'
import Member from '@/components/home/Member'
import Planssection from '@/components/home/Planssection'
import Servicesection from '@/components/home/servicesection'
import Structuresection from '@/components/home/structuresection'
import { Box } from '@/components/ui/box'
import React, { useEffect } from 'react'
import { useLocation } from 'react-router'

const Home: React.FC = () => {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '')
      const el = document.getElementById(targetId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [location.hash])

  return (
    <Box>
        <Herosection/>
        <Box id="what-we-do">
          <Servicesection/>
        </Box>
        <Box id="what-we-serve">
          <Structuresection/>
        </Box>
        <Box id="about-us">
          <Experiencesection/>
        </Box>
        <EmployerExperience/>
        <Member/>
        <Planssection/>
        <Footer prop={120}/>
    </Box>
  )
}

export default Home