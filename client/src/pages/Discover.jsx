import React, { useState } from 'react';
import { dummyConnectionsData } from '../assets/assets';
import { Search } from 'lucide-react';
import Usercard from '../components/Usercard';
import Loading from '../components/Loading';

const Discover = () => {
  const [input, setInput] = useState('');
  const [users, setUsers] = useState(dummyConnectionsData);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setUsers([]);
      setLoading(true);
      setTimeout(() => {
        setUsers(dummyConnectionsData); // replace with real fetch later
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto p-6">
        {/* TITLE */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Discover People</h1>
          <p className="text-slate-600">
            Connect with People and Grow Your Network
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyUp={handleSearch}
              placeholder="Search People by Name, Username, Bio..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className='flex flex-wrap mt-6 gap-6'>
            {users.map((user)=>(
           <Usercard user= {user} key={user._id} />
             ))}
          </div>
          {
            loading && (<Loading height='60vh'/>)
          }
        </div>
      </div>
    </div>
  );
};

export default Discover;