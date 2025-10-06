import React from 'react'
import { cn } from '@/lib/utils';
import { Link } from 'react-router';
import { Box } from '@/components/ui/box';
import { Tooltip, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Flex } from '@/components/ui/flex';
import { Center } from '@/components/ui/center';
import TotalverBene from "/hospitalpharmacy/TotalverBene.svg"
import appoinments from "/hospitalpharmacy/appoinments.svg"
import billssubmited from "/hospitalpharmacy/billssubmited.svg"
import billspayment from "/hospitalpharmacy/billspayment.svg"
import { useState, useEffect } from 'react';
import { axios } from '@/configs/axios.config';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';

type Stat = {
  // icon: React.ForwardRefExoticComponent<
  //   Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement> & string
  // >;
  icon?: string;
  title: string;
  count: string | number;
  link: string;
  bgColor: string;
  bgIconColor: string;
  iconColor?: string;
};

const Hospitalstats: React.FC<{ className?: string }> = ({ className }) => {
  const [statsData, setStatsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/hospital/dashboard-stats');
        setStatsData(response.data);        
      } catch (err: any) {
        toast.error(err?.response?.data?.error || "Failed to fetch dashboard statistics.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const stats: Stat[] = [
    {
      link: "",
      title: "Total Verified Beneficiaries",
      icon: TotalverBene,
      count: loading ? <Loader className="animate-spin" /> : statsData?.totalVerifiedBeneficiaries || "-",
      bgColor: "#e9eefd",
      bgIconColor: "#daeefc",
      iconColor: "#6da4de",
    },
    {
      link: "",
      title: "Appointments Today",
      icon: appoinments,
      count: loading ? <Loader className="animate-spin" /> : statsData?.appointmentsToday || "-",
      bgColor: "#f5edfd",
      bgIconColor: "#e8dcfc",
      iconColor: "#715bc0",
    },
    {
      link: "",
      title: "Bills Submitted",
      icon: billssubmited,
      count: loading ? <Loader className="animate-spin" /> : statsData?.billsSubmitted || "-",
      bgColor: "#e7fcf7",
      bgIconColor: "#d2f3eb",
      iconColor: "#499581",
    },
    {
      link: "",
      title: "Bills Awaiting Payment",
      icon: billspayment,
      count: loading ? <Loader className="animate-spin" /> : statsData?.billsAwaitingPayment || "-",
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

export default Hospitalstats