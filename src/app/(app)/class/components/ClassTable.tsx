import React from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ClassInterface } from "@/lib/models/class.model";
import StudentDeleter from "./StudentDeleter";

export type ClassTableProps = {
  data: ClassInterface;
};
export const ClassTable: React.FC<ClassTableProps> = ({ data }) => {
  const getAgeFromBirthday = (dob: string) => {
    const birthDate = new Date(dob);
    const currentDate = new Date();

    let age = currentDate.getFullYear() - birthDate.getFullYear();

    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <div className="flex flex-col justify-center items-center w-full gap-2">
      <Table className="rounded">
        <TableHeader>
          <TableRow>
            <TableHead>Foto</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Data de nascimento</TableHead>
            <TableHead>Idade</TableHead>
            <TableHead>Tutor</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.students.map((student, index) => {
            let age = getAgeFromBirthday(student.birthday);
            return (
              <TableRow key={student.firstName+index}>
                <TableCell>{student.profilePhoto}</TableCell>
                <TableCell>{student.firstName + " " + student.lastName}</TableCell>
                <TableCell>{new Date(student.birthday).toISOString().split("T")[0]}</TableCell>
                <TableCell>{age}</TableCell>
                <TableCell>{student.tutor}</TableCell>
                <TableCell>
                  <StudentDeleter studentId={student._id!} classId={data._id!} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClassTable;
