import { useAuthStore } from "@/store/userInfo.store";
import { Navigate, Outlet } from "react-router";

export const Protectedroutes = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { role, company, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(role || "")) {
    if (role === "CompanyAdmin") {

      if (company?.companyType === "Hospital" || company?.companyType === "Pharmacy") {
        return <Navigate to="/hospital-pharmacy-dashboard" replace />;
      }
      
      return <Navigate to="/company-dashboard" replace />;
    }

    if (role === "Hospital Employee") {
      return <Navigate to="/hospital-pharmacy-dashboard" replace />;
    }

    if (role === "Employee" || role === "Westrance Employee") {
      return <Navigate to="/employee-dashboard" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
