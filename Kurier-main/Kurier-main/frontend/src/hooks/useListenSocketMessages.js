import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import { useSideBarConversation } from "../store/useSideBarConversation"

export const useListenSocketMessages = () => {
  // 1st I need to get the messages/setMessages global zustand state bcs obviously we need to update the global state whenever we receive a new message from backend
  const { messages, setMessages } = useSideBarConversation();

  // now we need the socketId of the user who is currently logged in(me ) bcs we need to listen for new messages to this socketId
  const { socket } = useSocketContext();


  // whenever we get an event on this socket with name 'newMessage'(we sended this event from BE) we need to update the global setMessages state

  useEffect(() => {
    socket.on('newMessage', (newMessage) => {
      // add new message to existing messages 
      setMessages([...messages, newMessage]);
    });

    // clean-up function
    return () => socket?.off('newMessage')

  }, [messages, setMessages, socket]);


}










