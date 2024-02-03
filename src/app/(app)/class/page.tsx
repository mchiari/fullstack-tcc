import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { getUserBySessionToken } from '@/lib/actions/user.actions'
import { cookies } from 'next/headers'
import React, { Suspense } from 'react'
import RegisterClassForm from './components/RegisterClassForm'

const ClassPage = () => {
  const token = cookies().get("sessionToken")?.value
  const user = getUserBySessionToken(token!)



    return (
        <div className="flex flex-col justify-center items-center w-full p-4 gap-4">
          <div className="flex flex-col justify-center items-start w-full gap-2">
            <h1>Gerenciar conta</h1>
            <h2>Alterar dados de usuário e dependentes</h2>
          </div>
  
          <section className="flex justify-center items-center w-full">
            <Suspense fallback={"loading..."}>
              <Accordion type="multiple" className="min-w-[300px] w-full">
                {/* <Students userId={user._id!} /> */}
                Classes
                <AccordionItem value="register">
                  <AccordionTrigger>Register class </AccordionTrigger>
                  <AccordionContent>
                    <RegisterClassForm />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Suspense>
          </section>
        </div>
      )
}

export default ClassPage