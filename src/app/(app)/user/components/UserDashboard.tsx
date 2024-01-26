("");
import React from "react";
import AccountProfile from "./AccountProfile";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { UserDocument } from "@/lib/models/user.model";
import StudentProfile from "./StudentProfile";
import RegisterStudentForm from "./RegisterStudentForm";

const UserDashboard = (user: { user: UserDocument }) => {
    
  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex justify-end items-center w-full"></div>
      <Accordion type="multiple" className="min-w-[300px]">
        <AccordionItem value="user">
          <AccordionTrigger> User profile</AccordionTrigger>
          <AccordionContent>
            <AccountProfile user={user.user} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="student">
          <AccordionTrigger> Student profile </AccordionTrigger>
          <AccordionContent>{/* <StudentProfile  /> */}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="student">
          <AccordionTrigger>Register student </AccordionTrigger>
          <AccordionContent>
            <RegisterStudentForm tutorId={user.user._id} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default UserDashboard;
