"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateUser } from "@/lib/actions/user.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { usePathname, useRouter } from "next/navigation";
import { userFormSchema } from "@/lib/schemas/user";
import { UserDocument } from "@/lib/models/user.model";
import { useFormState } from "react-dom";

const AccountProfile = (user: { user: UserDocument }) => {
  const userData = user.user;
  const pathname = usePathname();
  const router = useRouter();

  // console.log(userData);

  const form = useForm<Omit<z.infer<typeof userFormSchema> & { _id: string }, "password">>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      _id: userData._id,
      profilePhoto: userData.profilePhoto,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      cpf: userData.cpf,
      // password: "",
      role: userData.role
    },
  });

  const [state, formAction] = useFormState(updateUser, null);

  return (
    <div className="flex justify-center items-center w-full">
      <Form {...form}>
        <form action={formAction} className="flex flex-col justify-center items-center gap-2 w-full">
          <FormField
            control={form.control}
            name="profilePhoto"
            render={({ field }) => (
              <FormItem>
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

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="hidden" placeholder="role" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="_id"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="hidden" placeholder="_id" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={false} type="submit" className="mt-2 w-full">
            Atualizar
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AccountProfile;
