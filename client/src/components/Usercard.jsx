import React from 'react'
import { dummyUserData } from '../assets/assets'
import { MapPin, MessageCircle, Plus, UserPlus } from 'lucide-react'

const Usercard = ({ user }) => {
  const currentUser = dummyUserData

  const handleFollow = async () => {
    // follow logic here
  }

  const handleConnectionRequest = async () => {
    // connection request logic here
  }

  return (
    <div key={user._id} className='p-4 pt-6 flex flex-col justify-between w-72 shadow border border-gray-200 rounded-md'>
      {/* Profile Info */}
      <div className='text-center'>
        <img src={user.profile_picture} className='rounded-full w-16 shadow-md mx-auto' alt="" />
        <p className='mt-4 font-semibold'>{user.full_name}</p>
        {user.username && <p className='text-gray-500 font-light'>@{user.username}</p>}
        {user.bio && <p className='text-gray-600 mt-2 text-center text-sm px-4'>{user.bio}</p>}
      </div>

      {/* Location & Followers */}
      <div className="flex items-center gap-2 mt-3">
        <div className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1 text-sm">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span>{user.location}</span>
        </div>
        <div className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1 text-sm">
          <span>{user.followers.length}</span>
          <span>Followers</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className='flex mt-4 gap-2'>
        {/* Follow Button */}
        <button
          onClick={handleFollow}
          disabled={currentUser?.following.includes(user._id)}
          className={`w-full py-2 rounded-md flex justify-center items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition text-white 
            ${currentUser?.following.includes(user._id) ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <UserPlus className='w-4 h-4' />
          {currentUser?.following.includes(user._id) ? 'Following' : 'Follow'}
        </button>

        {/* Connection Request / Message Button */}
        <button
          onClick={handleConnectionRequest}
          className='flex items-center justify-center w-16 border text-slate-500 group rounded-md cursor-pointer active:scale-95 transition'
        >
          {currentUser?.connections.includes(user._id)
            ? <MessageCircle className='w-5 h-5 group-hover:scale-105 transition' />
            : <Plus className='w-5 h-5 group-hover:scale-105 transition' />
          }
        </button>
      </div>
    </div>
  )
}

export default Usercard
