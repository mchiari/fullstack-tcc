import LoginForm from '@/app/components/custom/LoginForm';
import React, { Suspense } from 'react'

const Login = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full p-4 gap-4">
      <div className="flex flex-col justify-center items-start w-full gap-2">
        <h1>Fazer login</h1>
      </div>

      <section className="flex justify-center items-center">
        <Suspense fallback={"loading..."}>
          <LoginForm />
        </Suspense>
      </section>
    </div>
  );
}

export default Login