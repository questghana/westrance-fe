import { AppSidebar, NavItem } from "@/components/admin/appsidebar";
import { HorizontalNavbar } from "@/components/admin/horizontalnavbar/horizontalnavbar";
import { PageWrapper } from "@/components/common/pagewrapper";
import { Box } from "@/components/ui/box";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React, { CSSProperties } from "react";
import { Outlet } from "react-router";
import SidebarSvg1 from "/westrance side images/sidebarsvg1.svg";
import SidebarSvg2 from "/westrance side images/sidebarsvg2.svg";
import SidebarSvg3 from "/westrance side images/sidebarsvg3.svg";
import SidebarSvg5 from "/westrance side images/sidebarsvg5.svg";
import reportanalytics from "/companyside/report&analytics.svg";
import setting from "/companyside/setting.svg";
import support from "/companyside/support.svg";
// import Dots from "/westrance side images/dots.svg";
import { useAuthStore } from "@/store/userInfo.store";

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/company-dashboard",
    icon: SidebarSvg1,
  },
  {
    title: "Employee Management",
    url: "/company-dashboard/employee-management",
    icon: SidebarSvg2,
  },
  {
    title: "Hospitals & Pharmacies",
    url: "/company-dashboard/hospital-pharmacy",
    icon: SidebarSvg3,
  },
  {
    title: "Invoices",
    url: "/company-dashboard/invoices",
    icon: SidebarSvg5,
  },
  // {
  //   title: "",
  //   url: "",
  //   icon: Dots,
  // },
  {
    title: "Reports & Analytics",
    url: "/company-dashboard/reports-analytics",
    icon: reportanalytics,
  },
  {
    title: "Support",
    url: "/company-dashboard/support",
    icon: support,
  },
  {
    title: "Settings",
    url: "/company-dashboard/setting",
    icon: setting,
  },
];

const Companylayout: React.FC = () => {
  const {company} = useAuthStore()
  return (
    <PageWrapper className="border-none">
      <SidebarProvider
        style={
          {
            "--sidebar-width": "15.7rem",
            "--sidebar-width-icon": "4rem",
          } as CSSProperties
        }
      >
        <AppSidebar navItems={navItems} />
        <SidebarInset className="bg-transparent overflow-auto">
          <HorizontalNavbar Name={company?.companyName} link={"/company-dashboard/setting"} profilelink={''}/>
          <Box className="pb-2">
            <Outlet />
          </Box>
        </SidebarInset>
      </SidebarProvider>
    </PageWrapper>
  );
};

export default Companylayout;
