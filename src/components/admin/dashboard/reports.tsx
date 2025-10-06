import { ComponentWrapper } from "@/components/common/componentwrapper";
import ReportImage1 from "/westrance side images/reports1.svg";
import ReportImage2 from "/westrance side images/reports2.svg";
import ReportImage3 from "/westrance side images/reports3.svg";
import { Stack } from "@/components/ui/stack";
import { Center } from "@/components/ui/center";

const Reports = () => {
  const reportsData = [
    {
      icon: ReportImage1,
      title: "New Provider Awaiting Approval",
      bgColor: "#f8f9fb",
    },
    {
      icon: ReportImage2,
      title: "Suspicious Claim Detected",
      bgColor: "#f8f5ed",
    },
    {
      icon: ReportImage3,
      title: "Payment Delays Reported",
      bgColor: "#e6f8f5",
    },
  ];

  return (
    <ComponentWrapper className="w-68 max-md:w-full h-92">
      <Stack className="px-2 py-2 gap-5">
        {reportsData.map((item, index) => {
          return (
            <Center
              key={index}
              className="py-9 px-4 rounded-xl gap-3"
              style={{
                fontFamily: "Outfit",
                backgroundColor: item.bgColor,
              }}
            >
              <img src={item.icon} alt="report" width={20} height={20} />

              <h1 className="text-[15px] w-80 max-md:w-full leading-4">
                {item.title}
              </h1>
            </Center>
          );
        })}
      </Stack>
    </ComponentWrapper>
  );
};

export default Reports;
