import React from 'react'
import SearchInput from './SearchInput';
import Conversations from './Conversations';
import LogoutButton from './LogoutButton';

// will have 3 components -> SearchInput , chats/Conversations , LogoutButton

const Sidebar = () => {
  return (
    <div className=' border-r border-yellow-800 p-4 flex flex-col '>
      <SearchInput />
      <div className='divider px-3'></div>       

      <Conversations />
      <LogoutButton />
    </div>
  );
};
export default Sidebar;

