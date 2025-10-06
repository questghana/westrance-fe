import React, { useEffect, useState } from 'react'
import { ComponentWrapper } from '../common/componentwrapper'
import { Stack } from '../ui/stack'
import { Flex } from '../ui/flex'
import { CalendarPopOver } from '../admin/dashboard/barchart/calendarpopover'
import { Curve } from '../common/curve'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { cn } from '@/lib/utils'
import { BoxProps } from '../ui/box'
import { toast } from 'sonner'
import { axios } from '@/configs/axios.config'
import { Center } from '../ui/center'
import { Loader } from 'lucide-react'
import type { DateRange } from 'react-day-picker'

// const chartData = [
//   { month: "January", desktop: 16, mobile: 80 },
//   { month: "February", desktop: 30, mobile: 200 },
//   { month: "March", desktop: 37, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 29, mobile: 130 },
//   { month: "June", desktop: 24, mobile: 140 },
//   { month: "July", desktop: 14, mobile: 140 },
//   { month: "August", desktop: 14, mobile: 140 },
//   { month: "September", desktop: 44, mobile: 140 },
//   { month: "October", desktop: 55, mobile: 140 },
//   { month: "November", desktop: 80, mobile: 140 },
//   { month: "December", desktop: 21, mobile: 140 },
// ];

const chartConfig = {
  desktop: {
    label: "Employees With Dependents",
    color: "#2563eb",
  },
  mobile: {
    label: "Total Employees",
    color: "#2563eb",
  },
} satisfies ChartConfig;

const Companychart: React.FC<BoxProps> = ({ className, ...props }) => {
  const [chartData, setChartData] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<DateRange | undefined>(undefined)
  const getChartData = async (range?: DateRange) => {
    try {
      setLoading(true)
      const params = range?.from && range?.to ? `?from=${range.from.toISOString()}&to=${range.to.toISOString()}` : ""
      const response = await axios.get(`/company/analytics${params}`)
      setChartData(response.data.data)
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getChartData()
  }, [])
  return (
    <ComponentWrapper className={cn("p-2 max-sm:p-0 w-full", className)} {...props}>
      <Stack className="gap-5 max-sm:p-2">
        <Flex className="max-lg:flex-col items-start justify-between">
          <Flex className="justify-between w-full">
            {/* <ChartNoAxesCombined /> */}
            <h1 className="text-lg font-medium max-sm:text-[0.9rem] max-md:text-[1.2rem] max-lg:text-[1rem]">
              Analytics
            </h1>
            <CalendarPopOver
              selected={selected}
              onChange={(r) => setSelected(r)}
              onApply={() => getChartData(selected)}
              onReset={() => { setSelected(undefined); getChartData(undefined); }}
            />
          </Flex>
        </Flex>
        <Curve className="-mt-3" />
      </Stack>
{
  loading ? (
    <Center className="py-10 text-gray-500">
    <Loader className="animate-spin" /> Loading...
  </Center>
  ): (
      <ChartContainer
        config={chartConfig}
        className="mt-4 -ml-6 w-full h-[280px] max-sm:w-full"
      >
        <AreaChart accessibilityLayer data={chartData}>
          <defs>
            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="#2563eb" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0.01} />
            </linearGradient>
            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
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
            dataKey="totalEmployees"
            type="linear"
            fill="url(#fillMobile)"
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
          <Area
            dataKey="employeesWithDependents"
            type="linear"
            fill="url(#fillDesktop)"
            fillOpacity={1}
            stroke="#2F74DD"
            strokeWidth={1}
          />
        </AreaChart>
      </ChartContainer>
  )
}
    </ComponentWrapper>)
}

export default Companychart