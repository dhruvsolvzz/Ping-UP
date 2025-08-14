import React, { useEffect, useState } from 'react';
import { assets, dummyPostsData } from '../assets/assets';
import Loading from '../components/Loading';
import Storiesbar from '../components/Storiesbar';
import PostCard from '../components/PostCard';
import RecentMessages from '../components/recentMessages';

const Feed = () => {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeeds = async () => {
    setFeeds(dummyPostsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  return !loading ? (
    <div className='h-full overflow-y-scroll overflow-x-auto no-scrollbar py-10  flex items-start justify-center xl:gap-8 w-full'>
      {/* Stories and Post list */}
      <div>
        <Storiesbar />
        <div className='p-4 space-y-6'>
          {feeds.map((post)=>(
            <PostCard key={post._id} post={post}/>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className='max-xl:hidden sticky top-0'>
        <div className='max-w-xs bg-white text-xs p-4 rounded-md inline-flex flex-col gap-2 shadow'>
          <h3 className='text-slate-800 font-semibold'>Sponsored</h3>
          <img src={assets.sponsored_img}  className='w-75 h-50 sounde-md'  alt="" srcset="" />
          <p className='text-slate-600'>Email Marketing</p>
          <p className='text-slate-400'>Supercharge your marketing witha  powerful , east-to-use platform built for results.</p>
        </div>
        <div>
          <RecentMessages/>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Feed;
