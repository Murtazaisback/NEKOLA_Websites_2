import { SignIn } from '@clerk/nextjs'
import React from 'react'

const Page = () => {

  return (
    <>
    <div className='h-[100vh] flex items-center justify-center'>

    <SignIn/>
    </div>
    </>
  )
}

export default Page