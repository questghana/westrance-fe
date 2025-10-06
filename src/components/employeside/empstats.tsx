import React from 'react'
import { Box } from '../ui/box'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { Link } from 'react-router'
import { Flex } from '../ui/flex'
import { Center } from '../ui/center'
import { cn } from '@/lib/utils'
import EmpId from "/Dashboardimg/empid.png";
import Emptotalbenefit from "/Dashboardimg/emptotalbenefit.png";
import Empbenefit from "/Dashboardimg/empbenefit.png";
import Empbalance from "/Dashboardimg/empbalance.png";
// import { useAuthStore } from '@/store/userInfo.store'
import {useState} from 'react'
import { axios } from '@/configs/axios.config';
import { toast } from 'sonner';
import { Loader } from 'lucide-react'

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
const Empstats: React.FC<{ className?: string }> = ({ className }) => {
  // const { newEmployeeId, employee } = useAuthStore()
  const [employeeData, setEmployeeData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const getEmployeeDashboardStats = async () => {
    try {
      setLoading(true)
      const response = await axios.get("/employee/dashboard-stats")
      setEmployeeData(response.data.employeeData)
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    getEmployeeDashboardStats()
  }, [])

  const stats: Stat[] = [
    {
      link: "",
      title: "My Unique ID",
      icon: EmpId,
      count: loading ? <Loader className="animate-spin" /> : employeeData?.employeeId || "",
      bgColor: "#e9eefd",
      bgIconColor: "#daeefc",
      iconColor: "#6da4de",
    },
    {
      link: "",
      title: "Total Benefits Available",
      icon: Emptotalbenefit,
      count: loading ? <Loader className="animate-spin" /> : employeeData?.benefits || "",
      bgColor: "#f5edfd",
      bgIconColor: "#e8dcfc",
      iconColor: "#715bc0",
    },
    {
      link: "",
      title: "Benefits Used This Year",
      icon: Empbenefit,
      count: loading ? <Loader className="animate-spin" /> : employeeData?.duration || "",
      bgColor: "#e7fcf7",
      bgIconColor: "#d2f3eb",
      iconColor: "#499581",
    },
    {
      link: "",
      title: "Remaining Balance",
      icon: Empbalance,
      count: loading ? <Loader className="animate-spin" /> : employeeData?.amountPackage || "",
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
          "grid gap-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-2",
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
                  className=" px-6 py-8 relative overflow-hidden cursor-pointer bg-slate-50 border-4 border-white rounded-2xl "
                >
                  <Box
                    style={{ backgroundColor: item.iconColor }}
                    className="bg-red-300 w-1 h-15 absolute left-0 opacity-85"
                  ></Box>
                  <Flex className="justify-between items-center">
                    <h2 className="text-sm font-medium">{item.title}</h2>
                    <Center
                      style={{ backgroundColor: item.bgIconColor }}
                      className={`bg-white borde-none size-10 rounded-md absolute bottom-2 right-2 p-3`}
                    >
                      <img
                        src={item.icon}
                        width={20}
                        height={20}
                        className="opacity-85"
                      />
                    </Center>
                  </Flex>
                  <p className="text-xl font-bold mt-1">{item.count}</p>
                </Link>
              </TooltipTrigger>
              <TooltipContent className="mb-2">
                <p>Click to view {item.title}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </Box>
    </Box>)
}

export default Empstats