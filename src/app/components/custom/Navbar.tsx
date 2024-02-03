import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getUserBySessionToken } from '@/lib/actions/user.actions'
import { verifyAuth } from '@/lib/utils'
import { cookies } from 'next/headers'
import Link from 'next/link'
import React from 'react'

const Navbar = async () => {
  const token = cookies().get("sessionToken")?.value
  const user = token && await getUserBySessionToken(token)
  // const verifiedToken = await verifyAuth(token)
  // console.log(verifiedToken.jti)

  // const user = verifiedToken && await getUserBySessionToken(verifiedToken.jti)

  return user && (
    <div className='flex justify-between items-center p-2 w-full h-12 mb-10 bg-zinc-600 text-zinc-100'>
        <div className='flex justify-between items-center h-full gap-4'>
            <Avatar >
              <AvatarImage src={user.profilePhoto} />
              <AvatarFallback className='text-zinc-800'>{user.firstName[0]+user.lastName[0]}</AvatarFallback>
              </Avatar>
              <span>{user?.firstName}</span>
        </div>

        <div className='flex justify-evenly items-center h-full gap-2'>
            <Link href={'/register'}>Registrar</Link>
            <Link href={'/user'}>Usuário</Link>
            <Link href={'/feed'}>Feed</Link>
            <Link href={'/class'}>Classe</Link>

        </div>

    </div>
  )
}

export default Navbar