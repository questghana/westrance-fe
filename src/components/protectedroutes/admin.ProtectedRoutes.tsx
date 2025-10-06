import { useAdminStore } from "@/store/admininfo"
import { useAuthStore } from "@/store/userInfo.store"
import { Navigate, Outlet } from "react-router"




const adminProtectedRoutes = ()=>{
  const {admin} = useAdminStore()
  const {role} = useAuthStore()

  // Only allow admin users or Westrance employees
  if(!admin?.role && role !== "Westrance Employee") {
    return <Navigate to="/admin-login" />
  }
  return <Outlet/>
}


export default adminProtectedRoutes