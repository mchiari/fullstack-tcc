import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-2 w-full h-10 mb-10'>
        <div className='flex flex-col justify-between items-center h-full'>
            <span>Username</span>
            <span>Role</span>
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