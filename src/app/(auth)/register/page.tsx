import AccountProfile from "@/app/components/custom/AccountProfile";
import RegisterForm from "@/app/components/custom/RegisterForm";
import React, { Suspense } from "react";

const RegisterPage = () => {

  return (
    <div className="flex flex-col justify-center items-center w-full p-4 gap-4">
      <div className="flex flex-col justify-center items-start w-full gap-2">
        <h1>Criar conta</h1>
        <h2>Preencha seus dados para começar a usar a aplicação</h2>
      </div>

      <section className="flex justify-center items-center">
        <Suspense fallback={"loading..."}>
          <RegisterForm />
        </Suspense>
      </section>
    </div>
  );
};

export default RegisterPage;
