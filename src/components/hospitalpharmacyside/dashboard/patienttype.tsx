import { ComponentWrapper } from "@/components/common/componentwrapper";
import { Curve } from "@/components/common/curve";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Stack } from "@/components/ui/stack";
import React from "react";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";

const chartData = [
    { name: "Verified \n Patients", desktop: 100, fill: '#0083E6' },
    { name: "Pending \n Verification", desktop: 60, fill: '#78B7ED' },
    { name: "Total \n Enrolled", desktop: 40, fill: '#0083E6' },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

const CustomTick = ({ x, y, payload }: any) => {
    const lines = payload.value.split('\n');
    return (
        <g transform={`translate(${x},${y})`}>
            {lines.map((line: string, index: number) => (
                <text
                    key={index}
                    x={0}
                    y={index * 15}
                    dy={index * 1 + 10}
                    textAnchor="middle"
                    fontSize={12}
                    fill="#333"
                    
                >
                    {line}
                </text>
            ))}
        </g>
    );
};

const Patienttype: React.FC = () => {
  return (
    <ComponentWrapper className="lg:w-85 md:w-full py-2 w-full">
      <Stack className="px-2 pt-1">
        <h1 className='mb-1 font-medium'>Patient Type</h1>
        <Curve />
      </Stack>
      <ChartContainer config={chartConfig} className="mt-4 -ml-8 lg:w-[270px] md:w-[480px] w-[480px] h-[380px] max-sm:w-full"
      >
        <BarChart
          accessibilityLayer
          data={chartData}
          height={500}
          margin={{ right: 2, bottom: 10 }}
        >
          <CartesianGrid vertical={false} strokeDasharray={3} />
          <XAxis
            dataKey="name"
            tickLine={false}
            tick={<CustomTick/>}
            axisLine={true}
            interval={0}
          />
          <YAxis
            tickLine={false}
            axisLine={true}
            strokeDasharray={3}
            tickCount={6}
            fontSize={10}
            domain={[0, 100]}
          />
          <Bar dataKey="desktop" radius={4}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>

    </ComponentWrapper>
  );
};

export default Patienttype;
