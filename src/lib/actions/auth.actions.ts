"use server";

import { cookies } from "next/headers";
import { authentication, random } from "../utils";
import { loginFormSchema, registerFormSchema } from "../schemas/auth";
import { connectToDB } from "../mongoose";
import { UserModel } from "../models/user.model";
import { getUserByEmailWithAuth } from "./user.actions";

export const login = async (state: any, formData: FormData) => {
  connectToDB();

  const result = loginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  //   await new Promise((resolve) => setTimeout(resolve, 2000));

  if (result.success) {
    let { email, password } = result.data;

    const user = await getUserByEmailWithAuth(String(email));
    if (!user) {
      return { error: "Wrong email" };
    }

    const expectedHash = authentication(user.authentication!.salt, String(password));

    if (user.authentication!.password != expectedHash) {
      return { error: "Wrong password" };
    }

    const salt = random();
    user.authentication!.sessionToken = authentication(salt, user._id!.toString());
    // @ts-ignore
    await user.save();

    cookies().set({
      name: "sessionToken",
      // value: `${user.authentication!.sessionToken}:${btoa(email)}`,
      value: `${user.authentication!.sessionToken}`,
      domain: "localhost",
      path: "/",
      httpOnly: true,
      maxAge: 86400,
    });

    return { data: true };
  }

  if (result.error) {
    return { error: result.error.format() };
  }
};

export const register = async (state: any, formData: FormData) => {
  connectToDB();

  const result = registerFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    lastName: formData.get("lastName"),
    firstName: formData.get("firstName"),
    cpf: formData.get("cpf"),
    profilePhoto: formData.get("profilePhoto"),
    role: formData.get("role") ?? "tutor",
  });

  if (result.success) {
    let { email, password, lastName, firstName, cpf, profilePhoto, role } = result.data;

    const salt = random();
    const user = await new UserModel({
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
    })
      .save()
      .then((user: any) => user.toObject());

    return { data: user._id };
  }

  if (result.error) {
    return { error: result.error.format() };
  }
};