import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin'

const Login = () => {
    // state variables for username and password
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');


    const { loading, login } = useLogin();


    const handleSubmit = async (e) => {
        e.preventDefault();     // to prevent the page from refreshing  
        await login(userName, password);
    };

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-60'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    <span className='text-yellow-800'>Login</span>
                    <span className='text-orange-500'> Kurier</span>
                </h1>

                <form onSubmit={handleSubmit} >

                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Username</span>
                        </label>
                        <input
                            type='text'
                            placeholder='Enter username'
                            className='input input-bordered input-ghost w-full max-w-xs'
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}

                        />
                    </div>


                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-gray-400'>Password</span>
                        </label>
                        <input
                            type='password'
                            placeholder='password'
                            className='input input-bordered input-ghost w-full max-w-xs '
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>


                    <Link to='/signup' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
                        {"Don't"} have an account?
                    </Link>

                    <div>
                        <button className='btn btn-block btn-sm mt-2 border bg-orange-700 text-white input-warning  border-slate-700
            disabled={loading}'>
                            {loading ? <span className='loading loading-spinner' /> : 'Login'}
                        </button>
                    </div>

                </form>

            </div>
        </div>
    )
}

export default Login