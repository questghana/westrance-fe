import React from 'react'
import { ComponentWrapper } from "@/components/common/componentwrapper";
import { Stack } from "@/components/ui/stack";
import {
    ChartConfig,
    ChartContainer,
} from "@/components/ui/chart"
import { LabelList, Pie, PieChart, Sector } from 'recharts';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';
import { Curve } from '@/components/common/curve';
import { Flex } from '@/components/ui/flex';
import { Box } from '@/components/ui/box';

const chartData = [
    { browser: "chrome", visitors: 600, fill: "#80C4FF" },
    { browser: "safari", visitors: 200, fill: "#1D57B1" },
    { browser: "firefox", visitors: 400, fill: "#2F74DD" },
]

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    chrome: {
        label: "70%",
        color: "blue",
    },
    safari: {
        label: "10%",
        color: "var(--chart-2)",
    },
    firefox: {
        label: "20%",
        color: "var(--chart-3)",
    },
} satisfies ChartConfig

const Hospitalbenefitstype: React.FC = () => {
    return (
        <ComponentWrapper className="w-85 max-md:w-full py-1">
            <Stack className="px-2 py-2">
                <h1 className='mb-2 font-medium'>Benefits Type</h1>
                <Curve className='' />
            </Stack>

            <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px]"
            >
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="visitors"
                        nameKey="browser"
                        innerRadius={40}
                        strokeWidth={5}
                        activeIndex={0}
                        activeShape={({
                            outerRadius = 0,
                            ...props
                        }: PieSectorDataItem) => (
                            <>
                                <Sector {...props} outerRadius={outerRadius + 20} />
                                <Sector {...props} outerRadius={outerRadius + 10} />
                                <Sector {...props} outerRadius={outerRadius + 5} />
                            </>
                        )}
                    >
                        <LabelList
                            dataKey="browser"
                            fill='white'
                            stroke="none"
                            fontSize={16}
                            fontWeight={"bold"}
                            formatter={(value: keyof typeof chartConfig) =>
                                chartConfig[value]?.label
                            }
                        />
                    </Pie>
                </PieChart>
            </ChartContainer>

            <Flex className="px-4 items-center">
                <Stack className="justify-center items-start">
                    <Flex className="gap-4 items-center">
                        <Box className="w-2 h-2 bg-[#2F74DD] rounded-full" />
                        <p>Submitted</p>
                    </Flex>
                    <Flex className="gap-4 items-center">
                        <Box className="w-2 h-2 bg-[#7FC4FF] rounded-full" />
                        <p>Awaiting Approval</p>
                    </Flex>
                    <Flex className="gap-4 items-center">
                        <Box className="w-2 h-2 bg-[#7FC4FF] rounded-full" />
                        <p>Paid</p>
                    </Flex>
                </Stack>
            </Flex>
        </ComponentWrapper>
    )
}

export default Hospitalbenefitstype