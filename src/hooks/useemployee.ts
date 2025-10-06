import { axios } from "@/configs/axios.config";
import { useAuthStore } from "@/store/userInfo.store";
import { toast } from "sonner";


const fetchMyEmployees = async (page: number = 1, limit: number = 10) => {
    const { setEmployees, setEmployeeCount, setLoading } = useAuthStore.getState()
    try {
        setLoading(true)
        const response = await axios.get(`/company/employees?page=${page}&limit=${limit}`,);
        setEmployees(response.data.employees);
        setEmployeeCount(response.data.pagination.total);
        return response.data.pagination;
    } catch (error: any) {
        toast.error(error?.response?.data?.error || "Something went wrong")
    } finally {
        setLoading(false)
    }
};


export default fetchMyEmployees