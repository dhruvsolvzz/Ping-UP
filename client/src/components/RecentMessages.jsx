import React, { useEffect, useState } from 'react';
import { dummyRecentMessagesData } from '../assets/assets';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Message from '../pages/Message';

const RecentMessages = () => {
  const [messages, setMessages] = useState([]);

  const fetchRecentMessages = async () => {
    setMessages(dummyRecentMessagesData);
  };

  useEffect(() => {
    fetchRecentMessages();
  }, []);

  return (
    <div className='bg-white max-w-xs mt-4 p-4 min-h-20 rounded-md shadow text-xs text-slate-800'>
      <h3 className='font-semibold mb-4'>Recent Messages</h3>
      <div className='flex flex-col max-h-56 overflow-y-scroll no-scrollbar'>
        {messages.map((message, index) => (
          <Link to={`/message/${message.from_user_id._id}`}

            key={index}
            
            className='relative flex items-start gap-2 py-2 hover:bg-slate-100'
          >
            <img
              src={message.from_user_id.profile_picture}
              className='w-8 h-8 rounded-full'
              alt={message.from_user_id.full_name}
            />
            <div className='w-full'>
              <div className='flex justify-between'>
                <p className='font-medium'>{message.from_user_id.full_name}</p>
                <p className='text-[10px] text-slate-400'>
                  {moment(message.createdAt).fromNow()}
                </p>
              </div>
              <p className='text-gray-500 truncate'>
                {message.text ? message.text : 'Media'}
              </p>
            </div>

            {/* 🔵 Unread Badge */}
            {!message.seen && (
              <span className='absolute top-6 right-2 bg-indigo-500 text-white w-4 h-4 flex items-center justify-center rounded-full text-[10px]'>
                1
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentMessages;
