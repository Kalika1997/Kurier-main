import { createContext, useContext, useState } from "react";




export const AuthContext = createContext();




export const AuthContextProvider = ({ children }) => {
  // getting authenticated user from local storage, if not present get null (set useState to null)
  const [authenticatedUser, setAuthenticatedUser] = useState(JSON.parse(localStorage.getItem('authenticated-chat-user')) || null);

  // now we want to use this authenticatedUser throughout the app to check if user is authenticated/logged in or not  (we will wrap our app with this AuthContextProvider in main.jsx)
  return <AuthContext.Provider value={{ authenticatedUser, setAuthenticatedUser }}>
    {children}
  </AuthContext.Provider>

}

// to consume these values we will use a hook 
export const useAuthContext = () => {
  return useContext(AuthContext)
}

