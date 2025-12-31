import React, { useEffect, useRef } from 'react'
import Message from './Message'
import { useGetMessages } from '../../hooks/useGetMessages'
import { useListenSocketMessages } from '../../hooks/useListenSocketMessages';

//  This component will be used to display all the messages (each message will be a seperate Message component)
const Messages = () => {

  const { loading, messages } = useGetMessages();
  const latestMessageRef = useRef();

  useListenSocketMessages();

  useEffect(() => {
    setTimeout(()=>{

      latestMessageRef.current?.scrollIntoView()
    })

  }, [messages])


  return (
    // overflow-auto will make the container/messages scrollable whenver there is a lot of messages(more than screen can fit)
    <div className='px-4 flex-1 overflow-auto'>
      {loading ? <span className='loading loading-spinner'></span> : null}
      {/* if not loading and message array with that particular chat is 0 the show a text message to staet conversation  */}
      {!loading && messages.length === 0 && (
        <p className='text-center text-gray-400'> Send a Text to start Conversation</p>
      )}

      {/* if not loading and message array with that particular chat is greater than 0 then send each message from that array  to our Message component to render it (Message Component will take the message as a prop )  */}
      {!loading && messages.length > 0 && (
        messages.map((message) => (
          <div key={message._id} ref={latestMessageRef}>
            <Message message={message} />
          </div>
        ))
      )}

    </div>)
}

export default Messages 