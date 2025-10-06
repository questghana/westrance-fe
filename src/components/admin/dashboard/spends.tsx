import { ComponentWrapper } from "@/components/common/componentwrapper";
import { Curve } from "@/components/common/curve";
import { Box, BoxProps } from "@/components/ui/box";
import { Flex } from "@/components/ui/flex";
import { Stack } from "@/components/ui/stack";
import { axios } from "@/configs/axios.config";
import { FC, useEffect, useState } from "react";
import { toast } from "sonner";

const Spends: FC<BoxProps> = ({ className, ...props }) => {
  const [topCompanies, setTopCompanies] = useState<any[]>([])
  const limit = 5
  const getTopCompaniesBySpend = async () => {
    try {
      const response = await axios.get(`/admin/top-company-spend?limit=${limit}`)
      setTopCompanies(response.data.topCompanies)
      console.log(response.data.topCompanies)
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Something went wrong")
    }
  }
  useEffect(() => {
    getTopCompaniesBySpend()
  }, [])

  const topCompaniesData = topCompanies.map((item) => ({
    companyName: item.companyName,
    dotColor: item.companyType === "company" ? "#7FC4FF" : "#69CE7D",
  }))

  const spendsData = [
    {
      companyName: topCompaniesData[0]?.companyName || "",
      dotColor: "#7FC4FF",
    },
    {
      companyName: topCompaniesData[1]?.companyName || "",
      dotColor: "#69CE7D",
    },
    {
      companyName: topCompaniesData[2]?.companyName || "",
      dotColor: "#FB6763",
    },
    {
      companyName: topCompaniesData[3]?.companyName || "",
      dotColor: "#F8DE41",
    },
    {
      companyName: topCompaniesData[4]?.companyName || "",
      dotColor: "#2F74DD",
    },
  ];

  return (
    <ComponentWrapper className={className} {...props}>
      <Stack className="gap-5 max-sm:p-2">
        <Flex className="max-lg:flex-col items-start justify-between">
          <Flex className="justify-between w-full">
            <h1 className="text-lg font-medium max-sm:text-[0.9rem] max-md:text-[1.2rem] max-lg:text-[1rem]">
              Top Company by Spend
            </h1>
          </Flex>
        </Flex>
        <Curve />
      </Stack>

      <Flex className="justify-between mt-12 gap-4">
        <Stack>
          {spendsData.map((item, index) => (
            <Flex key={index} className="items-center gap-2">
              <Box
                className="w-2.5 h-2.5 rounded-full"
                style={item.companyName ? { backgroundColor: item.dotColor } : {}}
              ></Box>
              <p className="text-[15px] text-nowrap">{item.companyName}</p>
            </Flex>
          ))}
        </Stack>
        <img
          src="/westrance side images/spends.svg"
          alt="spends"
          className="size-42"
        />
      </Flex>
    </ComponentWrapper>
  );
};

export default Spends;
