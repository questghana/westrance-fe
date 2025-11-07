import { axios } from "@/configs/axios.config";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role: "CompanyAdmin" | "Employee" | "Hospital Employee" | "Westrance Employee";
}

export interface Employeedetails {
  employeeId: string;
  firstName: string;
  lastName: string;
  amountPackage: string;
  benefits: string;
  dependents?: string | null;
  duration: string;
  emailAddress: string;
  profileImage?: string | null;
  startingDate: string;
  registrationNumber: string;
  isActive: boolean;
  remainingBalance?: string;
}

export interface Companydetails {
  administrativeEmail: string;
  administrativeName: string;
  createpassword: string;
  confirmPassword: string;
  address: string;
  city: string;
  companyName: string;
  companyType: string;
  industry?: string | null;
  website?: string | null;
  numberOfEmployees: number;
  phoneNumber: string;
  profileImage?: string | null;
  region: string;
  registrationNumber: string;
  termsAccepted: boolean;
  isActive: boolean;
}

interface AuthStore {
  loading: boolean;
  isAuthenticated: boolean;
  token: string | null;
  user: AuthUser | null;
  role: "CompanyAdmin" | "Employee" | "Hospital Employee" | "Westrance Employee" | null;
  employee: Employeedetails | null;
  employees: Employeedetails[];
  company: Companydetails | null;
  newEmployeeId: string | null;
  employeecount: number;
  dependentcount: number;

  // actions
  setAuth: (payload: {
    token: string | null;
    user: AuthUser;
    employee?: Employeedetails;
    company?: Companydetails;
  }) => void;
  setnewEmployeeId: (id: string) => void;
  setEmployeedetail: (data: Partial<Employeedetails>) => void;
  addEmployee: (employee: Employeedetails) => void;
  setEmployees: (employees: Employeedetails[]) => void;
  updateEmployee: (employeeId: string, data: Partial<Employeedetails>) => void;
  updateCompany: (data: Partial<Companydetails>) => void;
  setEmployeeCount: (count: number) => void;
  setDependentCount: (count: number) => void;
  setLoading: (value: boolean) => void;
  logout: () => void;
  clearAuth: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      loading: false,
      isAuthenticated: false,
      token: null, // Initialize token as null
      user: null,
      role: null,
      employee: null,
      employees: [],
      company: null,
      newEmployeeId: null,
      employeecount: 0,
      dependentcount: 0,

      setnewEmployeeId: (id) => set({ newEmployeeId: id }),
      setDependentCount: (count) => set({ dependentcount: count }),
      setEmployeeCount: (count) => set({ employeecount: count }),
      setLoading: (value) => set({ loading: value }),

      setAuth: ({ token, user, employee, company }) => {
        set({
          token,
          user,
          role: user.role,
          employee: employee ? { ...employee, profileImage: employee.profileImage || user.image } : null,
          company: company ?? null,
          isAuthenticated: true,
        });
      },

      setEmployeedetail: (data) =>
        set((state) => ({
          employee: {
            ...state.employee,
            ...data,
          } as Employeedetails,
        })),

      addEmployee: (employee) =>
        set((state) => ({
          employees: [...state.employees, employee],
        })),

      setEmployees: (employees) => set({ employees }),

      updateEmployee: (employeeId, data) =>
        set((state) => ({
          employees: state.employees.map((employee) =>
            employee.employeeId === employeeId
              ? { ...employee, ...data }
              : employee
          ),
        })),

      updateCompany: (data) =>
        set((state) => ({
          company: {
            ...state.company,
            ...data,
          } as Companydetails,
        })),

      logout: () => {
        set({
          isAuthenticated: false,
          token: null,
          user: null,
          role: null,
          employee: null,
          employees: [],
          company: null,
          newEmployeeId: null,
        });
        document.cookie = 'token=; Max-Age=0; path=/; SameSite=Lax';
      },

      clearAuth: () => {
        set({
          isAuthenticated: false,
          token: null,
          user: null,
          role: null,
          employee: null,
          employees: [],
          company: null,
          newEmployeeId: null,
        });
        document.cookie = 'token=; Max-Age=0; path=/; SameSite=Lax';
      },

      checkAuth: async () => {
        try {
          const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
          const res = await axios.get("/me");
          const { user, company, employee } = res.data.data; // Adjust based on backend response structure
          set({
            isAuthenticated: true,
            user: user || null,
            role: user?.role || null,
            company: company || null,
            employee: employee || null,
            token: token || null,
          });
        } catch (err) {
          console.error("checkAuth failed:", err);
          console.log("checkAuth failed - setting isAuthenticated to false, role to null.", err);
          set({
            isAuthenticated: false,
            token: null,
            user: null,
            role: null,
            company: null,
            employee: null,
            employees: [],
            newEmployeeId: null,
            employeecount: 0,
            dependentcount: 0,
          });
          document.cookie = 'token=; Max-Age=0; path=/; SameSite=Lax';
        }
      },
    }),
    {
      name: "auth-store",
    }
  )
);
