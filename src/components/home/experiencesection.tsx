import React from 'react'
import { Box } from '../ui/box'
import { CardHeader } from '../ui/card'
import { Flex } from '../ui/flex'
import { Separator } from '../ui/separator'
import WelcomeQuin from "/homeimg/WelcomeQuin.png"
import { FaChevronRight } from 'react-icons/fa6'
import { Button } from '../ui/button'
import { FaArrowRight } from "react-icons/fa";
import { TiPlusOutline } from "react-icons/ti";
import { ArrowRight } from 'lucide-react'
import { Stack } from '../ui/stack'

const Experiencesection: React.FC = () => {
    return (
        <Box className="py-10 lg:mt-20 bg-white">
            <Box className="max-w-screen-xl mx-auto px-4 lg:px-16 flex flex-col lg:flex-row gap-12 lg:items-start justify-between">

                {/* Left Card */}
                <Box className="w-full lg:w-[70%] shadow-md p-4 border rounded-lg overflow-hidden lg:h-[700px]">

                    {/* Header */}
                    <Box className="bg-[#387EE5] lg:h-[200px] h-[120px] px-8 overflow-hidden rounded-md">
                        <Flex className="justify-between items-end mt-10 lg:mt-0">
                            <Box className='pb-3'>
                                <h1 className="text-white lg:text-5xl text-[12px]">Welcome Quinn</h1>
                                <p className="text-white lg:text-2xl text-[8px] tracking-wider">We've got you covered.</p>
                            </Box>
                            <Box>
                                <img src={WelcomeQuin} alt="WelcomeQuin" className="lg:h-50 h-20" />
                            </Box>
                        </Flex>
                    </Box>

                    {/* Content */}
                    <Box className="flex flex-col lg:flex-row">

                        {/* Left Sidebar */}
                        <Box className="bg-[#fbf9f9] lg:w-full p-6 border-l">
                            {[1, 2, 3].map((_, idx) => (
                                <Box key={idx}>
                                    <Box className="flex items-center mb-4">
                                        <Box className='flex flex-col flex-1'>
                                            <h2 className="font-bold mb-1">Medical plan</h2>
                                            <p className="text-gray-500 text-sm">Medical plan</p>
                                        </Box>
                                        <ArrowRight size={16} />
                                    </Box>
                                    <Separator className="my-3" />
                                </Box>
                            ))}

                            <Box className="mt-6">
                                <h3 className="font-bold">Benefits</h3>
                                <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet Ouue</p>
                            </Box>
                        </Box>

                        {/* Right Content */}
                        <Box className="lg:w-full py-6 p-8">
                            <Box className="border-l-4 border pt-4 border-l-[#387EE5] mb-4 rounded-none h-34 lg:h-32 lg:w-110">
                                <CardHeader className='px-4'>
                                    <p className="text-sm">
                                        Invite Your Family Members to access their Collective Health
                                        <br className='hidden lg:flex' /> accounts online
                                    </p>
                                    <Button variant="outline" className="mt-2 rounded-full w-[120px]">
                                        Invite family
                                    </Button>
                                </CardHeader>
                            </Box>

                            <Box className="flex flex-col lg:flex-row gap-2 justify-between items-center mb-2">
                                <h3 className="font-bold">Your Activity</h3>
                                <Box className="flex items-center text-green-400">
                                    <span className="text-sm">View All Activity</span>
                                    <FaArrowRight className="ml-1" size={14} />
                                </Box>
                            </Box>

                            <Box className="border-t pt-2">
                                {[1, 2, 3].map((_, idx) => (
                                    <Box key={idx} className="flex justify-between items-center py-2">
                                        <Box className='flex items-center gap-8'>
                                            <p className="text-sm">22/10/2025</p>
                                            <TiPlusOutline color='red' />
                                            <Stack className='gap-0'>
                                                <p>You</p>
                                                <p className="text-sm font-medium">Medical Store</p>
                                            </Stack>
                                        </Box>
                                        <Box className="flex items-center">
                                            <span className="text-sm mr-1">$ 0.00</span>
                                            <FaChevronRight color="green" size={14} />
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* Right Text Content */}
                <Box className="w-full lg:w-[39%] flex flex-col lg:gap-2 lg:mt-20">
                    <h2 className="lg:text-4xl text-3xl font-semibold mb-4 text-center lg:text-start mt-4 lg:mt-0">
                        <span className="lg:bg-[url(/homeimg/bottomline.png)] bg-bottom pb-3 bg-no-repeat leading-relaxed">
                            Experience
                        </span>{" "}
                        Smarter <br className='lg:flex hidden'/> Healthcare Benefits
                    </h2>

                    <Box className='text-center lg:text-start text-[14px] mx-10 lg:mx-0'>
                        <p className="text-gray-600 mb-6">
                            Whether you manage a team of 500 or 50,000+, Westrance <br className='lg:flex hidden'/>
                            gives you the tools to streamline healthcare access, improve <br className='lg:flex hidden'/>
                            employee satisfaction, and control spending — all on a secure, <br className='lg:flex hidden'/>
                            enterprise-ready platform.
                        </p>
                        <p className="text-gray-600">
                            From automated employee ID verification to seamless bill <br className='lg:flex hidden'/>
                            management across hospitals and pharmacies, Westrance <br className='lg:flex hidden'/>
                            centralizes everything in one powerful platform — so you can <br className='lg:flex hidden'/>
                            focus less on admin work and more on your people’s well-being.
                        </p>
                    </Box>
                </Box>
            </Box>
        </Box>

    )
}

export default Experiencesection