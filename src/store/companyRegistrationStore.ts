import { create } from "zustand";

type CompanyDetail = {
  companyName: string;
  companyType: string;
  industry?: string;
  registrationNumber: string;
  numberOfEmployees: number;
  phoneNumber: string;
};

type LocationDetail = {
  region: string;
  city: string;
  address: string;
  website?: string;
};

type AdminCredential = {
  administrativeName: string;
  administrativeEmail: string;
  createPassword: string;
  confirmPassword: string;
  profileImage?: string | null;
};

type ContactInfo = {
  termAccepted: boolean;
};

interface CompanyRegisterData {
  loading: boolean;
  setLoading: (value: boolean) => void;
  companyDetail: Partial<CompanyDetail>;
  locationDetail: Partial<LocationDetail>;
  adminCredential: Partial<AdminCredential>;
  contactInfo: Partial<ContactInfo>;
  setCompanyDetail: (data: Partial<CompanyDetail>) => void;
  setLocationDetail: (data: Partial<LocationDetail>) => void;
  setAdminCredential: (data: Partial<AdminCredential>) => void;
  setContactInfo: (data: Partial<ContactInfo>) => void;
  reset: () => void;
  hospitalcount: number;
  setHospitalCount: (count: number) => void;
  pharmacycount: number;
  setPharmacyCount: (count: number) => void;
}

export const useRegisterStore = create<CompanyRegisterData>((set) => ({
  loading: false,
  companyDetail: {},
  locationDetail: {},
  adminCredential: {},
  contactInfo: {},
  setCompanyDetail: (data) => set({ companyDetail: data }),
  setLocationDetail: (data) => set({ locationDetail: data }),
  setAdminCredential: (data) => set({ adminCredential: data }),
  setContactInfo: (data) => set({ contactInfo: data }),
  setLoading: (value) => set ({loading: value}),
  reset: () =>
    set({
      companyDetail: {},
      locationDetail: {},
      adminCredential: {},
      contactInfo: {},
    }),
  hospitalcount: 0,
  setHospitalCount: (count) => set({ hospitalcount: count }),
  pharmacycount: 0,
  setPharmacyCount: (count) => set({ pharmacycount: count }),
}));
