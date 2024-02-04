"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { createStudent } from "@/lib/actions/student.actions";
import { studentFormSchema } from "@/lib/schemas/student";
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

  const form = useForm<z.infer<typeof studentFormSchema> & { dob: Date }>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      profilePhoto: "",
      firstName: "",
      lastName: "",
      healthInfo: "",
      tutor: tutorId,
      birthday: "",
      dob: new Date(),
    },
  });

  const [state, formAction] = useFormState(createStudent, null);

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
    // console.log(dob.toISOString());
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
              name="healthInfo"
              render={({ field }) => (
                <FormItem className="w-full">
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
              name="dob"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
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
              Registrar
            </Button>
          {JSON.stringify(state)}

          </form>
        </Form>
      </div>
    )
  );
};

export default RegisterStudentForm;
