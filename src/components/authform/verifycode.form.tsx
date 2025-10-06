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
import { Anchor } from "../ui/anchor";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Flex } from "../ui/flex";
import type { FC } from "react";
import { z } from "zod";

const formSchema = z.object({
  code: z.string().min(1, { message: "Required field" }),
});

export const VerifyCodeForm: FC = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    navigate("/reset-password");
  };

  return (
    <FormWrapper
      description="We sent a password reset link to your email, please check your inbox."
      logoSource="/authform/envelope.svg"
      label="Check Your Email"
    >
      <Form {...form}>
        <form
          className="flex flex-col gap-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="mt-8">
                <FormLabel>Verification Code</FormLabel>
                <FormControl>
                  <Input size="lg" placeholder="Code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button size="xl">Submit</Button>
          <Flex className="justify-between flex-wrap max-sm:justify-center max-sm:flex-col">
            <h2>
              Didn't receive the email?
              <span className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer ml-1">
                Resend
              </span>
            </h2>
            <Anchor to="/">Back to login</Anchor>
          </Flex>
        </form>
      </Form>
    </FormWrapper>
  );
};
