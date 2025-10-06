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
import { Checkbox } from "../ui/checkbox";
import { Anchor } from "../ui/anchor";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Flex } from "../ui/flex";
import type { FC } from "react";
import { z } from "zod";

const formSchema = z.object({
  password: z
    .string()
    .min(8, "Invalid Password")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
  email: z
    .string()
    .email({ message: "Invalid Email" })
    .min(1, { message: "Required field" })
    .max(50, { message: "Maximum 50 characters are allowed" }),
  rememberMe: z.boolean(),
});

export const SignInForm: FC = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rememberMe: true,
      password: "",
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    navigate("/dashboard");
  };

  return (
    <FormWrapper
      description="Log in to access your account"
      logoSource="/logo/logo-rounded.svg"
      label="Welcome back to PLANFLO"
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
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
          <Flex className="justify-between mb-8">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Flex>
                      <Checkbox
                        id="remember-me"
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(!!checked)}
                      />
                      <FormLabel htmlFor="remember-me">Remember me</FormLabel>
                    </Flex>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Anchor to="/verify-email" className="text-sm">
              Forgot Password?
            </Anchor>
          </Flex>
          <Button size="xl">Sign In</Button>
        </form>
      </Form>
    </FormWrapper>
  );
};
