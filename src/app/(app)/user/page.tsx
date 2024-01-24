import AccountProfile from "@/app/components/custom/AccountProfile";
import { UserInterface } from "@/lib/models/user.model";
import React, { Suspense } from "react";


const UserPage = () => {
  const user: UserInterface = {
    profilePhoto: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcriticalhits.com.br%2Fanime%2Fentenda-por-que-guy-nao-estava-em-konoha-durante-o-ataque-de-pain-em-naruto%2F&psig=AOvVaw0LX_oTvpRY_yqMRPXECiCi&ust=1706149140878000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIDY2oH79IMDFQAAAAAdAAAAABAD",
    firstName: "John",
    lastName: "Doe",
    cpf: "12345678911",
    role: "admin",
    email: "admin@test.com",
    _id: "1",
  }

  return (
    <div className="flex flex-col justify-center items-center w-full p-4 gap-4">
      <div className="flex flex-col justify-center items-start w-full gap-2">
        <h1>Gerenciar conta</h1>
        <h2>Alterar dados de usuário e dependentes</h2>
      </div>

      <section className="flex justify-center items-center">
        <Suspense fallback={"loading..."}>
          <AccountProfile user={user} userId={user._id} />
        </Suspense>
      </section>
    </div>
  );
};

export default UserPage;
