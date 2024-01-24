"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createUser, updateUser } from "@/lib/actions/user.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const RegisterForm = () => {
  const pathname = usePathname();
  const router = useRouter();

  const formSchema = z.object({
    profilePhoto: z.string().min(2).max(50),
    email: z.string().email().min(2).max(50),
    password: z.string().min(2).max(50),
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    cpf: z.string().min(2).max(50),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profilePhoto: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      cpf: "",
    },
  });

  console.log(JSON.stringify(form.getValues()));

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    alert(JSON.stringify(values));

    await createUser(
      {
        profilePhoto: values.profilePhoto,
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        cpf: values.cpf,
        role: "admin"
      },
      pathname
    );
  };

  return (
    <div className="flex justify-center items-center w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center items-center gap-2 w-full">
          <FormField
            control={form.control}
            name="profilePhoto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{/* <Image src={user.profilePhoto} alt="profile photo" /> */}</FormLabel>
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
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
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
              <FormItem>
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
              <FormItem>
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
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
