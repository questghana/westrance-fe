import { create } from "zustand";


export type Employee = {
    employeeId: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    emailAddress: string;
    registrationNumber: string;
    benefits: string;
    amountPackage: string;
    dependents: string;
    startingDate: string;
    duration: string;
    profileImage: string | null;
}

export type Employeedependents = {
    firstName: string;
    middleName: string;
    lastName: string;
    emailAddress: string;
    relation: string;
    PhoneNumber: string;
    employeeId: string,
    profileImage: string | null
}

type viewEmployeeState = {
selectedEmployee: Employee | null;
dependents: Employeedependents[];
setSelectedEmployee: (emp: Employee | null) => void;
setDependents: (dep: Employeedependents[]) => void;
mode: "add" | "edit";
setMode: (mode: "add" | "edit") => void,
}

export const useViewEmployeeStore = create<viewEmployeeState>((set)=>({
    selectedEmployee: null,
    dependents: [],
    setSelectedEmployee: (emp) => set({selectedEmployee: emp}),
    setDependents: (dep) => set({dependents: dep}),
    mode: "add",
    setMode: (mode) => set({mode}),
}))