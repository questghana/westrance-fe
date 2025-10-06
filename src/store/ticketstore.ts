import { create } from "zustand";

export interface Ticket {
    id: string;
    administrativeName: string;
    administrativeEmail: string;
    subject: string;
    issue: string;
    createdAt: string;
    updatedAt: string;
  }
  
interface TicketStore {
    tickets: Ticket[];
    addTicket: (ticket: Ticket) => void;
    setTickets: (tickets: Ticket[]) => void;
    clearTickets: () => void;
}

export const useTicketStore = create<TicketStore>((set) => ({
    tickets: [],

    addTicket: (ticket) => set((state) => {
      return { tickets: [ticket, ...state.tickets] }
    }),
    setTickets: (tickets) => set({ tickets }),
    clearTickets: () => set({ tickets: [] }),
}));
