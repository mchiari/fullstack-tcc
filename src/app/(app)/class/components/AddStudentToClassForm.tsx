"use client";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { addStudentToClass } from "@/lib/actions/class.actions";
import { ClassInterface } from "@/lib/models/class.model";
import { StudentInterface } from "@/lib/models/student.model";
import { addStudentToClassFormSchema } from "@/lib/schemas/class";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type AddStudentToClassFormProps = {
  data: ClassInterface;
  students: StudentInterface[];
};

export const AddStudentToClassForm: React.FC<AddStudentToClassFormProps> = async ({ data, students }) => {
  let { _id, name, description } = data;

  const form = useForm<z.infer<typeof addStudentToClassFormSchema>>({
    resolver: zodResolver(addStudentToClassFormSchema),
    defaultValues: {
      student: "",
      classId: data._id,
    },
  });

  const [state, formAction] = useFormState(addStudentToClass, null);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Adicionar estudante</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>Adicionar estudante na classe: {name}</DrawerHeader>

        <div className="flex flex-col justify-center items-center w-full">
          <Form {...form}>
            <form action={formAction}>
              <FormField
                control={form.control}
                name={"student"}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">Estudantes</FormLabel>
                        <FormDescription>Selecione o estudante que você quer incluir na classe {name}</FormDescription>
                      </div>

                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                          {students &&
                            students.map((student, index) => {
                              return (
                                <FormItem key={student._id} className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value={student._id!} />
                                  </FormControl>
                                  <FormLabel>{student.firstName + " " + student.lastName}</FormLabel>
                                </FormItem>
                              );
                            })}
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="student"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>tutor</FormLabel> */}
                    <FormControl>
                      <Input type="hidden" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="classId"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>tutor</FormLabel> */}
                    <FormControl>
                      <Input type="hidden" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DrawerFooter>
                <Button type="submit">Submit</Button>
                <DrawerClose>Cancelar</DrawerClose>
                {JSON.stringify(state)}
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AddStudentToClassForm;
