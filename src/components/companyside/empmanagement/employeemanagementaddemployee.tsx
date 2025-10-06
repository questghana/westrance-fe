import { ReusableAddEmployee } from "@/components/reusable/reusableaddemployee";
import { EmployeeManagementStep } from "@/pages/empmanagement";


interface Props {
  goToStep: (step: EmployeeManagementStep) => void;
}

export const EmployeeManagementAddEmployee = ({goToStep}: Props) => {
  return <ReusableAddEmployee onGoToList={()=> goToStep("employee management")}/>;
};
