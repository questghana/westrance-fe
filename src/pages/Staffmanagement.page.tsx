import Staffmanagement from '@/components/hospitalpharmacyside/staffmanagement/staffmanagement';
import Staffmanagementheader from '@/components/hospitalpharmacyside/staffmanagement/staffmanagementheader'
import { useStepper, UseStepper } from '@/hooks/usestepper'
import React from 'react'
import EmployeeInformation from '@/components/employee management/employeeinformation';
// import { UsersAndRolesHeader } from '@/components/westrance side users & roles/usersandrolesheader';
import Hospitalemployee from '@/components/hospitalpharmacyside/staffmanagement/hospitalemployee';

export type StaffManagementStep =
  | "employee management"
  | "view employee details"
  | "add employee";

export const steps: StaffManagementStep[] = [
  "employee management",
  "view employee details",
  "add employee",
];



const StaffManagementPage: React.FC = () => {
  const stepperProps = useStepper<StaffManagementStep>(steps);

  return (
    <Staffmanagementheader
      {...{
        ...stepperProps,
        state:
          stepperProps.state as UseStepper<StaffManagementStep>["state"],
        steps,
      }}
    >
      {stepperProps.step === "employee management" && (
        <Staffmanagement
          {...{
            ...stepperProps,
            state:
              stepperProps.state as UseStepper<StaffManagementStep>["state"],
            steps,
          }}
        />
      )}

      {stepperProps.step === "view employee details" && <EmployeeInformation />}
      {stepperProps.step === "add employee" && (
        <Hospitalemployee
        />
      )}
    </Staffmanagementheader>
  )
}

export default StaffManagementPage