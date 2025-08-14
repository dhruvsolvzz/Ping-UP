import React, { useState } from 'react';
import {
  Users,
  UserCheck,
  UserRoundPlus,
  MessageSquare,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import {
  dummyConnectionsData as connections,
  dummyFollowersData as followers,
  dummyFollowingData as following,
  dummyPendingConnectionsData as pendingConnection,
} from '../assets/assets';

const Connection = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('Followers');

  const dataArray = [
    { label: 'Followers', value: followers, icon: Users },
    { label: 'Following', value: following, icon: UserCheck },
    { label: 'Pending', value: pendingConnection, icon: UserRoundPlus },
    { label: 'Connections', value: connections, icon: MessageSquare },
  ];

  return (
    <div className='min-h-screen bg-slate-50'>
      <div className='max-w-6xl mx-auto p-6'>
        {/* TITLE */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-slate-900 mb-2'>Connections</h1>
          <p className='text-slate-600'>
            Manage your network and discover new connections
          </p>
        </div>

        {/* STAT CARDS */}
        <div className='mb-8 flex flex-wrap gap-6'>
          {dataArray.map((item, index) => (
            <div
              key={index}
              className='flex flex-col items-center justify-center gap-2 border h-28 w-40 border-gray-200 bg-white shadow rounded-md p-3 hover:shadow-md transition-all duration-200 cursor-default'
            >
              <b className='text-xl'>{item.value.length}</b>
              <span className='text-slate-500 text-sm'>{item.label}</span>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div className='inline-flex flex-wrap items-center border border-gray-200 rounded-md p-1 bg-white shadow-sm'>
          {dataArray.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                onClick={() => setCurrentTab(tab.label)}
                key={tab.label}
                className={`flex items-center px-3 py-1 text-sm rounded-md cursor-pointer transition-colors ${
                  currentTab === tab.label
                    ? 'bg-white font-medium text-black'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                <Icon className='w-4 h-4' />
                <span className='ml-1'>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* CONNECTIONS */}
        <div className='flex flex-wrap gap-6 mt-6'>
          {dataArray.find((item) => item.label === currentTab)?.value.map((user) => (
            <div key={user._id} className='w-full max-w-100 flex gap-5 p-6 bg-white shadow rounded-md'>
              <img
                src={user.profile_picture}
                className='rounded-full w-12 h-12 shadow-md mx-auto'
                alt=''
              />
              <div className='flex-1'>
                <p className='font-medium text-slate-900'>@{user.username}</p>
                <p className='text-sm text-slate-500'>{user.email}</p>
                <p className='text-sm text-slate-500'>
                  {user.bio.slice(0, 30)}...
                </p>
                <div className='flex max-sm:flex-col gap-2 mt-4'>
                  <button
                    onClick={() => navigate(`/profile/${user._id}`)}
                    className='w-full p-2 text-sm rounded bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition text-white cursor-pointer'
                  >
                    View Profile
                  </button>

                  {currentTab === 'Following' && (
                    <button className='w-full p-2 text-sm rounded bg-slate-100 hover:bg-slate-200 text-black active:scale-95 transition cursor-pointer'>
                      UnFollow
                    </button>
                  )}

                  {currentTab === 'Pending' && (
                    <button className='w-full p-2 text-sm rounded bg-slate-100 hover:bg-slate-200 text-black active:scale-95 transition cursor-pointer'>
                      Accept
                    </button>
                  )}

                  {currentTab === 'Connections' && (
                    <button onClick={()=>navigate(`/messages/${user._id}`)} className='w-full p-2 text-sm rounded bg-slate-100 hover:bg-slate-200 text-slate-800 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2'>
                      <MessageSquare className='w-4 h-4' />
                      Message
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Connection;
