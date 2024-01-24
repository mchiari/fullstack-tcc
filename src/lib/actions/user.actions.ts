"use server";

import { revalidatePath } from "next/cache";
import { UserDocument, UserInterface, UserModel } from "../models/user.model";
import { connectToDB } from "../mongoose";
import mongoose from "mongoose";
import { ZodNull } from "zod";
import { authentication, random } from "../utils";

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

export const createUser = async (
  { email, firstName, lastName, password, cpf, role = "tutor", profilePhoto }: UserInterface & {password: string},
  path: string
): Promise<void> => {
  connectToDB();

  try {

    const salt = random();
    const user =  new UserModel({
        email: email.toLowerCase(),
        firstName: firstName,
        lastName: lastName,
        cpf: cpf,
        profilePhoto: profilePhoto,
        role: role,
        authentication: {
          salt,
          password: authentication(salt, password),
        },
      }).save().then((user: any) => user.toObject())


    if (path === "/feed") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create user: ${error.message}`);
  }
};

export const verifyUserEmail = async (email: string): mongoose.Query<UserDocument, any> => {
  connectToDB();

  try {
    const user = UserModel.findOne({ email: email }).select("+authentication.salt +authentication.password");

    return user;
  } catch (error: any) {
    throw new Error(`Failed to find user by email: ${error.message}`);
  }
};
