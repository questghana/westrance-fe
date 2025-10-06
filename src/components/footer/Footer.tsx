import React from 'react'
import Footerbg from "/Footer/Footer.png"
import westrance from "/Footer/Westrance.png"
import { Box } from '@/components/ui/box'
import { FaInstagram, FaLinkedinIn, FaXTwitter, FaYoutube } from 'react-icons/fa6'
import { Separator } from '../ui/separator'
import { MdCopyright } from 'react-icons/md'
import { Flex } from '@/components/ui/flex'
import { IoCallOutline } from 'react-icons/io5'
import { Link } from 'react-router'


type FooterProps =
 {
  prop: number;
};

const Footer: React.FC<FooterProps> = ({prop}) => {
  return (
<Box className="relative text-white bg-cover bg-center w-full" style={{ backgroundImage: `url(${Footerbg})`, backgroundColor: '#002153' }}>
  <Box className={`mx-auto px-4 sm:px-12 lg:px-20 py-10`} style={{paddingTop: `${prop}px`}}>
    <Flex className="flex-col lg:flex-row justify-around items-start gap-8 lg:gap-14">

      {/* LOGO + Tagline + Social */}
      <Box className="flex flex-col gap-9 lg:max-w-md">
      <Link to={'/'}>
      <img src={westrance} alt="logo" className="h-6 w-40" />
      </Link>
        <p className="text-white font-light text-sm ">
          Simplifying Postpaid Healthcare Benefits for  <br /> Modern Workforces.
          Connecting companies, <br /> hospitals, and pharmacies on one seamless <br /> platform.
        </p>
        <Box className='flex flex-col gap-2'>
          <h5 className="text-white font-medium">Follow Us:</h5>
          <Flex className="gap-3 text-xl">
            {[FaLinkedinIn, FaYoutube, FaXTwitter, FaInstagram].map((Icon, index) => (
              <Box 
                key={index}
                className='bg-[#002153] border border-white rounded-full p-2 hover:bg-white hover:text-[#002153] transition-colors cursor-pointer'
              >
                <Icon />
              </Box>
            ))}
          </Flex>
        </Box>
      </Box>

      {/* Questions Section */}
      <Box className="flex flex-col gap-7  lg:max-w-sm ">
        <h3 className="text-white text-xl font-semibold">Questions? We're here to help.</h3>
        <p className="text-white font-light text-sm">
          Our Member Support team (yes, real <br/> people!) is ready to take your calls,
          reply <br /> to messages, and guide you every step of <br /> the way.
        </p>
      </Box>

      {/* Talk to an Agent Section */}
      <Box className="flex flex-col gap-4 lg:max-w-sm">
        <Box>
          <h5 className="text-white text-xl font-semibold">Talk to an Agent</h5>
          <p className="text-white text-sm">Need help? Call us at</p>
        </Box>
        <Flex className="items-center gap-2">
          <IoCallOutline size={20} className="flex-shrink-0"/>
          <p className="text-white font-light text-sm">855-987-6543</p>
        </Flex>
        <p className="text-white font-light text-sm leading-relaxed">
          We're here to support you — in your <br /> preferred language.
        </p>
      </Box>
    </Flex>
  </Box>

  {/* Footer Bottom */}
  <Box className="container mx-auto px-4 sm:px-10 lg:px-22 pt-6 pb-4">
    <Separator className="bg-white/20" />
    <Flex className='flex-col sm:flex-row justify-between items-center gap-4 py-4'>
      <Flex className="items-center gap-2">
        <MdCopyright className="text-lg sm:text-xl"/>
        <p className='text-xs sm:text-sm'>2025 Westrance, Inc. All Rights Reserved.</p>
      </Flex>
      <p className='text-xs sm:text-sm hover:underline cursor-pointer'>Privacy & Cookies Policy</p>
    </Flex>
  </Box>
</Box>



  )
}

export default Footer