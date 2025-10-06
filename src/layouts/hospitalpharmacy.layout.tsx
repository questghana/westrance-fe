import { HorizontalNavbar } from "@/components/admin/horizontalnavbar/horizontalnavbar";
import { AppSidebar, type NavItem } from "@/components/admin/appsidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { PageWrapper } from "@/components/common/pagewrapper";
import { useState, type CSSProperties, useEffect } from "react";
import { Box } from "@/components/ui/box";
import { Outlet } from "react-router";
import SidebarSvg2 from "/hospitalpharmacy/patient lookup.svg";
import SidebarSvg3 from "/hospitalpharmacy/staff management.svg";
import SidebarSvg4 from "/hospitalpharmacy/user & role.svg";
import SidebarSvg5 from "/hospitalpharmacy/invoices.svg";
import SidebarSvg6 from "/hospitalpharmacy/support.svg";
import SidebarSvg7 from "/hospitalpharmacy/setting.svg";
// import Dots from "/westrance side images/dots.svg";
import SidebarSvg1 from "/westrance side images/sidebarsvg1.svg";
import { useAuthStore } from "@/store/userInfo.store";
import { axios } from "@/configs/axios.config";
import { toast } from "sonner";

export const allNavItems: NavItem[] = [
    {
        title: "Dashboard",
        url: "/hospital-pharmacy-dashboard",
        icon: SidebarSvg1,
    },
    {
        url: "/hospital-pharmacy-dashboard/patient-lookup",
        title: "Patient Lookup",
        icon: SidebarSvg2,
    },
    {
        url: "/hospital-pharmacy-dashboard/staff-management",
        title: "Staff Management",
        icon: SidebarSvg3,
    },

    {
        url: "/hospital-pharmacy-dashboard/users-roles",
        title: "Users & Roles",
        icon: SidebarSvg4,
    },

    // {
    //     title: "",
    //     url: "",
    //     icon: Dots,
    // },

    {
        url: "/hospital-pharmacy-dashboard/hospital-invoices",
        title: "Invoices",
        icon: SidebarSvg5,
    },

    {
        url: "/hospital-pharmacy-dashboard/support",
        title: "Support",
        icon: SidebarSvg6,
    },
    {
        url: "/hospital-pharmacy-dashboard/setting",
        title: "Settings",
        icon: SidebarSvg7,
    },
];

export const Hospitalpharmacylayout = () => {
    const { company, employee } = useAuthStore()
    const [filteredNavItems, setFilteredNavItems] = useState<NavItem[]>([]);

    useEffect(() => {
        const fetchRoleMenus = async () => {
            try {
                if (company) {
                    setFilteredNavItems(allNavItems);
                    return;
                }

                if (employee) {
                    const res = await axios.get("/hospital/department");
                    const roleNames = res.data.department
                        .filter((d: any) => d.employeeId === employee.employeeId)
                        .map((d: any) => d.RoleName);

                    const filtered = allNavItems.filter(item =>
                        roleNames.includes(item.title)
                    );
                    setFilteredNavItems(filtered);
                }
            } catch (err: any) {
                toast.error(err?.response?.data?.message || "Something Went Wrong")
            }
        };

        fetchRoleMenus();
    }, []);

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
                    <HorizontalNavbar Name={company?.companyName || employee?.firstName + " " + employee?.lastName} link={"/hospital-pharmacy-dashboard/setting"} profilelink={''} />
                    <Box className="pb-2">
                        <Outlet />
                    </Box>
                </SidebarInset>
            </SidebarProvider>
        </PageWrapper>
    );
};
