import React from 'react'
import { assets } from '../assets/assets'
import { Star } from 'lucide-react'
import { SignIn } from '@clerk/clerk-react'

function Login() {
  return (
    <div className='relative min-h-screen w-full flex'>
      {/* BACKGROUND IMAGE */}
      <img src={assets.bgImage} alt="" className='absolute top-0 left-0 w-full h-full object-cover -z-10' />

      {/* TOP LEFT - LOGO */}
      <div className='absolute top-6 left-6 md:left-10 lg:left-40 z-10'>
        <img src={assets.logo} alt="Logo" className='h-12 object-contain' />
      </div>

      {/* LEFT SECTION - CONTENT */}
      <div className='w-1/2 flex flex-col justify-center pl-6 md:pl-10 lg:pl-40 z-10 space-y-4'>
        {/* USERS + STARS */}
        <div className='flex items-center gap-3'>
          <img src={assets.group_users} alt="Users" className='h-8 md:h-10' />
          <div>
            <div className='flex items-center gap-1'>
              {Array(5).fill(0).map((_, index) => (
                <Star key={index} className='size-4 md:size-5 text-transparent fill-amber-500' />
              ))}
            </div>
            <p>Used by Trusted users</p>
          </div>
        </div>

        {/* MAIN HEADING */}
        <h1 className='text-3xl md:text-6xl font-bold bg-gradient-to-r from-indigo-950 to-indigo-800 bg-clip-text text-transparent leading-tight'>
          MORE THAN JUST FRIENDS<br />TRULY CONNECT
        </h1>

        {/* SUBTEXT */}
        <p className="text-xl md:text-3xl text-indigo-900 max-w-71 md:max-w-md">
          Connect with Global Community on BLAZE-X
        </p>
      </div>

      {/* RIGHT SECTION - SIGN IN */}
      <div className='w-1/2 flex items-center justify-center p-6 sm:p-10 z-10'>
        <SignIn />
      </div>
    </div>
  )
}

export default Login
