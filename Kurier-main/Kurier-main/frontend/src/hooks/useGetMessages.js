import { useEffect, useState } from 'react'
import { useSideBarConversation } from "../store/useSideBarConversation";
import toast from 'react-hot-toast';



export const useGetMessages = () => {

  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useSideBarConversation();

  // since everytime we select a chat from sideBar we want to get all the messages from that particular chat which means we have to make a get request to get all the messages from that particular chat from backend 

  // and the messages will be rendered only when we select a new chat from sideBar or when we receive a new message from backend (i.e. when setMessages is updated or selectedConversation._id is changed  )

  // the solution to this is to use useEffect

  useEffect(() => {
    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id, setMessages])


  const getMessages = async () => {

    setLoading(true);
    try {
      const res = await fetch(`api/messages/${selectedConversation._id}`);
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // if message is received successfully then add it to the global messages array
      setMessages(data);


    } catch (error) {
      toast.error(error.message);
    }
    finally {
      setLoading(false);
    }
  }


  // this time we won't return a function with loading state, instead we will return the global state which we just updated "messages"
  return { loading, messages };


}






