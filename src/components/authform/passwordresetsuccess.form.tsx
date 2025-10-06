import { FormWrapper } from "./formwrapper";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import type { FC } from "react";

export const PasswordResetSuccessForm: FC = () => {
  const navigate = useNavigate();

  return (
    <FormWrapper
      description="Your password has been reset successfully! You can now log in with your new credentials."
      label="Your password has been successfully reset"
      logoSource="/authform/check.svg"
      className="w-[27rem]"
    >
      <Button className="mt-8" size="xl" onClick={() => navigate("/")}>
        Back to Login
      </Button>
    </FormWrapper>
  );
};
