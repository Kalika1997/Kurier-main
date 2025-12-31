import React from 'react'
import { useSideBarConversation } from '../../store/useSideBarConversation'
import { useSocketContext } from '../../context/SocketContext';

const Conversation = ({conversation}) => {

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  const { selectedConversation, setSelectedConversation } = useSideBarConversation();

  // checking if selected/clicked conversation(sideBar conversation) is same as this conversation(the one conversation out of array of conversations which we are getting from parent component)
  const isSelected = selectedConversation?._id === conversation._id;



  return <>
    <div className={`flex gap-2 items-center ${isSelected ? 'hover:bg-yellow-600' : 'hover:bg-zinc-700'}  rounded p-1 py-[8px]  cursor-pointer ${isSelected ? 'bg-yellow-700' : ''}`}
      onClick={() => setSelectedConversation(conversation)}
    >
      <div className={`avatar ${isOnline ? 'online' : ''}`}>
        <div className='w-12 rounded-full'>
          <img
            src={conversation.profilePic}
            alt='user avatar'
          />
        </div>
      </div>

      <div className='flex flex-col flex-1'>
        <div className='flex gap-3 justify-between'>
          <p className='font-bold text-gray-200'>{conversation.fullName}</p>
        </div>
      </div>
    </div>

    <div className='divider my-0 py-0 h-1' />

  </>
}

export default Conversation