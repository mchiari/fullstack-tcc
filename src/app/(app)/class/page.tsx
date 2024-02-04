import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import { getUserBySessionToken } from "@/lib/actions/user.actions";
import { cookies } from "next/headers";
import React, { Suspense } from "react";
import RegisterClassForm from "./components/RegisterClassForm";
import { ClassTable } from "./components/ClassTable";
import { getClasses } from "@/lib/actions/class.actions";
import { ClassInterface } from "@/lib/models/class.model";
import { getAllStudents } from "@/lib/actions/student.actions";
import AddStudentToClassForm from "./components/AddStudentToClassForm";

const ClassPage = async () => {
  const token = cookies().get("sessionToken")?.value;
  const user = await getUserBySessionToken(token!);
  const classes = await getClasses();
  const allStudents = await getAllStudents();

  return (
    <div className="flex flex-col justify-center items-center w-full p-4 gap-4">
      <div className="flex flex-col justify-center items-start w-full gap-2">
        <h1>Gerenciar classes</h1>
        <h2>Incluir........</h2>
      </div>

      <section className="flex flex-col justify-center items-center w-full">
        <Suspense fallback={"loading..."}>
          <Accordion type="multiple" className="min-w-[300px] w-full">
            Classes
            <AccordionItem value="register">
              <AccordionTrigger>Register class </AccordionTrigger>
              <AccordionContent>
                <RegisterClassForm />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Suspense>
      </section>

      <section className="flex flex-col justify-center items-center w-full">
        <Suspense fallback={"loading..."}>
          <Accordion type="multiple" className="min-w-[300px] w-full">
            {classes &&
              classes.map((c: ClassInterface, index: number) => {
                return (
                  <AccordionItem key={c.name} value={c.name+String(index)}>
                    <AccordionTrigger>{c.name}</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex justify-between items-center w-full">
                        <span>
                          {c.description}
                        </span>

                        <AddStudentToClassForm data={c} students={allStudents} />
                      </div>
                      <ClassTable data={c} />
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
          </Accordion>
        </Suspense>
      </section>
    </div>
  );
};

export default ClassPage;
