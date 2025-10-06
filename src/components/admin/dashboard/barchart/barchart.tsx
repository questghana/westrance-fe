import {
  ChartTooltip,
  ChartContainer,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { type FC, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Flex } from "@/components/ui/flex";
import { Stack } from "@/components/ui/stack";
import { Curve } from "@/components/common/curve";
import { CalendarPopOver } from "./calendarpopover";
import { type BoxProps } from "@/components/ui/box";
import { ComponentWrapper } from "@/components/common/componentwrapper";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import type { DateRange } from "react-day-picker";
import { axios } from "@/configs/axios.config";
import { toast } from "sonner";
import { Center } from "@/components/ui/center";
import { Loader } from "lucide-react";

interface MonthlyUsageData {
  month: string;
  desktop: number;
  mobile: number;
}

const chartConfig = {
  desktop: {
    label: "Westrance",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export const BarChartComponent: FC<BoxProps> = ({ className, ...props }) => {
  const [chartData, setChartData] = useState<MonthlyUsageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<DateRange | undefined>(undefined);

  const fetchMonthlyUsage = async (range?: DateRange) => {
    try {
      setLoading(true);
      const params = range?.from && range?.to
        ? `?from=${range.from.toISOString()}&to=${range.to.toISOString()}`
        : "";
      const response = await axios.get(`/admin/monthly-westrance-usage-analytics${params}`);
      setChartData(response.data.monthlyUsage);
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonthlyUsage();
  }, []);

  return (
    <ComponentWrapper className={cn("p-4 max-sm:p-0 w-full", className)} {...props}>
      <Stack className="gap-5 max-sm:p-2">
        <Flex className="max-lg:flex-col items-start justify-between">
          <Flex className="justify-between w-full">
            {/* <ChartNoAxesCombined /> */}
            <h1 className="text-lg font-medium max-sm:text-[0.9rem] max-md:text-[1.2rem] max-lg:text-[1rem]">
              Analytics
            </h1>
            <p className="font-medium md:text-lg text-[0.9rem]">(Monthly Westrance Usage)</p>
            <CalendarPopOver
              selected={selected}
              onChange={(r) => setSelected(r)}
              onApply={() => fetchMonthlyUsage(selected)}
              onReset={() => { setSelected(undefined); fetchMonthlyUsage(undefined); }}
            />
          </Flex>
        </Flex>
        <Curve className="-mt-1" />
      </Stack>
      {
        loading ? (
          <Center className="py-10 text-gray-500">
            <Loader className="animate-spin" /> Loading...
          </Center>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mt-4 -ml-6 w-full h-[250px] max-sm:w-full"
          >
            <AreaChart accessibilityLayer data={chartData}>
              <defs>
                <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="10%" stopColor="#2563eb" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={true} strokeDasharray={4} strokeOpacity={12} strokeWidth={2} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={true}
                tickMargin={10}
                tickCount={20}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickCount={6}
                tickFormatter={(value) => value}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" hideLabel />}
              />
              <Area
                dataKey="desktop"
                type="linear"
                fill="url(#fillDesktop)"
                fillOpacity={1}
                stroke="#2F74DD"
                strokeWidth={1}
                activeDot={{ stroke: "#ffffff", strokeWidth: 2, r: 2.5 }}
                dot={{
                  stroke: "#A3BFFA",
                  strokeWidth: 4,
                  r: 5,
                  fill: "#2F74DD",
                }}
              />
            </AreaChart>
          </ChartContainer>
        )
      }
    </ComponentWrapper>
  );
};
