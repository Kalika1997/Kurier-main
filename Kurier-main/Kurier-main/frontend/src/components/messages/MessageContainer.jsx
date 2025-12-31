import React, { useEffect } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import { TiMessages } from "react-icons/ti";
import { useSideBarConversation } from '../../store/useSideBarConversation';
import { useAuthContext } from '../../context/AuthContext';

//  this component will also have 3 other components -> 1. Header (to whom you are messaging) , 2. Messages (each message) , 3. MessageInput

const MessageContainer = () => {

  // using our global zustand state to check if a chat is selected or not

  const { selectedConversation, setSelectedConversation } = useSideBarConversation();

  // we want to unmount the selectedConversation when the person's log-out (i.e when the setSelectedConversation is changed/called)
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation])

  // const noChatSelected = false;

  return (
    <div className=' md:w-[550px] lg:w-[750px] xl:w[850px] flex flex-col '>
      {/* 1st ->  Header component */}

      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className=' px-3 mb-2 bg-zinc-800 flex '>
            {/* avatar/profile picture */}
            <div className='avatar pt-2'>
              <div className='max-h-12 rounded-full '>
                <img
                  src={selectedConversation.profilePic}
                  alt='user avatar'
                />
              </div>
            </div>

              {/* name */}
              <div className='px-3  py-5  font-bold '>{selectedConversation.fullName}</div>
            </div>


            {/* 2nd -> Messages component */}
            <Messages />
        {/* 3rd -> MessageInput component */}
            <MessageInput />
          </>
        )
      }

    </div>)
}

export default MessageContainer



const NoChatSelected = () => {
  const { authenticatedUser } = useAuthContext();
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
        <p>Welcome {authenticatedUser.fullName}  ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className='text-3xl md:text-6xl text-center' />
      </div>
    </div>
  );
};





