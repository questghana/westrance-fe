import { CompanyDetails } from "@/components/company management/companydetails";
import { CompanyManagementHeader } from "@/components/company management/companymanagementheader";
import { CompanyManagementTable } from "@/components/company management/companymanagementtable";
import { EmployeeInfor } from "@/components/company management/employeeinfor";

import { UseStepper, useStepper } from "@/hooks/usestepper";

export type CompanyStep =
  | "company management"
  | "view company details"
  | "employee information";

export const steps: CompanyStep[] = [
  "company management",
  "view company details",
  "employee information",
];

export const CompanyManagementPage = () => {
  const stepperProps = useStepper<CompanyStep>(steps);
  // console.log(
  //   "Current step:",
  //   stepperProps.step,
  //   "Index:",
  //   stepperProps.state.index
  // );
  return (
    <CompanyManagementHeader
      {...{
        ...stepperProps,
        state: stepperProps.state as UseStepper<CompanyStep>["state"],
        steps,
      }}
    >
      {stepperProps.step === "company management" && (
        <CompanyManagementTable
          {...{
            ...stepperProps,
            state: stepperProps.state as UseStepper<CompanyStep>["state"],
            steps,
          }}
        />
      )}

      {stepperProps.step === "view company details" && (
        <CompanyDetails
          {...{
            ...stepperProps,
            state: stepperProps.state as UseStepper<CompanyStep>["state"],
            steps,
          }}
        />
      )}

      {stepperProps.step === "employee information" && <EmployeeInfor />}
    </CompanyManagementHeader>
  );
};
