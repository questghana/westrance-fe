import type { FC, PropsWithChildren } from "react";
import { Stack } from "../ui/stack";
import { cn } from "@/lib/utils";

interface FormWrapperProps extends PropsWithChildren {
  description: string;
  logoSource: string;
  className?: string;
  label: string;
}

export const FormWrapper: FC<FormWrapperProps> = ({
  description,
  logoSource,
  className,
  children,
  label,
}) => {
  // bg-slate-50 shadow-md rounded-3xl border-4 border-white
  return (
    <Stack
      className={cn(
        "px-5 py-10 max-md:px-3 min-w-[30rem] max-md:min-h-screen",
        className
      )}
    >
      <Stack className="items-center">
        <img className="size-16 mb-4" src={logoSource} alt="Company Logo" />
        <h1 className="text-2xl font-semibold text-center">{label}</h1>
        <h2 className="text-gray-500 text-[1rem] leading-tight text-center max-w-[25rem]">
          {description}
        </h2>
      </Stack>
      {children}
    </Stack>
  );
};
