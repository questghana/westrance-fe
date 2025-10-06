import { forwardRef, type ComponentPropsWithoutRef } from "react";

export const Curve = forwardRef<
  HTMLImageElement,
  ComponentPropsWithoutRef<"img">
>(({ ...props }, ref) => {
  return (
    <img ref={ref} src="/general/dashboard-curve.svg" alt="curve" {...props} />
  );
});
