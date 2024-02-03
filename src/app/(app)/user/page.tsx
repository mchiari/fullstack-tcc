import { getUserBySessionToken } from "@/lib/actions/user.actions";
import { cookies } from "next/headers";
import React, { Suspense, useEffect, useState } from "react";
import { getStudentsByTutorId } from "@/lib/actions/student.actions";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AccountProfile from "./components/AccountProfile";
import RegisterStudentForm from "./components/RegisterStudentForm";
import StudentProfile from "./components/StudentProfile";
import { Students } from "./components/Students";
import { UserDocument, UserInterface } from "@/lib/models/user.model";

const UserPage = async () => {
  const token = cookies().get("sessionToken");
  const user = token && (await getUserBySessionToken(token.value)) as UserDocument
  const id: string = user?._id!


  return (
    user && (
      <div className="flex flex-col justify-center items-center w-full p-4 gap-4">
        <div className="flex flex-col justify-center items-start w-full gap-2">
          <h1>Gerenciar conta</h1>
          <h2>Alterar dados de usuário e dependentes</h2>
        </div>

        <section className="flex justify-center items-center w-full">
          <Suspense fallback={"loading..."}>
            <Accordion type="multiple" className="min-w-[300px] w-full">
              <AccordionItem value="user">
                <AccordionTrigger> User profile</AccordionTrigger>
                <AccordionContent>
                  <AccountProfile user={user} />
                </AccordionContent>
              </AccordionItem>
              <Students userId={id} />
              <AccordionItem value="register">
                <AccordionTrigger>Register student </AccordionTrigger>
                <AccordionContent>
                  <RegisterStudentForm tutorId={id} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Suspense>
        </section>
      </div>
    )
  );
};

export default UserPage;
