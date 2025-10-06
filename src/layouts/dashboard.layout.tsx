import { HorizontalNavbar } from "@/components/admin/horizontalnavbar/horizontalnavbar";
import { AppSidebar, type NavItem } from "@/components/admin/appsidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { PageWrapper } from "@/components/common/pagewrapper";
import { useEffect, useState, type CSSProperties } from "react";
import { Box } from "@/components/ui/box";
import { Outlet } from "react-router";
import SidebarSvg1 from "/westrance side images/sidebarsvg1.svg";
import SidebarSvg2 from "/westrance side images/sidebarsvg2.svg";
import SidebarSvg3 from "/westrance side images/sidebarsvg3.svg";
import SidebarSvg4 from "/westrance side images/sidebarsvg4.svg";
import SidebarSvg5 from "/westrance side images/sidebarsvg5.svg";
import SidebarSvg9 from "/westrance side images/sidebarsvg6.svg";
import SidebarSvg8 from "/westrance side images/sidebarsvg7.svg";
import SidebarSvg7 from "/westrance side images/sidebarsvg8.svg";
import SidebarSvg6 from "/westrance side images/sidebarsvg9.svg";
import { useAdminStore } from "@/store/admininfo";
import { useAuthStore } from "@/store/userInfo.store";
import { axios } from "@/configs/axios.config";
import { toast } from "sonner";
// import Dots from "/westrance side images/dots.svg";

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: SidebarSvg1,
  },
  {
    url: "/dashboard/company-management",
    title: "Company Management",
    icon: SidebarSvg2,
  },
  {
    url: "/dashboard/hospital-pharmacy",
    title: "Hospital & Pharmacy",
    icon: SidebarSvg3,
  },

  {
    url: "/dashboard/employee-management",
    title: "Employee Management",
    icon: SidebarSvg4,
  },

  {
    url: "/dashboard/westrance-invoice",
    title: "Invoices",
    icon: SidebarSvg5,
  },
  // {
  //   title: "",
  //   url: "",
  //   icon: Dots,
  // },
  {
    url: "/dashboard/reports-analytics",
    title: "Reports & Analytics",
    icon: SidebarSvg6,
  },

  {
    url: "/dashboard/users-roles",
    title: "Users & Roles",
    icon: SidebarSvg7,
  },
  {
    url: "/dashboard/support-center",
    title: "Support Center",
    icon: SidebarSvg8,
  },
  {
    url: "/dashboard/settings",
    title: "Settings",
    icon: SidebarSvg9,
  },
];

export const DashboardLayout = () => {
  const { admin } = useAdminStore()
  const { user, company, employee } = useAuthStore()
  const email = admin?.email || user?.email || '';
  const Name = email ? email.split('@')[0] : 'User';

  const [filteredNavItems, setFilteredNavItems] = useState<NavItem[]>([]);

  useEffect(() => {
    const fetchRoleMenus = async () => {
      try {
        if (employee) {
          try {
            const res = await axios.get("/admin/department");

            if (!res.data.department || res.data.department.length === 0) {
              setFilteredNavItems([]);
              return;
            }

            const roleNames = res.data.department
              .filter((d: any) => d.employeeId === employee.employeeId)
              .map((d: any) => d.RoleName);

            console.log("Employee ID:", employee.employeeId);
            console.log("All department data:", res.data.department);
            console.log("Role names for this employee:", roleNames);
            console.log("Available nav items:", navItems.map(item => item.title));

            if (roleNames.length === 0) {
              console.log("No roles assigned to this employee, showing no nav items");
              setFilteredNavItems([]);
              return;
            }

            const filtered = navItems.filter(item =>
              roleNames.includes(item.title)
            );
            setFilteredNavItems(filtered);
            return;
          } catch (error) {
            console.error("Error fetching department data:", error);
            setFilteredNavItems([]);
            return;
          }
        }

        // Admin users get all navigation items (only if no employee data)
        if (admin) {
          setFilteredNavItems(navItems);
          return;
        }

        setFilteredNavItems([]);
      } catch (err: any) {
        console.error("Error in fetchRoleMenus:", err);
        toast.error(err?.response?.data?.message || "Something Went Wrong")
      }
    };

    fetchRoleMenus();
  }, [admin, company, employee]);

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
        <AppSidebar navItems={filteredNavItems} />
        <SidebarInset className="bg-transparent overflow-auto">
          <HorizontalNavbar Name={Name} link={"/dashboard/settings"} profilelink={''} />
          <Box className="pb-2">
            <Outlet />
          </Box>
        </SidebarInset>
      </SidebarProvider>
    </PageWrapper>
  );
};
