import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { Toaster } from 'react-hot-toast';

import Login from './pages/Login';
import Feed from './pages/Feed';
import Message from './pages/Message';
import ChatBox from './pages/ChatBox';
import Connection from './pages/Connection';
import Discover from './pages/Discover';
import Profile from './pages/Profile';
import CreatePost from './pages/CreatePost';
import Layout from './pages/Layout';
import StoryViewer from './components/StoryViewer';

const App = () => {
  const { user } = useUser();

  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        {!user ? (
          <Route path="*" element={<Login />} />
        ) : (
          <Route path="/" element={<Layout />}>
            {/* ⬇️ FIXED HERE: removed 'replace' */}
            <Route index element={<Navigate to="feed" />} />

            <Route path="feed" element={<Feed />} />
            <Route path="messages" element={<Message />} />
            <Route path="/message/:id" element={<Message />} />
            <Route path="messages/:userId" element={<ChatBox />} />
            <Route path="connections" element={<Connection />} />
            <Route path="discover" element={<Discover />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/:profileId" element={<Profile />} />
            <Route path="createpost" element={<CreatePost />} />
            <Route path="story/:storyId" element={<StoryViewer />} />
            <Route path="*" element={<div className="text-center mt-20 text-xl">404 - Page not found</div>} />
          </Route>
        )}
      </Routes>
    </>
  );
};

export default App;
