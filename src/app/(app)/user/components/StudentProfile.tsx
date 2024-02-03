"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateStudent } from "@/lib/actions/student.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { usePathname, useRouter } from "next/navigation";
import { studentFormSchema } from "@/lib/schemas/student";
import { StudentDocument } from "@/lib/models/student.model";
import { useFormState } from "react-dom";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

const StudentProfile = (student: { student: StudentDocument }) => {
  const studentData = student.student;
  const pathname = usePathname();
  const router = useRouter();

  // console.log(studentData);

  const form = useForm<z.infer<typeof studentFormSchema> & { dob: Date }>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      _id: studentData._id!.toString(),
      profilePhoto: studentData.profilePhoto,
      firstName: studentData.firstName,
      lastName: studentData.lastName,
      healthInfo: studentData.healthInfo,
      tutor: studentData.tutor,
      birthday: studentData.birthday,
      dob: new Date(studentData.birthday),
    },
  });

  const [state, formAction] = useFormState(updateStudent, null);

  return (
    studentData && (
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
                <FormItem className="flex flex-col w-full">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild className="w-full">
                      <FormControl>
                        <Button
                          variant={"outline"}
                          type="button"
                          // onClick={(e)=> {e.preventDefault(e)}}
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
                <FormItem className="w-full">
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
                <FormItem className="w-full">
                  <FormLabel>tutor</FormLabel>
                  <FormControl>
                    <Input type="hidden" placeholder="Tutor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="_id"
              render={({ field }) => (
                <FormItem className="w-full">
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
            {JSON.stringify(state)}
          </form>
        </Form>
      </div>
    )
  );
};

export default StudentProfile;
