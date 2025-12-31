import React from 'react'
import Conversation from './Conversation'
import { useGetSideBarConversations } from '../../hooks/useGetSideBarConversations';

const Conversations = () => {

  const { loading, conversations } = useGetSideBarConversations();
  return (
    <div className='py-2 flex flex-col overflow-auto'>


      {conversations.map((conversation) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
        />
      ))}



      {/* while loading is true show a loading spinner, and when loading is false show nothing(null)  */}
      {loading ? <span className='loading loading-spinner'></span> : null}

    </div>)
}

export default Conversations