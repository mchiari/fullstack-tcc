"use server";

import { ClassDocument, ClassModel } from "../models/class.model";
import { connectToDB } from "../mongoose";
import { addStudentToClassFormSchema, classFormSchema } from "../schemas/class";

export const createClass = async (state: any, formData: FormData) => {
  connectToDB();

  const form = classFormSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    students: [],
  });

  if (form.success) {
    let { name, description, students } = form.data;

    const newClass = await new ClassModel({
      name: name,
      description: description,
      students: students,
    }).save();

    return { data: true };
  }

  if (form.error) {
    return { error: form.error.format() };
  }
};

export const getClasses = async () => {
  connectToDB();

  try {
    const classes = (await ClassModel.find({}).populate({path: "students", populate: {path: "tutor"}}).lean()) as ClassDocument[];

    return classes;
  } catch (error: any) {
    throw new Error(`Failed to find classes: ${error.message}`);
  }
};

export const addStudentToClass = async (state: any, formData: FormData) => {
  connectToDB();

  const form = addStudentToClassFormSchema.safeParse({
    classId: formData.get("classId"),
    student: formData.get("student"),
  });

  if (form.success) {
    let { classId, student } = form.data;

    const classFound = await ClassModel.findById(classId);

    if (!classFound) {
      return { error: "Class not found" };
    }

    const studentIndex = await classFound.students.indexOf(student);

    if (studentIndex === -1) {
      classFound.students.push(student);
      const updatedClass = await classFound.save();

      return { data: updatedClass.students };
    } else return { error: "Student already signed up in the class" };
  }

  if (form.error) {
    return { error: form.error.format() };
  }
};

export const removeStudentFromClass = async (state: any, formData: FormData) => {
  connectToDB();

  const form = addStudentToClassFormSchema.safeParse({
    classId: formData.get("classId"),
    student: formData.get("student"),
  });

  if (form.success) {
    let { classId, student } = form.data;

    const classFound = await ClassModel.findById(classId);

    if (!classFound) {
      return { error: "Class not found" };
    }

    const studentIndex = classFound.students.indexOf(student);

    if (studentIndex === -1) {
      return { error: "Student not found in the class" };
    }

    classFound.students.splice(studentIndex, 1);

    const updatedClass = await classFound.save();

    return { data: true };
  }

  if (form.error) {
    return { error: form.error.format() };
  }
};


// export const getAllClasses = async () => {
//   connectToDB()

//   try {
//     const allClasses = await ClassModel.find({}).populate("students").lean() as ClassDocument[]
    
//     return allClasses
//   } catch (error: any) {
//     throw new Error(`Failed to get classes: ${error.message}`);
//   }
// }