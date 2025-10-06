import { SupportCenterTable } from "@/components/westrance side support center/supportcentertable";
import { WestranceSupportCenterDetails } from "@/components/westrance side support center/westrancesupportcenterdetails";
import { WestranceSupportCenterHeader } from "@/components/westrance side support center/westrancesupportcenterheader";
import { UseStepper, useStepper } from "@/hooks/usestepper";

export type SupportCenterStep = "support center" | "view support details";

export const steps: SupportCenterStep[] = [
  "support center",
  "view support details",
];
const WestranceSupportCenterPage = () => {
  const stepperProps = useStepper<SupportCenterStep>(steps);

  return (
    <WestranceSupportCenterHeader
      {...{
        ...stepperProps,
        state: stepperProps.state as UseStepper<SupportCenterStep>["state"],
        steps,
      }}
    >
      {stepperProps.step === "support center" && (
        <SupportCenterTable
          {...{
            ...stepperProps,
            state: stepperProps.state as UseStepper<SupportCenterStep>["state"],
            steps,
          }}
        />
      )}

      {stepperProps.step === "view support details" && (
        <WestranceSupportCenterDetails />
      )}
    </WestranceSupportCenterHeader>
  );
};

export default WestranceSupportCenterPage;
