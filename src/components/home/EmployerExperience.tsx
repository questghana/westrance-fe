import React from 'react'
import { Box } from '../ui/box'
import Empexp1 from "/homeimg/Employerexp1.png"
import laptop from "/homeimg/laptop.png"
import Empexp2 from "/homeimg/Employerexp2.png"
import mobile from "/homeimg/mobile.png"

const EmployerExperience: React.FC = () => {
  return (
   <Box className="lg:mt-20 lg:space-y-20">

  {/* Section 1 */}
  <Box className="relative w-full h-auto">
    {/* Background Image */}
    <Box className="absolute inset-0 lg:bg-[url('/homeimg/Employebg.png')] bg-cover bg-center z-0" />

    {/* Content */}
    <Box className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-6">
      {/* Left Text */}
      <Box className="flex flex-col lg:gap-4 items-center lg:items-start text-center lg:text-left">
        <Box className="flex items-center gap-2">
          <img src={Empexp1} alt="Empexp1" className="lg:h-8 lg:w-8 w-4 h-4" />
          <p className="text-[#586C89] text-sm">Employer Experience</p>
        </Box>
        <h3 className="text-[#222222] text-[24px] lg:text-5xl font-medium leading-relaxed lg:leading-[4rem]">
          <span className="bg-bottom bg-no-repeat lg:bg-[url('/homeimg/structurebottomline.png')] pb-2">
            Maximize
          </span>{" "}
          the Value of <br className='lg:flex hidden'/> Every Healthcare Dollar
        </h3>
        <p className="text-[#5B5B5B] text-[12px] lg:text-[16px] leading-5 lg:leading-6 lg:tracking-wider mx-10 lg:mx-0">
          Westrance simplifies healthcare benefits management, enhancing <br className='lg:flex hidden'/>
          employee experience while reducing operational hassle. Our <br className='lg:flex hidden'/> smart
          platform helps you deliver personalized care access and <br className='lg:flex hidden'/> unlock
          measurable savings per employee — year after year.
        </p>
      </Box>

      {/* Right Image */}
      <img
        src={laptop}
        alt="Laptop"
        className="w-full lg:w-[600px] lg:h-[600px] object-contain lg:pt-0"
      />
    </Box>
  </Box>

  {/* Section 2 - Reversed */}
  <Box className="relative w-full h-auto mt-10">
    <Box className="absolute inset-0 lg:bg-[url('/homeimg/exp2bg.png')] bg-cover bg-center" />
    <Box className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-center gap-8">
      <img
        src={mobile}
        alt="Mobile"
        className="w-full lg:w-[600px] lg:h-[600px] object-contain md:pt-10"
      />
      

      <Box className="flex flex-col lg:gap-4  items-center lg:items-start text-center lg:text-left ">
        <Box className="flex items-center gap-2">
          <img src={Empexp2} alt="Empexp2" className="lg:h-8 lg:w-8 w-4 h-4" />
          <p className="text-[#586C89] text-sm">Employer Experience</p>
        </Box>
        <h3 className="text-[#222222] text-[24px] lg:text-5xl font-medium leading-relaxed lg:leading-[4rem]">
          <span className="bg-bottom bg-no-repeat lg:bg-[url('/homeimg/structurebottomline.png')] pb-2">
            Health Be
          </span>
          nefits Your <br className='lg:flex hidden'/> Team Will Value — <br className='lg:hidden flex'/> Truly.
        </h3>
        <p className="text-[#5B5B5B] text-[12px] lg:text-[16px] leading-5 lg:leading-6 lg:tracking-wider mx-10 lg:mx-0">
          Westrance brings clarity and convenience to employee healthcare. <br className='lg:flex hidden'/> By
          simplifying how they access, understand, and manage benefits, <br className='lg:flex hidden'/> we help
          them make smarter care decisions while keeping personal <br className='lg:flex hidden'/> costs low.
        </p>
      </Box>
    </Box>
  </Box>

</Box>


  )
}

export default EmployerExperience