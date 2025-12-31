import { useState } from "react";
import { useSideBarConversation } from "../store/useSideBarConversation";
import toast from "react-hot-toast"


export const useSendMessage = () => {

  const [loading, setLoading] = useState(false)
  const { messages, setMessages, selectedConversation } = useSideBarConversation();


  const sendMessage = async (message) => {

    setLoading(true);
    try {
      const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      })
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // if message is sent successfully then add it to the global messages array
      setMessages([...messages, data]);

    } catch (error) {
      toast.error(error.message);
    }
    finally {
      setLoading(false);
    }
  }

  return { loading, sendMessage };


}

