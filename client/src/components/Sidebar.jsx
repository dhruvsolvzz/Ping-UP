import React from 'react';
import { assets, dummyUserData } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import MenuItems from './MenuItems';
import { CirclePlus, LogOut } from 'lucide-react';
import { UserButton, useClerk } from '@clerk/clerk-react';

const Sidebar = ({ sidebaropen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const user = dummyUserData;
  const { signOut } = useClerk();

  return (
    <div className={`
      w-60 xl:w-72 bg-gray-200 flex flex-col justify-between items-center 
      max-sm:absolute top-0 bottom-0 z-20
      transition-all duration-300 ease-in-out
      ${sidebaropen ? 'translate-x-0' : 'max-sm:-translate-x-full'}
    `}>
      {/* Logo & Menu */}
      <div className='w-full'>
        <img
          onClick={() => navigate('/')}
          src={assets.logo}
          className='w-26 ml-7 my-2 cursor-pointer'
          alt="App Logo"
        />
        <hr className='border-gray-300 mb-8' />

        {/* Menu Items */}
        <MenuItems setSidebarOpen={setSidebarOpen} />

        {/* Create Post Button */}
        <Link
          to="/createpost"
          className='flex items-center justify-left gap-2 py-2.5 mt-6 mx-6 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-800 active:scale-95 transition text-white cursor-pointer'
        >
          <CirclePlus className='w-10 h-8' />
          Create Post
        </Link>
      </div>

      {/* User Footer */}
      <div className='w-full border-gray-200 p-4 px-7 flex items-center justify-between'>
        <div className='flex gap-2 items-center cursor-pointer'>
          <UserButton />
          <div>
            <h1 className='text-sm font-medium'>{user.full_name}</h1>
            <p className='text-xs text-gray-500'>@{user.username}</p>
          </div>
        </div>
        <LogOut
          onClick={() => signOut()}
          className='w-4.5 h-8 text-gray-600 cursor-pointer hover:text-gray-800 transition'
        />
      </div>
    </div>
  );
};

export default Sidebar;
