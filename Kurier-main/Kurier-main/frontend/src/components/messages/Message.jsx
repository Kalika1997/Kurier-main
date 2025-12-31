import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { useSideBarConversation } from '../../store/useSideBarConversation';
import { dateTimeFormatter } from '../../utils/dateTimeFormatter';

// everything in this component will be coming from daisyui
const Message = ({ message }) => {

  // need to check if the message from us or the other person, that can be identified by the authentication global state 
  const { authenticatedUser } = useAuthContext();
  const { selectedConversation } = useSideBarConversation();

  // we are also saving senderId and receiverId in the message object in the backend
  const isMessageFromMe = authenticatedUser._id === message.senderId;

  const chatBubbleClassName = isMessageFromMe ? 'chat chat-end' : 'chat chat-start';

  const chatProfilePic = isMessageFromMe ? authenticatedUser.profilePic : selectedConversation.profilePic;

  const chatBgColour = isMessageFromMe ? 'bg-blue-500' : 'bg-orange-800';

  const formattedTime = dateTimeFormatter(message.createdAt);



  return (
    // "chat-end" is used to place the message on the right side (when I send message) and "chat-start" is used to place the message on the left side (when other person sends message) coming from daisyui
    <div className={chatBubbleClassName}>
      {/* "chat-image avatar" is used to display the profile picture */}
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img alt='Tailwind CSS chat bubble component'
            src={chatProfilePic}
          />
        </div>
      </div>

      {/* "chat-bubble" is used to display the message */}
      <div className={`chat-bubble text-white  ${chatBgColour} `}>{message.message}</div>
      {/* "chat-footer" -> we are using it to display the time below the message */}
      <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
    </div>)
}

export default Message