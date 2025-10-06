import Addnewinvoice from '@/components/hospitalpharmacyside/invoices/addnewinvoice';
import Hospitalinvoices from '@/components/hospitalpharmacyside/invoices/invoices'
import Invoicesheader from '@/components/hospitalpharmacyside/invoices/invoicesheader';
import { UseStepper, useStepper } from '@/hooks/usestepper';
import React from 'react'


export type InvoiceStep =
| "Invoice" | "add invoice";

export const steps: InvoiceStep[] = [
  "Invoice",
  "add invoice",
];

const HospitalPharmacyInvPage:React.FC = () => {
const stepperProps = useStepper<InvoiceStep>(steps);

return (
      <Invoicesheader
        {...{
          ...stepperProps,
          state:
            stepperProps.state as UseStepper<InvoiceStep>["state"],
          steps,
        }}
      >
        {stepperProps.step === "Invoice" && (
          <Hospitalinvoices
            {...{
              ...stepperProps,
              state:
                stepperProps.state as UseStepper<InvoiceStep>["state"],
              steps,
            }}
          />
        )}
  
        {stepperProps.step === "add invoice" && <Addnewinvoice />}
      </Invoicesheader>
    )
  
}

export default HospitalPharmacyInvPage





// const StaffManagementPage: React.FC = () => {
//   const stepperProps = useStepper<StaffManagementStep>(steps);

//   return (
//     <Staffmanagementheader
//       {...{
//         ...stepperProps,
//         state:
//           stepperProps.state as UseStepper<StaffManagementStep>["state"],
//         steps,
//       }}
//     >
//       {stepperProps.step === "employee management" && (
//         <Staffmanagement
//           {...{
//             ...stepperProps,
//             state:
//               stepperProps.state as UseStepper<StaffManagementStep>["state"],
//             steps,
//           }}
//         />
//       )}

//       {stepperProps.step === "view employee details" && <EmployeeInformation />}
//       {stepperProps.step === "add employee" && (
//         <UsersAndRolesHeader
//         margin={"4"} padding={""}
//         />
//       )}
//     </Staffmanagementheader>
//   )
// }

// export default StaffManagementPage