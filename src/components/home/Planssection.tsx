import React from 'react'
import { Box } from '../ui/box'
import { Card, CardContent, CardHeader } from '../ui/card'
import Healthplan1 from "/homeimg/Healthplan1.png"
import Healthplan2 from "/homeimg/Healthplan2.png"
import Healthplan3 from "/homeimg/Healthplan3.png"
import Healthplan4 from "/homeimg/Healthplan4.png"
const Planssection: React.FC = () => {
    return (
        <Box className='py-10'>
            <Box className='md:px-20 px-4 lg:mt-60 flex flex-col lg:gap-10 gap-4 justify-center items-center lg:h-[400px]'>
                <p className='lg:text-5xl md:text-2xl text-[14px] text-center lg:text-start font-semibold '>
                    Simple, Seamless, Supportive — That’s the
                    <Box className='lg:bg-[url(/homeimg/bottomline.png)] bg-bottom lg:pb-4 bg-no-repeat w-45' />
                    <p className='text-center'>Westrance Way.</p>
                </p>
                <p className='text-center text-[10px] lg:text-[16px] md:text-[10px] text-[#5B5B5B] lg:pl-6'>
                    Whether you're checking your benefit balance, verifying your status, or reviewing a submitted bill — Westrance makes <br className='lg:flex hidden'/>
                    healthcare access effortless, giving you more control and clarity every step of the way.
                </p>

                <Box className='w-full lg:px-[4%]'>

                    <Card className='pt-0 overflow-hidden relative z-10'>
                        <CardHeader className='bg-[#7189D1] py-4'>
                            <p className='mt-4 text-center text-[12px] lg:text-lg text-[#FFFFFF] tracking-wide'>Your company offers the healthcare benefits.</p>
                        </CardHeader>
                        <CardContent>
                            <p className='text-[#222222] text-center lg:text-3xl text-[12px] font-bold tracking-wide'>Westrance helps you make the most of them.</p>
                            <Box className='flex flex-col md:flex-row gap-2 justify-around lg:mt-18 mt-10'>
                                <Box className='flex flex-col justify-center items-center gap-6'>
                                    <img src={Healthplan1} alt="Healthplan1" className='lg:w-20 w-10' />
                                    <p className='text-center text-[#000000] text-[12px]'>Easily explore your healthcare plan <br /> options and access your benefit <br /> details online</p>
                                </Box>
                                <Box className='flex flex-col justify-center items-center gap-6'>
                                    <img src={Healthplan2} alt="Healthplan2" className='lg:w-20 w-10' />
                                    <p className='text-center text-[#000000] text-[12px]'>Easily explore your healthcare plan <br /> options and access your benefit <br /> details online</p>
                                </Box>
                                <Box className='flex flex-col justify-center items-center gap-6'>
                                    <img src={Healthplan3} alt="Healthplan3" className='lg:w-20 w-10' />
                                    <p className='text-center text-[#000000] text-[12px]'>Easily explore your healthcare plan <br /> options and access your benefit <br /> details online</p>
                                </Box>
                                <Box className='flex flex-col justify-center items-center gap-6'>
                                    <img src={Healthplan4} alt="Healthplan4" className='lg:w-20 w-10' />
                                    <p className='text-center text-[#000000] text-[12px]'>Easily explore your healthcare plan <br /> options and access your benefit <br /> details online</p>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>

                </Box>
            </Box>
        </Box>
    )
}

export default Planssection