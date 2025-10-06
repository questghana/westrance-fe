import { HospitalDetails } from "@/components/hospital pharmacy/hospitaldetails";
import { HospitalEmployeeInfor } from "@/components/hospital pharmacy/hospitalemployeeinfo";
import { HospitalHeader } from "@/components/hospital pharmacy/hospitalheader";
import { HospitalTable } from "@/components/hospital pharmacy/hospitaltable";
import { UseStepper, useStepper } from "@/hooks/usestepper";

export type HospitalPharmacyStep =
  | "hospital pharmacy"
  | "view hospital pharmacy details"
  | "hospital epmloyee info";

export const steps: HospitalPharmacyStep[] = [
  "hospital pharmacy",
  "view hospital pharmacy details",
  "hospital epmloyee info",
];

const WestranceHospitalPage = () => {
  const stepperProps = useStepper<HospitalPharmacyStep>(steps);

  return (
    <HospitalHeader
      {...{
        ...stepperProps,
        state: stepperProps.state as UseStepper<HospitalPharmacyStep>["state"],
        steps,
      }}
    >
      {stepperProps.step === "hospital pharmacy" && (
        <HospitalTable
          {...{
            ...stepperProps,
            state:
              stepperProps.state as UseStepper<HospitalPharmacyStep>["state"],
            steps,
          }}
        />
      )}

      {stepperProps.step === "view hospital pharmacy details" && (
        <HospitalDetails
          {...{
            ...stepperProps,
            state:
              stepperProps.state as UseStepper<HospitalPharmacyStep>["state"],
            steps,
          }}
        />
      )}
      {stepperProps.step === "hospital epmloyee info" && (
        <HospitalEmployeeInfor />
      )}
    </HospitalHeader>
  );
};

export default WestranceHospitalPage;
