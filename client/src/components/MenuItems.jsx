import React from 'react';
import { menuItemsData } from '../assets/assets';
import { NavLink } from 'react-router-dom';

const MenuItems = ({ setSidebarOpen }) => {

  const handleLinkClick = () => {
    if (window.innerWidth < 640) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className='px-6 text-gray-600 space-y-1 font-medium'>
      {
        menuItemsData.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `px-3.5 py-3 flex items-center gap-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-100 text-indigo-700 font-semibold'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-black'
              }`
            }
          >
            <Icon className='w-5 h-5' />
            {label}
          </NavLink>
        ))
      }
    </div>
  );
};

export default MenuItems;
