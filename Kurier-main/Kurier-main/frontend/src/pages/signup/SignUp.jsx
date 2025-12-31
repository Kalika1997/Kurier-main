import React, { useState } from 'react'
import GenderCheck from './GenderCheck';
import { Link } from 'react-router-dom';
import useSignup from '../../hooks/useSignup';

// import GenderCheckbox from "./GenderCheckbox";

const SignUp = () => {
  // we need to use useState for keeping track of Signup data later sending it to backend for authentication/storage
  const [inputs, setInputs] = useState({
    fullName: '',
    userName: '',
    password: '',
    confirmPassword: '',
    gender: '',
  })

  // custom hook for saving data to backend
  const { loading, signup } = useSignup();

  // function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();     // to prevent the page from refreshing
    // when the form is submitted we send data to backend
    await signup(inputs);
  }


  // this function will be called when any checkbox is clicked and updates the state of the gender
  const handleGenderCheckBoxChange = (gender) => {
    setInputs({ ...inputs, gender: gender });
  }


  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-60'>
        <span className='text-white text-lg' >Use Random/Fake Username/PW combination</span>
      </div>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-60'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          <span className='text-yellow-800'>Sign-Up</span>     <span className='text-orange-500'> Kurier </span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input type='text' placeholder='Full Name' className='w-full input input-bordered input-ghost  h-10'
              // we get data from useState  
              value={inputs.fullName}
              //  if any changes occur to fullName field we update the state 
              onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>UserName</span>
            </label>
            <input
              type='text'
              placeholder='Username'
              className='input input-bordered input-ghost w-full max-w-xs" '
              value={inputs.userName}
              onChange={(e) => setInputs({ ...inputs, userName: e.target.value })}
            />
          </div>


          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-gray-400'>Password</span>
            </label>
            <input
              type='password'
              placeholder='password'
              className='input input-bordered input-ghost w-full max-w-xs" '
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
          </div>


          <div>
            <label className='label'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input
              type='password'
              placeholder='confirm password'
              className='w-full input input-bordered input-ghost h-10'
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
            />
          </div>

          {/* GenderCheck component is getting a selectedGender prop and handleGenderCheckBoxChange is a callback function as a prop */}
          <GenderCheck onGenderCheckBoxChange={handleGenderCheckBoxChange} selectedGender={inputs.gender} />

          <Link className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block' to='/login'>
            Already have an account?
          </Link>

          <div>
            {/* disable button if loading is true */}
            <button className='btn btn-block btn-sm mt-2 border bg-orange-700 text-white input-warning  border-slate-700
            disabled={loading}' >
              {loading ? <span className='loading loading-spinner loading-md'>SignUp</span> : 'Sign Up'}
            
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
