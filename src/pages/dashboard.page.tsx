import { Stats } from "@/components/admin/dashboard/stats";
import { Stack } from "@/components/ui/stack";
import { Flex } from "@/components/ui/flex";
import { BarChartComponent } from "@/components/admin/dashboard/barchart/barchart";
import Reports from "@/components/admin/dashboard/reports";
import { InvoiceTable } from "@/components/admin/dashboard/invoicetable";
import Spends from "@/components/admin/dashboard/spends";
import { CompanyRegistration } from "@/components/admin/dashboard/companyregistartion";

const DashboardPage = () => {
  return (
    <Stack className="pt-4">
      <Stats />
      <Flex className="max-[950px]:flex-col items-start">
        <Flex className="w-full max-md:flex-col items-start">
          <BarChartComponent />
          <Reports />
        </Flex>
      </Flex>

      <Flex className="items-start w-full max-md:flex-col">
        <InvoiceTable />
        <Stack className="max-[950px]:w-full min-w-[20rem] items-start">
          <Spends className="p-4" />
          <CompanyRegistration />
        </Stack>
      </Flex>
    </Stack>
  );
};

export default DashboardPage;
