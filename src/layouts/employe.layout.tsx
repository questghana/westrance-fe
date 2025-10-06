import { AppSidebar, NavItem } from "@/components/admin/appsidebar";
import { HorizontalNavbar } from "@/components/admin/horizontalnavbar/horizontalnavbar";
import { PageWrapper } from "@/components/common/pagewrapper";
import { Box } from "@/components/ui/box";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React, { CSSProperties } from "react";
import { Outlet } from "react-router";
import SidebarSvg1 from "/westrance side images/sidebarsvg1.svg";
import SidebarSvg2 from "/employee/profile.svg";
import SidebarSvg3 from "/employee/setting.svg";
// import Dots from "/westrance side images/dots.svg";
import { useAuthStore } from "@/store/userInfo.store";

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/employee-dashboard",
    icon: SidebarSvg1,
  },
  {
    title: "Profile Management",
    url: "/employee-dashboard/profile",
    icon: SidebarSvg2,
  },
  // {
  //   title: "",
  //   url: "",
  //   icon: Dots,
  // },
  {
    title: "Settings",
    url: "/employee-dashboard/setting",
    icon: SidebarSvg3,
  },
];

const Employelayout: React.FC = () => {
  const { user } = useAuthStore()
  // console.log(user); 
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
          <HorizontalNavbar Name={user?.name} link={"/employee-dashboard/setting"} profilelink={'/employee-dashboard/profile'} />
          <Box className="pb-2">
            <Outlet />
          </Box>
        </SidebarInset>
      </SidebarProvider>
    </PageWrapper>
  );
};

export default Employelayout;
