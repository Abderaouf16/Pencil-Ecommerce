'use server'
import React from 'react'
import { auth } from '@/server/auth'
import UserButton from './user-button'
import { Button } from '../ui/button'
import Link from 'next/link'
import { LogInIcon } from 'lucide-react'


export default async function nav() {

  const session = await auth()
  return (
    <header className='py-12'>
      <nav >
        <ul className='flex justify-between items-center'>
         <Link href='/'>Home</Link>
          {!session? (
            <li>
              <Button> 
                <LogInIcon/>
                <Link href='/auth/login'>Signin</Link> 
                 </Button>
            </li>
          ) : 
          <li>
            <UserButton user={session?.user } expires={session?.expires || ''} />
          </li>
          }
          
        </ul>
      </nav>
    </header>
   
  )
}

