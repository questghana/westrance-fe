import { Center } from "@/components/ui/center";
import { BarChartComponent } from "./barchart/barchart";
import { Stats } from "./stats";

const AdminHeader = () => {
  return (
    <>
      <Stats />
      <Center className="justify-start items-start max-md:flex-col gap-2">
        <BarChartComponent />
        {/* <RecentActivities /> */}
      </Center>
      {/* <OngoingTasks /> */}
    </>
  );
};

export { AdminHeader };
