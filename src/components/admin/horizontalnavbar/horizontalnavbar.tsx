import { NotificationsDropdown } from "./notificationsdropdown";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserProfile } from "../../common/userprofile";
import { Box } from "@/components/ui/box";
import { Stack } from "@/components/ui/stack";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IoSettingsOutline } from "react-icons/io5";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { useAuthStore } from "@/store/userInfo.store";
import { useAdminStore } from "@/store/admininfo";
import { axios } from "@/configs/axios.config";

type HorizontalNavbarProps = {
  Name?: string,
  link: string,
  profilelink: string
}

export const HorizontalNavbar: React.FC<HorizontalNavbarProps> = ({ Name, link, profilelink }) => {
  const { company, employee, role } = useAuthStore()
  const { admin } = useAdminStore()
  const location = useLocation();
  const [hasAssignedRoles, setHasAssignedRoles] = useState(false);
  const [hasHospitalAssignedRoles, setHasHospitalAssignedRoles] = useState(false);

  useEffect(() => {
    const checkAssignedRoles = async () => {
      if (employee && role === "Westrance Employee") {
        try {
          const res = await axios.get("/admin/department");
          if (res.data.department && res.data.department.length > 0) {
            const userRoles = res.data.department.filter(
              (d: any) => d.employeeId === employee.employeeId
            );
            setHasAssignedRoles(userRoles.length > 0);
          } else {
            setHasAssignedRoles(false);
          }
        } catch (error) {
          setHasAssignedRoles(false);
        }
      } else {
        setHasAssignedRoles(false);
      }
    };

    checkAssignedRoles();
  }, [employee, role]);

  useEffect(() => {
    const checkHospitalAssignedRoles = async () => {
      if (employee && role === "Hospital Employee") {
        try {
          const res = await axios.get("/hospital/department");
          if (res.data.department && res.data.department.length > 0) {
            const userRoles = res.data.department.filter(
              (d: any) => d.employeeId === employee.employeeId
            );
            setHasHospitalAssignedRoles(userRoles.length > 0);
          } else {
            setHasHospitalAssignedRoles(false);
          }
        } catch (error) {
          setHasHospitalAssignedRoles(false);
        }
      } else {
        setHasHospitalAssignedRoles(false);
      }
    };

    checkHospitalAssignedRoles();
  }, [employee, role]);
  return (
    <Box className="p-4 items-center grid max-md:grid-cols-[auto_auto_1fr_auto_auto_auto] grid-cols-[1fr_auto_auto_auto_auto] max-md:gap-1 gap-2 bg-white rounded-2xl">
      <SidebarTrigger className="min-md:hidden" />
      <Stack>
        <h1 className="text-lg font-[500]">Welcome back, {Name} 👋</h1>
        <h1 className="text-sm text-[#7C7C7C]">
          Welcome back, you've <span className="text-blue-600"> {admin?.unreadNotifications || 0} {admin?.unreadNotifications && admin?.unreadNotifications > 0 ? "unread" : "read"} </span>{" "}
          notifications
        </h1>
      </Stack>
      {/* <ProjectSelector selectTriggerClassname="min-w-[18rem] justify-self-center max-md:min-w-full" /> */}
      {/* <SearchBox /> */}
      <Link to={link}>
        <Button
          size="icon"
          className={cn(
            "p-5 bg-[#F6F6F6] text-black hover:bg-[#F6F6F6] rounded-full cursor-pointer"
          )}
        >
          <IoSettingsOutline />
        </Button>
      </Link>

      {/* <FaqDropdown className="max-md:hidden" /> */}
      {(admin?.role === "admin" || role === "CompanyAdmin" || role === "Hospital Employee") && (
        <NotificationsDropdown />
      )}
      <Link to={profilelink}>
        <UserProfile
          label=""
          avatarClassName="size-12"
          src={company?.profileImage || employee?.profileImage || admin?.profileImage || "/Dashboardimg/adminlogo.png"}
          description=""
        />
      </Link>
      {role === "Hospital Employee" && hasHospitalAssignedRoles ? (
        <>
          {location.pathname === "/hospital-pharmacy-dashboard" && (
            <Link to="/employee-dashboard">
              <Button className="h-12 px-12 bg-[#0A51BA] hover:bg-[#0A51BA] cursor-pointer">
                Go To Employee Dashboard
              </Button>
            </Link>
          )}

          {location.pathname === "/employee-dashboard" && (
            <Link to="/hospital-pharmacy-dashboard">
              <Button className="h-12 px-12 bg-[#0A51BA] hover:bg-[#0A51BA] cursor-pointer">
                Go To Hospital Dashboard
              </Button>
            </Link>
          )}
        </>
      ) : role === "Westrance Employee" && hasAssignedRoles ? (
        <>
          {location.pathname === "/dashboard" && (
            <Link to="/employee-dashboard">
              <Button className="h-12 px-12 bg-[#0A51BA] hover:bg-[#0A51BA] cursor-pointer">
                Go To Employee Dashboard
              </Button>
            </Link>
          )}
          {location.pathname === "/employee-dashboard" && (
            <Link to="/dashboard">
              <Button className="h-12 px-12 bg-[#0A51BA] hover:bg-[#0A51BA] cursor-pointer">
                Go To Westrance Dashboard
              </Button>
            </Link>
          )}
        </>
      ) : null}
    </Box>
  );
};
