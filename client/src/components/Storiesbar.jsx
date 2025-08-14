import React, { useEffect, useState } from 'react';
import { dummyStoriesData } from '../assets/assets';
import { PlusIcon } from 'lucide-react';
import StoryModal from './StoryModal';
import moment from 'moment';
import StoryViewer from './StoryViewer';

const Storiesbar = () => {
  const [stories, setStories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [viewStory, setViewStory] = useState(null);

  const fetchStories = async () => {
    setStories(dummyStoriesData);
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <div className='w-screen sm:w-[calc(300vh-240px)] lg:max-w-2xl no-scrollbar overflow-x-auto px-4'>
      <div className='flex gap-4 pb-5'>

        {/* ADD A STORY CARD */}
        <div className='rounded-lg shadow-sm w-28 h-40 aspect-[3/4] cursor-pointer hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-indigo-50 to-white'>
          <div onClick={() => setShowModal(true)} className='h-full flex flex-col items-center justify-center p-4'>
            <div className='size-10 bg-indigo-500 rounded-full flex items-center justify-center mb-3'>
              <PlusIcon className='w-5 h-5 text-white' />
            </div>
            <p className='text-sm font-medium text-slate-700 text-center'>Add a Story</p>
          </div>
        </div>

        {/* Story Cards */}
        {stories.map((story, index) => (
          <div
            onClick={() => setViewStory({ ...story, type: story.media_type })}
            key={index}
            className={`relative rounded-lg shadow min-w-30 max-w-30 max-h-40 cursor-pointer hover:shadow-lg transition-all duration-200 bg-gradient-to-b from-indigo-500
            to-purple-700 hover:from-indigo-700 hover:to-purple-800 active:scale-95`}
          >
            <img
              src={story.user.profile_picture}
              alt={`${story.user.username}'s profile`}
              className='absolute size-8 top-3 left-3 z-10 rounded-full ring ring-gray-100 shadow'
            />

            <p className='absolute top-[72px] left-3 text-white/60 text-sm truncate max-w-[6rem]'>
              {story.content || 'No content'}
            </p>

            <p className='text-white absolute bottom-1 right-2 z-10 text-xs'>
              {moment(story.createdAt).fromNow()}
            </p>

            {/* Text Story */}
            {story.media_type === 'text' && (
              <div className='absolute inset-0 rounded-lg bg-blue-400 text-white flex items-center justify-center px-2 text-center pointer-events-none'>
                <p className='text-xs opacity-80 truncate w-[90%] text-center'>
                  {story.content}
                </p>
              </div>
            )}

            {/* Image or Video Story */}
            {story.media_type !== 'text' && (
              <>
                <div className='absolute inset-0 z-0 rounded-lg bg-black backdrop-blur-md overflow-hidden'></div>

                {story.media_type === 'image' ? (
                  <img
                    src={story.media_url}
                    alt='Story Media'
                    className='h-full w-full object-cover backdrop-blur-md hover:scale-110 transition duration-500 opacity-70 hover:opacity-80'
                    onError={(e) => {
                      console.error('Image failed to load:', story.media_url);
                      e.target.src = '/fallback.jpg';
                    }}
                  />
                ) : (
                  <video
                    src={story.media_url}
                    className='h-full w-full object-cover hover:scale-110 transition duration-500 opacity-70 hover:opacity-80'
                    autoPlay
                    loop
                    muted
                    onError={() => {
                      console.error('Video failed to load:', story.media_url);
                    }}
                  />
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* ADD STORY MODAL */}
      {showModal && (
        <StoryModal setShowModal={setShowModal} fetchStories={fetchStories} />
      )}

      {/* VIEW STORY MODAL */}
      {viewStory && (
        <StoryViewer viewStory={viewStory} setViewStory={setViewStory} />
      )}
    </div>
  );
};

export default Storiesbar;
