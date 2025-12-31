import React, { useState } from 'react'
import { IoIosSend } from "react-icons/io";
import { useSendMessage } from '../../hooks/useSendMessage';

const MessageInput = () => {
  const [message, setMessage] = useState('');

  const { loading, sendMessage } = useSendMessage();

  const handleMessageSubmit = async (e) => {
    e.preventDefault();     // to prevent the page from refreshing
    if (!message) return;

    // now when the user clck on send message icon we will call the sendMessage function from useSendMessage hook
    sendMessage(message);
    // after sending the message we will clear the input field
    setMessage('');
  }

  return (
    <form className='px-4 my-3' onSubmit={handleMessageSubmit}>
      <div className='w-full relative '>
        <input
          type='text'
          className='border text-sm rounded-lg block w-full p-2.5  bg-gray-800  input-warning '
          placeholder='Send a message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
          {/* <BsSend /> */}
          {/* if the loading is true show a loading spinner else show the send icon */}
          {loading ? <span className='loading loading-spinner'></span> : <IoIosSend className='w-5 h-5' />}
          
        </button>
      </div>
    </form>)
}

export default MessageInput