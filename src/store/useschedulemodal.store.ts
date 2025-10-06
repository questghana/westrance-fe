import { GeneralModalReturnTypeProps } from "@/components/common/generalmodal";
import { create } from "zustand";

export const useModalStore = create<GeneralModalReturnTypeProps>(
  (set) =>
    ({
      open: false,
      contentProps: {
        className: "",
        children: null,
      },
      onOpenChange: (open) => set(() => ({ open })),
      setContentProps: (props) =>
        set((state) => ({
          contentProps: {
            ...state.contentProps,
            ...props,
          },
        })),
    } satisfies GeneralModalReturnTypeProps)
);
