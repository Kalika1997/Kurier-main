import React from 'react'
import { BiLogOut } from "react-icons/bi";
import useLogout from '../../hooks/useLogout';

const LogoutButton = () => {

  const { logout } = useLogout();
// although we don't need loading wala functionality here because logout will be very fast since no async call or any  other heavy task is done
  return (
    // mt-auto will push down the div to the bottom
    <div className='mt-auto btn btn-circle'>
      <BiLogOut className='w-6 h-6 text-white cursor-pointer' autoReverse={true} onClick={logout} />
    </div>)
}

export default LogoutButton