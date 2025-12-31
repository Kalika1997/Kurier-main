import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";



const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {


  const nodeEnv = process.env.NODE_ENV;
  const socketServerUrl = nodeEnv == 'development' ? 'http://localhost:5000' : 'https://kurier-msh1.onrender.com';



  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authenticatedUser } = useAuthContext();

  // if the user is authenticated then we will create a new socket connection to BE, and then set it to state else(when user logs out) set it to null

  useEffect(() => {
    if (authenticatedUser) {
      // we will pass authenticatedUser._id as a query parameter in the socket connection which we will catch in BE and map it against each socketId 
      const socket = io(socketServerUrl, {
        query: {
          userId: authenticatedUser._id
        }
      })
      setSocket(socket);

      socket.on('getOnlineUsers', (users) => {
        setOnlineUsers(users);
      })


      // the hook also returns a cleanup function that closes the socket when the component unmounts or the authenticatedUser changes.

      // The socket.close() ensures that the socket connection is properly closed to prevent any potential memory leaks or unintended behavior.
      return () => socket.close();

    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }

  }, [authenticatedUser]);


  return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
}













