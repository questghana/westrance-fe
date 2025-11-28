import { useViewEmployeeStore } from "@/store/employeeinfo";
import { ReusableEmployeeInfor } from "../reusable/reusableemployeeinfo";



export const EmployeeInformation = () => {
  const { selectedEmployee, dependents } = useViewEmployeeStore()
  if (!selectedEmployee) return <p className="flex justify-center items-center">No employee selected.</p>;
  const employeeDetails = [
    {
      name: "First Name:",
      detail: selectedEmployee.firstName,
    },
    {
      name: "Last Name:",
      detail: selectedEmployee.lastName,
    },
    {
      name: "Email:",
      detail: selectedEmployee.emailAddress,
    },
    {
      name: "Phone Number:",
      detail: selectedEmployee.registrationNumber,
    },
    {
      name: "Benefits:",
      detail: selectedEmployee.benefits.join(", "),
    },
    {
      name: "In-Patient Amount:",
      detail: selectedEmployee.inPatientAmount,
    },
    {
      name: "Out-Patient Amount:",
      detail: selectedEmployee.outPatientAmount,
    },
    {
      name: "Number of Dependents:",
      detail: selectedEmployee.dependents,
    },
  ];
  const dependentDetials = dependents?.map((dependent) => ({
    details: [
      {
        name: "First Name:",
        detail: dependent.firstName
        ,
      },
      {
        name: "Last Name:",
        detail: dependent.lastName,
      },
      {
        name: "Email:",
        detail: dependent.emailAddress,
      },
      {
        name: "Relationship:",
        detail: dependent.relation,
      },
      {
        name: "Phone Number:",
        detail: dependent.PhoneNumber,
      },
    ]
  }));

  return (
    <ReusableEmployeeInfor
      employeeDetails={employeeDetails}
      dependentDetials={dependentDetials}
    />
  );
};

export default EmployeeInformation;
