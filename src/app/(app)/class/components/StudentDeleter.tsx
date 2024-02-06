"use client"

import { TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { removeStudentFromClass } from "@/lib/actions/class.actions";
import { addStudentToClassFormSchema } from "@/lib/schemas/class";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState } from "react-dom";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const StudentDeleter = ({ studentId, classId }: { studentId: string; classId: string }) => {
  const form = useForm<z.infer<typeof addStudentToClassFormSchema>>({
    resolver: zodResolver(addStudentToClassFormSchema),
    defaultValues: {
      student: studentId,
      classId: classId,
    },
  });

  const [state, formAction] = useFormState(removeStudentFromClass, null);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"ghost"}>
          <TrashIcon width={"16px"} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {JSON.stringify(state)}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Form {...form}>
            <form action={formAction}>
              <FormField
                control={form.control}
                name="student"
                render={({ field }) => (
                  <FormItem>
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
                    <FormControl>
                      <Input type="hidden" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <AlertDialogAction asChild>
                <Button>Desvincular</Button>
              </AlertDialogAction>
            </form>
          </Form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default StudentDeleter;
