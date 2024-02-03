import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getStudentsByTutorId } from "@/lib/actions/student.actions";
import React from "react";
import StudentProfile from "./StudentProfile";
import { StudentDocument, StudentInterface } from "@/lib/models/student.model";

export const Students = async ({ userId }: { userId: string }) => {
  const students = (await getStudentsByTutorId(userId)) as unknown as StudentDocument[];
  // console.log(students);

  return students.map((student, index) => {
    student._id = student._id!.toString();
    return (
      <AccordionItem key={"student-" + index} value={"student-" + index}>
        <AccordionTrigger> {`${student.firstName} + ${student.lastName}`} </AccordionTrigger>
        <AccordionContent>
          <StudentProfile student={student} />
        </AccordionContent>
      </AccordionItem>
    );
  });
};
