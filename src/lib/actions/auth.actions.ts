"use server";

import { cookies } from "next/headers";
import { authentication, random } from "../utils";
import { verifyUserEmail } from "./user.actions";
import { loginFormSchema } from "../schemas/loginForm";

export const login = async (state: any, formData: FormData) => {
  "use server";
  const result = loginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  await new Promise(resolve => setTimeout(resolve,2000))

  if (result.success) {
    let { email, password } = result.data;

    const user = await verifyUserEmail(String(email));
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
      value: user.authentication!.sessionToken,
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
