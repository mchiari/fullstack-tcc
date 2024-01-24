"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/actions/auth.actions";
import { createUser, updateUser } from "@/lib/actions/user.actions";
import { loginFormSchema } from "@/lib/schemas/loginForm";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

const LoginForm = () => {
  const pathname = usePathname();
  const router = useRouter();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  console.log(JSON.stringify(form.getValues()));

  const [state, formAction] = useFormState(login, null);

  useEffect(() => {
    if (state?.data === true) {
      router.push("/feed");
    }
  }, [state]);

  return (
    <div className="flex justify-center items-center w-full">
      <Form {...form}>
        <form action={formAction} className="flex flex-col justify-center items-center gap-2 w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
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
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={!form.formState.isValid} type="submit" className="mt-2 w-full">
            Login
          </Button>

          <span>{JSON.stringify(state)}</span>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
