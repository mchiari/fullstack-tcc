"use server";

import { revalidatePath } from "next/cache";
import { UserDocument, UserInterface, UserModel } from "../models/user.model";
import { connectToDB } from "../mongoose";
import mongoose from "mongoose";

export const updateUser = async (
  { _id, email, firstName, lastName, cpf, role = "tutor", profilePhoto }: UserInterface,
  path: string
): Promise<void> => {
  connectToDB();

  try {

    await UserModel.findOneAndUpdate(
      { _id: _id ? _id : undefined },
      {
        email: email.toLowerCase(),
        firstName: firstName,
        lastName: lastName,
        cpf: cpf,
        profilePhoto: profilePhoto,
        role: role,
      },
      {
        upsert: true,
        new: _id ? false : true
      }
    );

    if (path === "/feed") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to update user: ${error.message}`);
  }
};

export const getUserByEmailWithAuth= async (email: string): mongoose.Query<UserDocument, any> => {
  connectToDB();

  try {
    const user = UserModel.findOne({ email: email }).select("+authentication.salt +authentication.password");

    return user;
  } catch (error: any) {
    throw new Error(`Failed to find user by email: ${error.message}`);
  }
};

// export const getUserBySessionToken = async (sessionToken: string): mongoose.Query<UserDocument, any> => {
//   connectToDB();

//   try {
//     const user = UserModel.findOne({ "authentication.sessionToken": sessionToken });

//     return user;
//   } catch (error: any) {
//     throw new Error(`Failed to find user by email: ${error.message}`);
//   }
// };
