import React, { useEffect, useRef, useState } from 'react'
import { dummyMessagesData, dummyUserData } from '../assets/assets'
import { ImageIcon, SendHorizonal } from 'lucide-react'

const ChatBox = () => {
  const messages = dummyMessagesData
  const [text, setText] = useState('')
  const [image, setImage] = useState(null)
  const [user, setUser] = useState(dummyUserData)
  const messagesEndRef = useRef(null)

  const sendMessage = async () => {
    // your send message logic
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return user && (
    <div className='flex flex-col h-screen'>
      <div className='flex items-center gap-2 p-2 md:px-10 xl:pl-42 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-300'>
        <img src={user.profile_picture} className='size-8 rounded-full' alt="" />
        <div>
          <p className='font-medium'>{user.full_name}</p>
          <p className='text-sm text-gray-500 mt-1.5'>{user.username}</p>
        </div>
      </div>

      <div className='p-5 md:px-10 h-full overflow-y-scroll'>
        <div className='space-y-4 max-w-4xl mx-auto'>
          {messages
            .toSorted((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            .map((message, index) => (
              <div
                key={index}
                className={`flex flex-col ${message.to_user_id === user._id ? 'items-end' : 'items-start'}`}
              >
                <div className={`p-2 text-sm max-w-sm bg-white text-slate-700 rounded-lg shadow ${message.to_user_id === user._id ? 'rounded-br-none' : 'rounded-bl-none'}`}>
                  {message.message_type === 'image' && (
                    <img src={message.media_url} className='w-full max-w-sm rounded-lg mb-1' alt="" />
                  )}
                  <p>{message.text}</p>
                </div>
              </div>
            ))
          }
          <div ref={messagesEndRef} />
        </div>
      </div>

<div className='px-4'>
  <div className='flex items-center gap-3 pl-5 py-2 bg-white w-full max-w-xl mx-auto border border-gray-200 shadow-lg rounded-full mb-5 transition-all duration-200 focus-within:shadow-xl'>
    <input
      type="text"
      className='flex-1 outline-none text-slate-700 placeholder-gray-400 text-sm'
      placeholder='Type your message...'
      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      onChange={(e) => setText(e.target.value)}
      value={text}
    />
    
    <label htmlFor="image" className="cursor-pointer flex items-center">
      {image ? (
        <img
          src={URL.createObjectURL(image)}
          className='h-8 w-auto max-w-[60px] object-cover rounded-lg border border-gray-200 shadow-sm hover:opacity-90 transition'
          alt='preview'
        />
      ) : (
        <ImageIcon className='size-7 text-gray-400 hover:text-indigo-500 transition' />
      )}
      <input
        type="file"
        id='image'
        accept='image/*'
        hidden
        onChange={(e) => setImage(e.target.files[0])}
      />
    </label>

    <button
      onClick={sendMessage}
      className='bg-indigo-500 text-white text-sm p-2 cursor-pointer rounded-full hover:bg-indigo-600 active:scale-95 transition'
    >
      <SendHorizonal size={18} />
    </button>
  </div>
</div>

    </div>
  )
}

export default ChatBox
