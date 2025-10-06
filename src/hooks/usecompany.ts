import { useRegisterStore } from "@/store/companyRegistrationStore"
import { axios } from "@/configs/axios.config";
import { toast } from "sonner"

const fetchCompany = async (page: number = 1, limit: number = 10) => {
    const { setCompanyDetail, setHospitalCount, setPharmacyCount, setLoading } = useRegisterStore.getState()
    try {
        setLoading(true)
        const response = await axios.get(`/company/companydetail?page=${page}&limit=${limit}`)
        // console.log(response);
        setCompanyDetail(response.data.companyDetail)
        setPharmacyCount(response.data.Pharmacycount)
        setHospitalCount(response.data.Hospitalcount)
        return response.data.pagination;
    } catch (error: any) {
        toast.error(error?.response?.data?.message || "Something went wrong")
    } finally {
        setLoading(false)
    }
}


export default fetchCompany