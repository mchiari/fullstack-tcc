"use server";

import { UserDocument, UserInterface, UserModel } from "../models/user.model";
import { connectToDB } from "../mongoose";
import mongoose from "mongoose";
import { userFormSchema } from "../schemas/user";

export const updateUser = async (state: any, formData: FormData) => {
  connectToDB();

  // console.log(formData);

  const form = userFormSchema.safeParse({
    _id: formData.get("_id"),
    email: formData.get("email"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    cpf: formData.get("cpf"),
    profilePhoto: formData.get("profilePhoto"),
    role: formData.get("role"),
    // password: formData.get("password"),
  });

  if (form.success) {
    let { email, firstName, lastName, cpf, profilePhoto,  role, _id } = form.data;

    await UserModel.findOneAndUpdate(
      { _id: _id },
      {
        $set: {
          email: email.toLowerCase(),
          firstName: firstName,
          lastName: lastName,
          cpf: cpf,
          profilePhoto: profilePhoto,
          role: role,
          // password: password,
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

export const getUserByEmailWithAuth = async (email: string): mongoose.Query<UserDocument, any> => {
  connectToDB();

  try {
    const user = await UserModel.findOne({ email: email }).select("+authentication.salt +authentication.password");

    return user;
  } catch (error: any) {
    throw new Error(`Failed to find user by email: ${error.message}`);
  }
};

export const getUserBySessionToken = async (sessionToken: string): mongoose.Query<UserDocument, any> => {
  connectToDB();

  try {
    const user = await UserModel.findOne({ "authentication.sessionToken": sessionToken });

    return user ? user.toJSON() : null;
  } catch (error: any) {
    throw new Error(`Failed to find user by email: ${error.message}`);
  }
};
