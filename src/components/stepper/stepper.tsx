import React from 'react'
import { Box } from '../ui/box'
import { FaRegCheckCircle } from 'react-icons/fa'
import { Link, useLocation } from 'react-router'


const steps = [
    { path: "/company-detail", label: "Company Detail" },
    { path: "/location-detail", label: "Location Details" },
    { path: "/admin-credential", label: "Admin Credentials" },
    { path: "/contact-info", label: "Contact Info" },
];

const Stepper: React.FC = () => {
    const location = useLocation();
    const currentIndex = steps.findIndex((step) =>
        location.pathname.includes(step.path)
    );
    return (
        <Box className='bg-[url(/Registration/stepperbg.png)] bg-no-repeat bg-cover bg-center w-full lg:w-[23%] xl:w-[17%] rounded-2xl'>
            <Box>
                <Link to={'/'}>
                    <img src={'/Logo/logo.png'} alt="" className='lg:block hidden md:h-11 xl:mt-[7%] lg:mt-[8%] xl:ml-[14%] lg:ml-[15%]' />
                </Link>
            </Box>

            <Box className="flex flex-row justify-center lg:justify-start items-center lg:items-start lg:gap-4 gap-3 lg:flex-col flex-wrap lg:py-16 py-6">
                {steps.map((step, index) => {
                    const isCompleted = currentIndex >= index;
                    return (
                        <Box key={step.path} className="px-4 sm:px-6 md:px-10 lg:px-12 w-full">
                            <p className='ml-8 text-[#A8C9FA] text-sm'>STEP {index + 1}</p>
                            <Box className="flex items-center gap-2 w-full">
                                <FaRegCheckCircle
                                    className="flex-shrink-0"
                                    color={isCompleted ? "#ffffff" : "#4084E9"}
                                    size={20}
                                />
                                <p className={`text-sm text-nowrap ${isCompleted ? "text-white" : "text-black"}`}>
                                    {step.label}
                                </p>
                            </Box>
                            {index !== steps.length - 1 && (
                                <div className={`hidden lg:flex ml-2 mt-2 border-l-2 ${isCompleted ? "border-white" : "border-[#A8C9FA]"} h-14`} />
                            )}
                        </Box>
                    );
                })}
            </Box>


        </Box>
    )
}

export default Stepper