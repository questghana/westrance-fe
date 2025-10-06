import { EmployeeManagementAddEmployee } from '@/components/companyside/empmanagement/employeemanagementaddemployee';
import { EmployeeManagementHeader } from '@/components/companyside/empmanagement/employeemanagementheader';
import { EmployeeManagementTable } from '@/components/companyside/empmanagement/employeemanagementtable';
import EmployeeInformation from '@/components/employee management/employeeinformation';
import { UseStepper, useStepper } from '@/hooks/usestepper';
import React from 'react'


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

const Empmanagementpage: React.FC = () => {
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
                <EmployeeManagementAddEmployee
                goToStep={stepperProps.goToStep}
                />
            )}
            {stepperProps.step ==="edit employee" && (
                <EmployeeManagementAddEmployee
                goToStep={stepperProps.goToStep}
                />
            )}

        </EmployeeManagementHeader>
    )
}

export default Empmanagementpage