import React from 'react'
import { Box } from '../ui/box'
// import Service from "/homeimg/Service.png"
// import Ecosystem from "/homeimg/ecosystem.png"
// import Actionable from "/homeimg/Actionable.png"
// import Support from "/homeimg/support.png"
// import Plan from "/homeimg/plan.png"
import { Flex } from '../ui/flex'
// import { Card, CardHeader } from '../ui/card'
// import { Stack } from '../ui/stack'
import img from "/homeimg/Group.png"
// const cards = [
//     { title: "End-to-End Plan Management", desc: "Administer medical, pharmacy, dental, and vision benefits — all in one platform.", img: Plan },
//     { title: "Unified Ecosystem Hub", desc: "Connect your entire healthcare network in one centralized experience.", img: Ecosystem },
//     { title: "Employee Support & Guidance", desc: "Give your teams access to dedicated support and healthcare navigation.", img: Support },
//     { title: "Actionable Benefits Insights", desc: "Make smarter decisions with clear analytics on usage and spending.", img: Actionable },
// ];

const Servicesection: React.FC = () => {
  return (
    <Flex 
      className="w-full flex flex-col lg:flex-row justify-center lg:items-start md:gap-8 lg:gap-20 py-10"
    >
      <Box className="flex flex-col items-center md:items-center lg:items-start gap-4">
        <img 
          src={img} 
          alt="img" 
          className="w-100 h-100 md:w-100 md:h-100 lg:w-[550px] lg:h-[550px]" 
        />
      </Box>

      <Box className="px-2 lg:px- flex flex-col items-center md:items-center lg:items-start text-center md:text-center lg:text-left lg:gap-6 gap-2 lg:mt-22 max-w-xl">
        <h3 className="text-[#222222] md:text-3xl lg:text-5xl font-medium">
          Simplify Healthcare <br className='lg:flex hidden'/> Benefits Without the <br className='lg:flex hidden'/>
          <span className="bg-bottom bg-[url(/homeimg/bottomline.png)] bg-no-repeat pb-2">
            Overhead
          </span>
        </h3>
        <p className="text-[11px] md:text-base lg:text-[16px] text-[#5B5B5B] mx-10 lg:mx-0">
          Westrance connects companies, hospitals, and pharmacies <br className='lg:flex hidden'/>
          through one powerful postpaid platform. Manage employee <br className='lg:flex hidden'/>
          health benefits, monitor spending, and streamline billing — all <br className='lg:flex hidden'/>
          from a centralized system tailored to your organization’s needs. <br className='lg:flex hidden'/>
          No upfront costs. No confusion. Just seamless healthcare <br className='lg:flex hidden'/> access.
        </p>
      </Box>
    </Flex>
  );
};

export default Servicesection