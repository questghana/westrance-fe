import React, { useState, useEffect } from 'react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { cn } from '@/lib/utils'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BoxProps } from '@/components/ui/box';
import { ComponentWrapper } from '@/components/common/componentwrapper';
import { Stack } from '@/components/ui/stack';
import { Flex } from '@/components/ui/flex';
import { CalendarPopOver } from '@/components/admin/dashboard/barchart/calendarpopover';
import { Curve } from '@/components/common/curve';
import { axios } from '@/configs/axios.config';
import { toast } from 'sonner';
import { Center } from '@/components/ui/center';
import { Loader } from 'lucide-react';
import type { DateRange } from 'react-day-picker'

interface MonthlyVisitData {
  month: string;
  visits: number;
}

const chartConfig = {
  desktop: {
    label: "Patient Visits",
    color: "#2563eb",
  },
} satisfies ChartConfig;

const Hospitalchart: React.FC<BoxProps> = ({ className, ...props }) => {
  const [chartData, setChartData] = useState<MonthlyVisitData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<DateRange | undefined>(undefined)

  const fetchChartData = async (range?: DateRange) => {
    try {
      setLoading(true);
      const params = range?.from && range?.to ? `?from=${range.from.toISOString()}&to=${range.to.toISOString()}` : '';
      const response = await axios.get(`/hospital/patient-visits/monthly${params}`);
      setChartData(response.data.data.map((item: any) => ({ month: item.month.slice(0, 3), desktop: item.visits })));
    } catch (err: any) {
      toast.error(err?.response?.data?.error || 'Failed to load visits');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);


  return (
    <ComponentWrapper className={cn("p-2 max-sm:p-0 w-full", className)} {...props}>
      <Stack className="gap-5 max-sm:p-2">
        <Flex className="max-lg:flex-col items-start justify-between">
          <Flex className="justify-between w-full">
            {/* <ChartNoAxesCombined /> */}
            <h1 className="text-lg font-medium max-sm:text-[0.9rem] max-md:text-[1.2rem] max-lg:text-[1rem]">
              Analytics
            </h1>
            <p className='text-sm'>Patient Visits Over Time</p>
            <CalendarPopOver
              selected={selected}
              onChange={(r) => setSelected(r)}
              onApply={() => fetchChartData(selected)}
              onReset={() => { setSelected(undefined); fetchChartData(undefined); }}
            />
          </Flex>
        </Flex>
        <Curve className="-mt-3" />
      </Stack>

      {loading ? (
        <Center className="py-10 text-gray-500"><Loader className="animate-spin" />Loading...</Center>
      ) : (
        <ChartContainer
          config={chartConfig}
          className="mt-4 -ml-6 w-full h-[320px] max-sm:w-full"
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
      )}
    </ComponentWrapper>
  );
};

export default Hospitalchart;
