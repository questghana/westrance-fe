import { useAuthStore } from "@/store/userInfo.store";
import { Navigate, Outlet } from "react-router";

export const Publicroutes = () => {
  const { role, company } = useAuthStore();

  if (role) {
    if (role === "CompanyAdmin") {
      if (company?.companyType === "Hospital" || company?.companyType === "Pharmacy") {
        return <Navigate to="/hospital-pharmacy-dashboard" replace />;
      } else {
        return <Navigate to="/company-dashboard" replace />;
      }
    }

    if (role === "Hospital Employee") {
      return <Navigate to="/hospital-pharmacy-dashboard" replace />;
    }

    if (role === "Employee") {
      return <Navigate to="/employee-dashboard" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
