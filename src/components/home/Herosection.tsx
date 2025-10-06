import React from 'react';
import { Box } from '@/components/ui/box';
import { Flex } from '@/components/ui/flex';
import Hero from '/homeimg/WESTRANCE_BANNER.png';
import CubGroup from '/homeimg/CubGroup.png';
import Navbar from './Navbar';

const Herosection: React.FC = () => {
  return (
    <Box className="relative">
      <Box className="w-full">
        <img src={Hero} alt="Healthcare benefits hero image" className="w-full max-sm:h-[400px]" />
      </Box> 
      <Box className="rounded-r-md relative top-[-95px] sm:top-[-75px] md:top-[-90px] lg:top-[-120px] xl:top-[-160px]
        xl:w-[650px] lg:w-[490px] md:w-[360px] sm:w-[300px] w-[230px]
        bg-gradient-to-r from-[#3B89FF36] to-[#0A51BA]
        h-5 xl:h-16 lg:h-12 md:h-8 sm:h-6">
        <span className="absolute top-0 text-[#FFFFFF] text-[14px] sm:text-xl xl:text-5xl lg:text-4xl md:text-3xl
          lg:px-28 md:px-12 xl:px-26 sm:px-16 px-14 lg:leading-12 md:leading-8 xl:leading-14 leading-5
          tracking-wider whitespace-nowrap">
          Smarter Healthcare
        </span>
      </Box>
      <Box className="relative top-[-90px] sm:top-[-70px] md:top-[-80px] lg:top-[-110px] xl:top-[-150px]">
        <span className="absolute -top-1 text-[14px] sm:text-xl lg:text-4xl md:text-3xl xl:text-5xl
          lg:px-28 md:px-12 xl:px-26 sm:px-16 px-14 md:tracking-wide lg:tracking-wider xl:tracking-wide">
          Benefits for Your Workforce
        </span>
      </Box>
      <Navbar />
      <Flex className="lg:flex hidden justify-end mt-[-5rem] lg:mt-[-6rem] xl:mt-[-7rem] w-full">
        <img src={CubGroup} alt="Cub group illustration" className="h-20 lg:h-24 xl:h-28" />
      </Flex>
    </Box>
  );
};

export default Herosection;