import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import moment from 'moment';

const StoryViewer = ({ viewStory, setViewStory }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer;

    if (viewStory && viewStory.media_type !== 'video') {
      setProgress(0);
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setViewStory(null);
            return 100;
          }
          return prev + 2;
        });
      }, 100);
    }

    return () => clearInterval(timer);
  }, [viewStory, setViewStory]);

  if (!viewStory) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
      {/* Close Button */}
      <button
        onClick={() => setViewStory(null)}
        className="absolute top-4 right-4 cursor-pointer hover:bg-blue-500  text-white z-50"
      >
        <X size={28} />
      </button>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-700">
        <div
          className="h-full bg-indigo-400 transition-all duration-100"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Content */}
      <div className="max-w-[95%] max-h-[95%] flex flex-col items-center justify-center px-4">
        {/* USER INFO */}
        <div className="absolute top-3 left-4 flex items-center gap-2 text-white text-sm">
          <img
            src={viewStory.user.profile_picture}
            alt={viewStory.user.username}
            className="w-8 h-8 rounded-full ring-2 ring-white"
          />
          <div>
            <p className="font-medium">{viewStory.user.username}</p>
            <p className="text-xs opacity-80">
              {moment(viewStory.createdAt).fromNow()}
            </p>
          </div>
        </div>

        {/* MEDIA OR TEXT */}
        {viewStory.media_type === 'text' ? (
          <div className="text-white text-lg text-center px-4">
            <p className="whitespace-pre-line">{viewStory.content}</p>
          </div>
        ) : viewStory.media_type === 'image' ? (
          <img
            src={viewStory.media_url}
            alt="story"
            className="max-h-[90vh] max-w-full object-contain rounded-lg"
            onError={(e) => {
              e.target.src = '/fallback.jpg';
            }}
          />
        ) : (
          <video
            src={viewStory.media_url}
            autoPlay
            controls
            loop
            muted
            className="max-h-[90vh] max-w-full object-contain rounded-lg"
          />
        )}
      </div>
    </div>
  );
};

export default StoryViewer;
