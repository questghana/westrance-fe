import { create } from "zustand";

interface InvoiceState {
    RemainingBalance: number | null;
    setRemainingBalance: (balance: number) => void;
  }
  
  export const useInvoiceStore = create<InvoiceState>((set) => ({
    RemainingBalance: null,
    setRemainingBalance: (balance) => set({ RemainingBalance: balance }),
  }));
  