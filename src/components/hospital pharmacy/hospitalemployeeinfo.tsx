import { ReusableEmployeeInfor } from "../reusable/reusableemployeeinfo";

const employeeDetails = [
  {
    name: "First Name:",
    detail: "Will",
  },
  {
    name: "Last Name:",
    detail: "Bettelheim",
  },
  {
    name: "Email:",
    detail: "will_bettelhiem@gmail.com",
  },
  {
    name: "Phone Number:",
    detail: "+233 897 98789 67",
  },
  {
    name: "Benefits:",
    detail: "Annual Spending Cap",
  },
  {
    name: "amount package:",
    detail: "₵25,000",
  },
  {
    name: "Number of Dependents:",
    detail: "3",
  },
];
const dependentDetials = [
  {
      name: "First Name:",
      detail: "Bettelheim",
  },
  {
      name: "Last Name:",
      detail: "Marshal",
  },
  {
      name: "Email:",
      detail: "bettelheim_marshal@gmail.com",
  },
  {
      name: "Relationship:",
      detail: "Spouse",
  },
  {
      name: "Phone Number:",
      detail: "+233 8111 91111 1",
  },
];

export const HospitalEmployeeInfor = () => {
  return (
    <ReusableEmployeeInfor
      dependentDetials={dependentDetials}
      employeeDetails={employeeDetails}
    />
  );
};
