"use server";

import { StudentDocument, StudentModel } from "../models/student.model";
import { connectToDB } from "../mongoose";
import {  studentFormSchema } from "../schemas/student";


export const createStudent = async (state: any, formData: FormData) => {
    connectToDB();

    // console.log(formData);
  
    const form = studentFormSchema.safeParse({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      healthInfo: formData.get("healthInfo"),
      birthday: formData.get("birthday"),
      profilePhoto: formData.get("profilePhoto"),
      tutor: formData.get("tutor"),
    });
  
    if (form.success) {
      let { firstName, lastName, healthInfo, profilePhoto,  birthday, tutor } = form.data;
  
      const user = await new StudentModel({
        tutor: tutor,
        firstName: firstName,
        lastName: lastName,
        healthInfo: healthInfo,
        profilePhoto: profilePhoto,
        birthday: birthday,
      })
        .save()
        .then((user: any) => user.toObject());
  
      return { data: true };
    }
  
    if (form.error) {
      return { error: form.error.format() };
    }
}

export const updateStudent = async (state: any, formData: FormData) => {
  connectToDB();

  // console.log(formData);

  const form = studentFormSchema.safeParse({
    _id: formData.get("_id"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    healthInfo: formData.get("healthInfo"),
    birthday: formData.get("birthday"),
    profilePhoto: formData.get("profilePhoto"),
    tutor: formData.get("tutor"),
    // password: formData.get("password"),
  });

  if (form.success) {
    let { _id, firstName, lastName, healthInfo, profilePhoto,  birthday, tutor } = form.data;

    await StudentModel.findOneAndUpdate(
      { _id: _id },
      {
        $set: {
          tutor: tutor,
          firstName: firstName,
          lastName: lastName,
          healthInfo: healthInfo,
          profilePhoto: profilePhoto,
          birthday: birthday,
        },
      },
      {
        upsert: true,
        new: _id ? false : true,
      }
    );

    return { data: true };
  }

  if (form.error) {
    return { error: form.error.format() };
  }
};

export const getStudentsByTutorId = async (tutorId: string): Promise<StudentDocument[] | null> => {
  connectToDB();

  try {
    const students = await StudentModel.find({ tutor: tutorId }).lean() as StudentDocument[]

    return students
  } catch (error: any) {
    throw new Error(`Failed to find students by tutor ID: ${error.message}`);
  }
};


export const getAllStudents = async () => {
  connectToDB()

  try {
    const students = await StudentModel.find({}).lean() as StudentDocument[]
    
    return students
  } catch (error: any) {
    throw new Error(`Failed to get students without class: ${error.message}`);
  }
}