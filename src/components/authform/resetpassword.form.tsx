import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleX, CircleCheck, ArrowLeft } from "lucide-react";
import { FormWrapper } from "./formwrapper";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Anchor } from "../ui/anchor";
import { Button } from "../ui/button";
import { Stack } from "../ui/stack";
import { Input } from "../ui/input";
import { Flex } from "../ui/flex";
import type { FC } from "react";
import { z } from "zod";

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),

    confirmPassword: z
      .string()
      .min(8, { message: "Password should be 8 characters long." }),
  })
  .refine((c) => c.password === c.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

export const ResetPasswordForm: FC = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confirmPassword: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    navigate("/reset-success");
  };

  const password = form.watch().password;
  const passwordConditions = [
    { label: "Minimum 8 characters", valid: password.length >= 8 },
    { label: "At least one upper case letter", valid: /[A-Z]/.test(password) },
    {
      label: "Use at least one special character (*#@!&+)",
      valid: /[^A-Za-z0-9]/.test(password),
    },
  ];

  return (
    <FormWrapper
      description="Enter your new password below to complete the reset process, ensure it's strong and secure."
      logoSource="/logo/logo-rounded.svg"
      label="Create New Password"
    >
      <Form {...form}>
        <form
          className="flex flex-col gap-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mt-8">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    size="lg"
                    type="password"
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Re-type New Password</FormLabel>
                <FormControl>
                  <Input
                    size="lg"
                    type="password"
                    placeholder="Re-type Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Stack className="mb-8">
            <h2>Password Must:</h2>
            {passwordConditions.map(({ valid, label }, key) => (
              <Flex key={key}>
                {valid ? (
                  <CircleCheck size={16} className="text-green-600" />
                ) : (
                  <CircleX size={16} className="text-red-600" />
                )}
                <span className="text-sm text-slate-700">{label}</span>
              </Flex>
            ))}
          </Stack>

          <Button size="xl" className="cursor-pointer">
            Change Password
          </Button>
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
