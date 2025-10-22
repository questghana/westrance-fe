import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AdminInfo = {
  id: string;
  email: string;
  role: string;
  profileImage?: string | null;
  unreadNotifications: number;
};

interface AdminState {
  admin: AdminInfo | null;
  setAdmin: (admin: AdminInfo) => void;
  clearAdmin: () => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      loading: false,
      setLoading: (value) => set({ loading: value }),
      admin: null,
      setAdmin: (admin) => set({ admin }),
      clearAdmin: () => set({ admin: null }),
    }),
    {
      name: "admin-storage",
    }
  )
);


type companyinfo = {
  id: string;
  address: string;
  administrativeEmail: string;
  administrativeName: string;
  city: string;
  companyName: string;
  companyType: string;
  industry: string;
  numberOfEmployees: number;
  profileImage: string;
  region: string;
  registrationNumber: string;
  phoneNumber: string;
  website: string;
  companyId: string;
  isActive: boolean;
}

type companyEmployeeinfo = {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  PhoneNumber: string;
  startingDate: Date;
  duration: string;
  dependents: string;
  benefits: string;
  amountPackage: string;
  profileImage: string;
  RoleName: string;
}

interface Admininfo {
  selectedCompany: companyinfo | null;
  employees: companyEmployeeinfo[];
  employee: companyEmployeeinfo | null;
  setSelectedCompany: (company: companyinfo) => void;
  setEmployees: (employees: companyEmployeeinfo[]) => void;
  setEmployee: (employee: companyEmployeeinfo) => void;
  UpdateCompanyStatus: (isActive: boolean) => void;
}

export const useCompanyStore = create<Admininfo>((set) => ({
  selectedCompany: null,
  employees: [],
  employee: null,
  setSelectedCompany: (company) => set({ selectedCompany: company }),
  setEmployees: (employees) => set({ employees }),
  setEmployee: (employee) => set({ employee }),
  UpdateCompanyStatus: (isActive) => set((state) =>
    state.selectedCompany ? { selectedCompany: { ...state.selectedCompany, isActive } }
      : {}
  )
}))


type ticketInfo = {
  companyName: string;
  companyType: string;
  status: string;
  subject: string;
  createdAt: string;
  profileImage: string;
  ticketId: string;
}

interface ticket {
  selectedTicket: ticketInfo | null;
  setSelectedTicket: (ticket: ticketInfo) => void;
  updateStatus: (status: string) => void;
  clearSelectedTicket: ()=> void
}

export const useTicketStore = create<ticket>((set) => ({
  selectedTicket: null,
  setSelectedTicket: (ticket) => set({ selectedTicket: ticket }),
  updateStatus: (status) => set((state) =>
    state.selectedTicket ? { selectedTicket: { ...state.selectedTicket, status } }
      : {}
  ),
  clearSelectedTicket: () => set({selectedTicket: null}),
}))
