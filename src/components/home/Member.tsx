import React from 'react'
import { Box } from '../ui/box'
import play from "/homeimg/play.png"
const Member: React.FC = () => {
    return (
        <Box className='mt-20 bg-[url(/homeimg/memberbg.png)] bg-cover bg-center lg:h-[600px] py-10'>
            <Box className='flex flex-col lg:flex-row justify-evenly items-center px-14'>
                <Box>
                    <Box className='text-center lg:text-start'>
                        <span className='text-white/90 lg:text-2xl tracking-widest lg:bg-[url(/homeimg/memberbottom.png)] bg-no-repeat bg-bottom pb-3'>Members</span>
                    </Box>
                    <Box className='text-center lg:text-start mx-6 lg:mx-0'>
                        <p className='text-[#FFFFFF] text-[16px] lg:text-5xl lg:leading-16 lg:mt-6 text-lg'>We don’t just simplify <br className='lg:flex hidden'/> your healthcare benefits <br className='lg:flex hidden'/> — we empower you to <br className='lg:flex hidden'/> use them with <br className='lg:flex hidden'/> confidence.</p>
                    </Box>
                </Box>
                <Box>
                    <Box className='flex justify-center lg:items-center bg-[url(/homeimg/Members.png)] bg-center bg-cover lg:h-[400px] lg:w-[600px] h-[200px] w-[300px] '>
                        <img src={play} alt="play" className='lg:w-30 lg:h-30 w-10 h-10 mt-20 lg:ml-10' />
                    </Box>
                    <Box className="flex flex-col lg:flex-row justify-center md:gap-2 lg:gap-3 mt-4 md:mt-8">
                        <p className="text-[#FFFFFF] text-xs sm:text-sm md:text-base lg:text-lg text-center">
                            Are you a member?
                        </p>
                        <p className="text-[#FFFFFF] text-sm md:text-lg lg:text-xl border-b-2 sm:border-b-3 md:border-b-4 border-[#86B6FF] pb-4  md:pb-2 text-center">
                            Sign into your account
                        </p>
                    </Box>

                    <Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Member