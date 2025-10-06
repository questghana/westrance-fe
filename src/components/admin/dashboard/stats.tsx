import {
  Tooltip,
  TooltipTrigger,
  // TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Center } from "@/components/ui/center";
import { Flex } from "@/components/ui/flex";
import { Box } from "@/components/ui/box";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import type { FC } from "react";
import { useEffect, useState } from "react";
import EmployeImge from "/westrance side images/stats1.svg";
import EmployeImge2 from "/westrance side images/stats2.svg";
import EmployeImge3 from "/westrance side images/stats3.svg";
import EmployeImge4 from "/westrance side images/stats4.svg";
import { toast } from "sonner";
import { axios } from "@/configs/axios.config";
import { Loader } from "lucide-react";

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

export const Stats: FC<{ className?: string }> = ({ className }) => {
  const [statsData, setStatsData] = useState<any>([]);
  const [loading, setLoading] = useState(false);


  const getAdminDashboardStats = async () => {
    try {
      setLoading(true)
      const response = await axios.get("/admin/stats")
      setStatsData(response.data)
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }
useEffect(()=>{
  getAdminDashboardStats()
}, [])
  const stats: Stat[] = [
    {
      link: "",
      title: "Total Companies",
      icon: EmployeImge,
      count: loading ? <Loader className="animate-spin"/> : statsData.totalCompanies || "0",
      bgColor: "#e9eefd",
      bgIconColor: "#daeefc",
      iconColor: "#6da4de",
    },
    {
      link: "",
      title: "Total Westrance Employee",
      icon: EmployeImge2,
      count: loading ? <Loader className="animate-spin"/> : statsData.totalWestranceEmployees || "0",
      bgColor: "#f5edfd",
      bgIconColor: "#e8dcfc",
      iconColor: "#715bc0",
    },
    {
      link: "",
      title: "Healthcare Providers",
      icon: EmployeImge3,
      count: loading ? <Loader className="animate-spin"/> : statsData.totalHealthcareProviders || "0",
      bgColor: "#e7fcf7",
      bgIconColor: "#d2f3eb",
      iconColor: "#499581",
    },
    {
      link: "",
      title: "Monthly Claims",
      icon: EmployeImge4,
      count: loading ? <Loader className="animate-spin"/> : statsData.totalMonthlyClaims || "0",
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
  );
};
