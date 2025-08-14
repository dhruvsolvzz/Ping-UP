import React, { useState } from 'react';
import { dummyUserData } from '../assets/assets';
import { Pencil } from 'lucide-react';

const ProfileModel = ({setShowEdit}) => {
  const user = dummyUserData;
  const [editForm, setEditForm] = useState({
    username: user.username,
    bio: user.bio,
    location: user.location,
    full_name: user.full_name,
    profile_picture: null,
    cover_photo: null,
  });

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    // Save logic here
  };

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 z-110 h-screen overflow-y-auto bg-black/50'>
      <div className='max-w-2xl sm:py-6 mx-auto'>
        <div className='bg-white rounded-lg shadow p-6'>
          <h1 className='text-2xl font-bold text-gray-900 mb-6'>Edit Profile</h1>

          <form className='space-y-6' onSubmit={handleSaveProfile}>
            {/* Cover Photo */}
            <div className='relative'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Cover Photo
              </label>
              <div
                className='relative group/cover cursor-pointer'
                onClick={() => document.getElementById('cover_photo_input').click()}
              >
                <img
                  src={
                    editForm.cover_photo
                      ? URL.createObjectURL(editForm.cover_photo)
                      : user.cover_photo || 'https://via.placeholder.com/800x200'
                  }
                  alt="Cover"
                  className='w-full h-40 object-cover rounded-lg border'
                />
                <div className='absolute hidden group-hover/cover:flex top-0 left-0 right-0 bottom-0 bg-black/30 rounded-lg items-center justify-center'>
                  <Pencil className='w-6 h-6 text-white' />
                </div>
              </div>
              <input
                type="file"
                id='cover_photo_input'
                accept='image/*'
                hidden
                onChange={(e) => setEditForm({ ...editForm, cover_photo: e.target.files[0] })}
              />

              {/* Profile Picture over cover */}
              <div
                className='absolute -bottom-12 left-6 w-24 h-24 group/profile cursor-pointer'
                onClick={() => document.getElementById('profile_picture_input').click()}
              >
                <img
                  src={
                    editForm.profile_picture
                      ? URL.createObjectURL(editForm.profile_picture)
                      : user.profile_picture
                  }
                  alt="Profile"
                  className='w-24 h-24 rounded-full object-cover border-4 border-white'
                />
                <div className='absolute hidden group-hover/profile:flex top-0 left-0 right-0 bottom-0 bg-black/30 rounded-full items-center justify-center'>
                  <Pencil className='w-5 h-5 text-white' />
                </div>
              </div>
              <input
                type="file"
                id='profile_picture_input'
                accept='image/*'
                hidden
                onChange={(e) => setEditForm({ ...editForm, profile_picture: e.target.files[0] })}
              />
            </div>

            {/* Push rest of the content down to avoid overlap */}
            <div className='pt-14'>
              <div>
                <label className='block text-sm font-medium text-gray-700'>Full Name</label>
                <input
                  type="text"
                  className='w-full p-2 border border-gray-300 rounded-lg'
                  value={editForm.full_name}
                  onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700'>Username</label>
                <input
                  type="text"
                  className='w-full p-2 border border-gray-300 rounded-lg'
                  value={editForm.username}
                  onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700'>Bio</label>
                <textarea
                  className='w-full p-2 border border-gray-300 rounded-lg'
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700'>Location</label>
                <input
                  type="text"
                  className='w-full p-2 border border-gray-300 rounded-lg'
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                />
              </div>

              {/* Save Button */}
              <div className='flex justify-end gap-2 mt-4'>
                <button
                  onClick={()=>setShowEdit(false)}
                  type="button"
                  className='px-4 py-2 cursor-pointer border rounded-lg text-gray-600 hover:bg-gray-100'
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className='px-4 py-2 cursor-pointer bg-indigo-600 text-white rounded-lg hover:bg-indigo-700'
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileModel;
