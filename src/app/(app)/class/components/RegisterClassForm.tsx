"use client"

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createClass } from '@/lib/actions/class.actions';
import { classFormSchema } from '@/lib/schemas/class';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const RegisterClassForm = () => {

    const form = useForm<z.infer<typeof classFormSchema> & { dob: Date }>({
        resolver: zodResolver(classFormSchema),
        defaultValues: {
          name: "",
          description: "",
          students: [""],
        },
      });
    
      const [state, formAction] = useFormState(createClass, null);

  return (
    <div className="flex justify-center items-center w-full">
    <Form {...form}>
      <form action={formAction} className="flex flex-col justify-center items-center gap-2 w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>description</FormLabel>
              <FormControl>
                <Input type="textarea" placeholder="description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="students"
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
      

        <Button disabled={false} type="submit" className="mt-2 w-full">
          Registrar
        </Button>
      {JSON.stringify(state)}

      </form>
    </Form>
  </div>
  )
}

export default RegisterClassForm