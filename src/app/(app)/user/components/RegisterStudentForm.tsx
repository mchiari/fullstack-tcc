"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { register } from "@/lib/actions/auth.actions";
import { createStudent, updateStudent } from "@/lib/actions/student.actions";
import { registerFormSchema } from "@/lib/schemas/auth";
import { registerStudentFormSchema } from "@/lib/schemas/student";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

const RegisterStudentForm = ({ tutorId }: { tutorId?: string }) => {
  const pathname = usePathname();
  const router = useRouter();

  const form = useForm<z.infer<typeof registerStudentFormSchema> & { dob: Date }>({
    resolver: zodResolver(registerStudentFormSchema),
    defaultValues: {
      profilePhoto: "",
      firstName: "",
      lastName: "",
      tutor: tutorId,
      birthday: "",
      dob: new Date(),
    },
  });

  //   console.log(form.getValues())

  const [state, formAction] = useFormState(createStudent, null);
  //   console.log(state)

//   useEffect(() => {
//     if (state?.data === true) {
//       router.push("/feed");
//     }
//   }, [state]);

  let dob = form.getValues("dob");
  useEffect(() => {
    if (dob) {
      form.setValue("birthday", dob.toISOString());
    }
    console.log(dob.toISOString());
  }, [dob]);

  return (
    tutorId && (
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
            {JSON.stringify(state)}
            <FormField
              control={form.control}
              name="healthInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>healthInfo</FormLabel>
                  <FormControl>
                    <Input type="textarea" placeholder="healthInfo" {...field} />
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
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {/* <FormDescription>Your date of birth is used to calculate your age.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birthday"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>tutor</FormLabel> */}
                  <FormControl>
                    <Input type="hidden" placeholder="Birthday" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tutor"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>tutor</FormLabel> */}
                  <FormControl>
                    <Input type="hidden" placeholder="Tutor" {...field} />
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
    )
  );
};

export default RegisterStudentForm;
