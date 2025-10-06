import EmployeeInformation from "@/components/employee management/employeeinformation";
import Hospitalemployee from "@/components/employee management/employeemanagementaddemployee";
import { EmployeeManagementHeader } from "@/components/employee management/employeemanagementheader";
import { EmployeeManagementTable } from "@/components/employee management/employeemanagementtable";
import { UseStepper, useStepper } from "@/hooks/usestepper";

export type EmployeeManagementStep =
  | "employee management"
  | "view employee details"
  | "add employee"
  | "edit employee";

export const steps: EmployeeManagementStep[] = [
  "employee management",
  "view employee details",
  "add employee",
  "edit employee"
];

const WestranceEmployeeManagementPage = () => {
  const stepperProps = useStepper<EmployeeManagementStep>(steps);

  return (
    <EmployeeManagementHeader
      {...{
        ...stepperProps,
        state:
          stepperProps.state as UseStepper<EmployeeManagementStep>["state"],
        steps,
      }}
    >
      {stepperProps.step === "employee management" && (
        <EmployeeManagementTable
          {...{
            ...stepperProps,
            state:
              stepperProps.state as UseStepper<EmployeeManagementStep>["state"],
            steps,
          }}
        />
      )}

      {stepperProps.step === "view employee details" && <EmployeeInformation />}
      {stepperProps.step === "add employee" && (
        <Hospitalemployee goToStep={stepperProps.goToStep}/>
      )}
      {stepperProps.step === "edit employee" && (
        <Hospitalemployee goToStep={stepperProps.goToStep}/>
      )}

    </EmployeeManagementHeader>
  );
};

export default WestranceEmployeeManagementPage;
