import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dummyPostsData, dummyUserData } from '../assets/assets'
import Loading from '../components/Loading'
import UserProfileInfo from '../components/UserProfileInfo'
import PostCard from '../components/PostCard'
import moment from 'moment'
import ProfileModel from '../components/ProfileModel'

const Profile = () => {
  const { profileID } = useParams()
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [activeTab, setActiveTab] = useState('posts')
  const [showEdit, setShowEdit] = useState(false)

  const FetchUser = async () => {
    // Simulate fetching from backend using profileID
    setUser(dummyUserData)
    setPosts(dummyPostsData)
  }

  useEffect(() => {
    FetchUser()
  }, [profileID])

  return user ? (
    <div className="relative h-full overflow-y-scroll bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl">
        {/* PROFILE CARD */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          {/* Cover Image */}
          <div className="h-40 md:h-56 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
            {user.cover_photo && (
              <img
                src={user.cover_photo}
                className="w-full h-full object-cover"
                alt=""
              />
            )}
          </div>
          {/* USER INFO */}
          <UserProfileInfo
            user={user}
            posts={posts}
            profileId={profileID}
            setShowEdit={setShowEdit}
          />
        </div>

        {/* TABS */}
        <div className="mt-6">
          <div className="bg-white rounded-xl shadow p-1 flex max-w-md mx-auto">
            {['posts', 'media', 'likes'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                  activeTab === tab
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          {/* POSTS */}
          <div>
            {activeTab === 'posts' && (
              <div className="mt-6 flex flex-col items-center gap-6">
                {posts.length === 0 ? (
                  <p className="text-gray-500 text-sm">No posts yet.</p>
                ) : (
                  posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))
                )}
              </div>
            )}

            {/* MEDIA */}
            {activeTab === 'media' && (
              <div className="mt-6 flex flex-wrap gap-4 max-w-6xl">
                {posts.filter(post => post.image_urls?.length > 0).length === 0 ? (
                  <p className="text-gray-500 text-sm">No media found.</p>
                ) : (
                  posts
                    .filter(post => post.image_urls?.length > 0)
                    .map(post =>
                      post.image_urls.map((image, index) => (
                        <a
                          key={`${post._id}-${index}`}
                          href={image}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block relative w-64 overflow-hidden rounded-lg"
                        >
                          <img
                            src={image}
                            alt=""
                            className="w-64 aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-end">
                            <p className="text-xs text-white p-2">
                              Posted {moment(post.createdAt).fromNow()}
                            </p>
                          </div>
                        </a>
                      ))
                    )
                )}
              </div>
            )}

            {/* LIKES */}
            {activeTab === 'likes' && (
              <div className="mt-6 text-center text-gray-500">
                No liked posts yet.
              </div>
            )}
          </div>
        </div>
        
      </div>
   {showEdit && <ProfileModel setShowEdit={setShowEdit}/>}
      
    </div>
  ) : (
    <Loading />
  )
}

export default Profile
