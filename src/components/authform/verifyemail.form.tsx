import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormWrapper } from "./formwrapper";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { Anchor } from "../ui/anchor";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import type { FC } from "react";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid Email" })
    .min(1, { message: "Required field" })
    .max(50, { message: "Maximum 50 characters are allowed" }),
});

export const VerifyEmailForm: FC = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    navigate("/verify-code");
  };

  return (
    <FormWrapper
      description="Enter your email below and we'll send you a link to reset your password."
      logoSource="/logo/logo-rounded.svg"
      label="Forgot your password?"
    >
      <Form {...form}>
        <form
          className="flex flex-col gap-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mt-8">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input size="lg" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button size="xl">Submit</Button>
          <Anchor
            to="/"
            className="flex text-center justify-center items-center gap-1 mx-auto w-fit"
          >
            <ArrowLeft className="size-4" />
            Back to login
          </Anchor>
        </form>
      </Form>
    </FormWrapper>
  );
};
