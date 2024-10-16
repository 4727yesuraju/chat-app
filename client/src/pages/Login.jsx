import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../hooks/useLogin'

export default function Login() {
    const [inputs,setInputs] = useState({});

    const {loading,login} = useLogin();

    function handleSubmit(e){
        e.preventDefault();
        login(inputs);
        
    }
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="h-full w-full bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 p-2">
            <h1 className="text-3xl font-semibold text-center text-gray-300">
                Login{" "}
                <span className="text-orange-500">ChatApp</span>
            </h1>
            <form onSubmit={handleSubmit} className="">
                <div>
                    <label htmlFor="" className="label p-2">
                        <span className="text-base label-text text-white">Username</span>
                    </label>
                    <input type="text" placeholder="Enter username" className="w-full input input-bordered h-10" value={inputs.username || ""} onChange={e=>setInputs({...inputs,username : e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="" className="label p-2">
                        <span className="text-base label-text text-white">Password</span>
                    </label>
                    <input type="password" placeholder="Enter password" className="w-full input input-bordered h-10" value={inputs.password || ""} onChange={e=>setInputs({...inputs,password : e.target.value})}/>
                </div>
                <Link to="/signup" className='text-sm hover:underline hover:text-orange-500 mt-2 inline-block text-white'>
                    {"Don't"} have an account?
                </Link>
                <div>
                    <button className="btn btn-block btn-sm mt-2" disabled={loading}> 
                        {loading ? <span className="loading loading-spinner"></span> : "loading"}
                    </button>
                </div>
            </form>
        </div>
      
    </div>
  )
}
