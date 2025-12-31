import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  // our custom hook for maintaining authenticated user in a state variable
  const { authenticatedUser, setAuthenticatedUser } = useAuthContext();

  const signup = async ({ fullName, userName, password, confirmPassword, gender }) => {

    // check if all fields are filled + passwords match + password is atleast 6 characters 
    const isSuccess = handleInputErrors({ fullName, userName, password, confirmPassword, gender });
    if (!isSuccess) {
      return;
    }

    setLoading(true);
    // if everything is fine send request to backend
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fullName, userName, password, confirmPassword, gender })
      });

      // convert the response to json
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      console.log(data)

      // when the data is sent to db we save the data in local storage and we redirect to login page

      // save data in local storage
      localStorage.setItem('authenticated-chat-user', JSON.stringify(data));


      // using authContext to update authenticatedUser in AuthContextProvider so that we can check if user is authenticated/logged in or not throughout the app
      setAuthenticatedUser(data);



    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
    finally {
      setLoading(false);
    }
  }
  return { loading, signup };
}
export default useSignup;

function handleInputErrors({ fullName, userName, password, confirmPassword, gender }) {
  if (!fullName || !userName || !password || !confirmPassword || !gender) {
    toast.error("Please fill all fields");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  return true;
}
