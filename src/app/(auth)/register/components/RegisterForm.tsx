"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { register } from "@/lib/actions/auth.actions";
import { registerFormSchema } from "@/lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

const RegisterForm = () => {
  const pathname = usePathname();
  const router = useRouter();

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      profilePhoto: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      cpf: "",
    },
  });

  // console.log(JSON.stringify(form.getValues()));

  const [state, formAction] = useFormState(register, null);

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
            name="profilePhoto"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>profilePhoto</FormLabel>
                <FormControl>
                  <Input placeholder="profilePhoto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
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
              <FormItem className="w-full">
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>firstName</FormLabel>
                <FormControl>
                  <Input placeholder="firstName" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>lastName</FormLabel>
                <FormControl>
                  <Input placeholder="lastName" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>cpf</FormLabel>
                <FormControl>
                  <Input placeholder="cpf" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={!form.formState.isValid} type="submit" className="mt-2 w-full">
            Registrar
          </Button>
          <span>{JSON.stringify(state)}</span>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
