import React, { useEffect, useState } from 'react'
import { Box } from '../ui/box'
import { cn } from '@/lib/utils';
import { Tooltip, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Link } from 'react-router';
import { Flex } from '../ui/flex';
import { Center } from '../ui/center';
import stats1 from "/Dashboardimg/employe.svg"
import stats2 from "/Dashboardimg/dependents.svg"
import stats3 from "/Dashboardimg/hospital.svg"
import stats4 from "/Dashboardimg/pharmics.svg"
// import { useRegisterStore } from '@/store/companyRegistrationStore';
// import { useAuthStore } from '@/store/userInfo.store';
// import fetchCompany from '@/hooks/usecompany';  
// import fetchMyEmployees from '@/hooks/useemployee';
import { toast } from 'sonner';
import { axios } from '@/configs/axios.config';
import { Loader } from 'lucide-react';

type Stat = {
  // icon: React.ForwardRefExoticComponent<
  //   Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement> & string
  // >;
  icon?: string;
  title: string;
  count: string;
  link: string;
  bgColor: string;
  bgIconColor: string;
  iconColor?: string;
};



const Companystats: React.FC<{ className?: string }> = ({ className }) => {
  const [statsData, setStatsData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const getCompanyDashboardStats = async()=>{
    try {
      setLoading(true)
      const response = await axios.get("/company/dashboard-stats")
      setStatsData(response.data)
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCompanyDashboardStats();
  }, []);

  const stats: Stat[] = [
    {
      link: "",
      title: "Total Employees Added",
      icon: stats1,
      count: loading ? <Loader className="animate-spin" /> : statsData?.employees || "0",
      bgColor: "#e9eefd",
      bgIconColor: "#daeefc",
      iconColor: "#6da4de",
    },
    {
      link: "",
      title: "Employees with Dependents",
      icon: stats2,
      count: loading ? <Loader className="animate-spin" /> : statsData?.employeesWithDependents || "0",
      bgColor: "#f5edfd",
      bgIconColor: "#e8dcfc",
      iconColor: "#715bc0",
    },
    {
      link: "",
      title: "Connected Hospitals",
      icon: stats3,
      count: loading ? <Loader className="animate-spin" /> : statsData?.hospitals || "0",
      bgColor: "#e7fcf7",
      bgIconColor: "#d2f3eb",
      iconColor: "#499581",
    },
    {
      link: "",
      title: "Connected Pharmacies",
      icon: stats4,
      count: loading ? <Loader className="animate-spin" /> : statsData?.pharmacies || "0",
      bgColor: "#fff7ec",
      bgIconColor: "#fff2e0",
      iconColor: "#f0ac5c",
    },
  ];
  return (
    <Box className="bg-white p-3 rounded-2xl">
      <h1 className="font-[500]">Dashboard</h1>
      <Box
        className={cn(
          "grid gap-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  mt-2",
          className
        )}
      >
        {stats.map((item, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  key={index}
                  style={{ backgroundColor: item.bgColor }}
                  to={item.link}
                  className=" px-4 py-6 relative overflow-hidden cursor-pointer bg-slate-50 border-4 border-white rounded-2xl "
                >
                  <Box
                    style={{ backgroundColor: item.iconColor }}
                    className="bg-red-300 w-1 h-15 absolute left-0 opacity-85"
                  ></Box>
                  <Flex className="justify-between items-center">
                    <h2 className="text-sm font-medium">{item.title}</h2>
                    <Center
                      style={{ backgroundColor: item.bgIconColor }}
                      className={`bg-white borde-none size-10 rounded-md absolute bottom-2 right-2 p-2`}
                    >
                      <img
                        src={item.icon}
                        width={20}
                        height={20}
                        className="size-20 opacity-85"
                      />
                    </Center>
                  </Flex>
                  <p className="text-2xl font-bold mt-1">{item.count}</p>
                </Link>
              </TooltipTrigger>
              {/* <TooltipContent className="mb-2">
                <p>Click to view {item.title}</p>
              </TooltipContent> */}
            </Tooltip>
          </TooltipProvider>
        ))}
      </Box>
    </Box>
  )
}

export default Companystats