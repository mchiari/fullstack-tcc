import AccountProfile from "@/app/(app)/user/components/AccountProfile";
import { getUserBySessionToken } from "@/lib/actions/user.actions";
import { cookies } from "next/headers";
import React, { Suspense } from "react";
import UserDashboard from "./components/UserDashboard";

const UserPage = async () => {
  const token = cookies().get("sessionToken");
  const user = token && await getUserBySessionToken(token.value)
  if (user) user._id = user._id!.toString()

  return user && (
    <div className="flex flex-col justify-center items-center w-full p-4 gap-4">
      <div className="flex flex-col justify-center items-start w-full gap-2">
        <h1>Gerenciar conta</h1>
        <h2>Alterar dados de usuário e dependentes</h2>
      </div>

      <section className="flex justify-center items-center">
        <Suspense fallback={"loading..."}>
          <UserDashboard user={user} />
        </Suspense>
      </section>
    </div>
  );
};

export default UserPage;
