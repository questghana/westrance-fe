import React from 'react'
import { Box } from '../ui/box'
import { Card } from '../ui/card'
import HappyEmployee from "/homeimg/HappyEmployee.png"
import Westrancestructure from "/homeimg/Westrancestructure.png"
import Cub from "/homeimg/Cub.png"
import { Flex } from '../ui/flex'
const Structuresection: React.FC = () => {
    return (

        <Box className='px-4 lg:px-28 lg:mt-20 py-10'>

            {/* Top Card */}
            <Card className='lg:h-[400px] bg-gradient-to-r from-[#474747] to-[#363636] rounded-xl relative overflow-visible'>
                <Flex className='flex flex-col lg:flex-row items-center lg:items-start '>

                    {/* Text Section */}
                    <Box className='px-6 lg:px-16 py-4 '>
                        <h3 className='text-white text-xl lg:text-5xl font-semibold leading-tight text-center lg:text-left'>
                            <span className='bg-[#0A51BA] md:px-2 pt-10 text-white rounded-b-sm tracking-wide'>Simplify Healthcare</span>Benefits <br />
                            Without the Overhead
                        </h3>
                        <p className='mt-4 text-sm lg:text-[14px] text-white text-center lg:text-left leading-relaxed'>
                            Deliver a connected experience that improves employee satisfaction and <br className='hidden md:block' />
                            outcomes — while giving you greater control over costs and data.
                        </p>
                    </Box>

                    {/* Image Section */}
                    <Box className='flex-1 flex justify-center lg:justify-end w-full lg:w-auto '>
                        <img
                            src={HappyEmployee}
                            alt="HappyEmployee"
                            className='lg:w-[500px] lg:h-[500px] w-60 h-60 object-contain lg:mt-[-130px]'
                        />
                    </Box>

                </Flex>
            </Card>

            {/* Bottom Card */}
            <Box className='relative z-10 lg:mt-[-80px] md:mt-[-60px] mt-[-40px] px-4 md:px-10'>
                <Card className='bg-[#EFEFEF] rounded-xl p-0 pt-10'>
                    <Box className='flex flex-col md:flex-row lg:tems-start items-center md:justify-between md:gap-12 gap-8 px-8'>

                        {/* Image Section */}
                        <Box>
                            <img src={Westrancestructure} alt="Westrancestructure" className='h-28 lg:h-50 object-contain' />
                        </Box>

                        {/* Text Section */}
                        <Box className='flex flex-col text-center md:text-start lg:gap-6 lg:mt-2'>
                            <h3 className='text-2xl lg:text-4xl font-semibold text-[#222] lg:text-left tracking-wide'>
                                <span className='pb-3 lg:bg-[url("/homeimg/structurebottomline.png"))] bg-bottom bg-no-repeat'>Smart Benefit</span> Structuring
                            </h3>
                            <p className='text-[14px] md:text-[12px] lg:text-lg text-[#5B5B5B] lg:text-left leading-relaxed mx-6 md:mx-0'>
                                Deliver a connected experience that improves employee satisfaction and <br className='hidden md:block' />
                                outcomes — while giving you greater control over costs and data.
                            </p>
                        </Box>
                    </Box>

                    {/* Decorative Cube */}
                </Card>
                <Box className='hidden lg:flex justify-end mt-[-40px] h-20'>
                    <img src={Cub} alt="Cub" />
                </Box>
            </Box>

        </Box>

    )
}

export default Structuresection
