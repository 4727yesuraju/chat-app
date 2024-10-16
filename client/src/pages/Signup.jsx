import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useSignup from '../hooks/useSignup';

export default function Signup() {
    const [inputs,setInputs] = useState({});

    const handleChange = (e)=>{
         setInputs({...inputs,[e.target.id] : e.target.value});
    }

    const handleCheckBoxChange = (gender)=>{
          setInputs({...inputs,gender});
    }

	const {loading,signup} = useSignup();

    const handleSubmit =async (e)=>{
        e.preventDefault();
		await signup(inputs)
        console.log(inputs);
    }

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="h-full w-full bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 p-2">
            <h1 className="text-3xl font-semibold text-center text-gray-300">
                Signup{" "}
                <span className="text-orange-500">ChatApp</span>
            </h1>
            <form onSubmit={handleSubmit}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text text-white'>Full Name</span>
						</label>
						<input id="fullName" type='text' placeholder='John Doe' className='w-full input input-bordered  h-10' value={inputs.fullName || ""}  onChange={handleChange}/>
					</div>

					<div>
						<label className='label p-2 '>
							<span className='text-base label-text text-white'>Username</span>
						</label>
						<input id="username" type='text' placeholder='johndoe' className='w-full input input-bordered h-10' value={inputs.username || ""} onChange={handleChange} />
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text text-white'>Password</span>
						</label>
						<input
                            id="password"
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
                            value={inputs.password || ""}
                            onChange={handleChange}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text text-white'>Confirm Password</span>
						</label>
						<input
                            id="confirmPassword"
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10'
                            value={inputs.confirmPassword || ""}
                            onChange={handleChange}
						/>
					</div>

					<GenderCheckbox onCheckboxChange = {handleCheckBoxChange} selectedGender={inputs.gender} />

					<Link to="/login" className='text-sm hover:underline hover:text-orange-300 mt-2 inline-block text-white' href='#'>
						Already have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled = {loading}>
							{loading ? <span className="loading loading-spinner"></span> : "Sign UP"}
						</button>
					</div>
				</form>
        </div>
      
    </div>
  )
}



const GenderCheckbox = ({onCheckboxChange,selectedGender}) => {
     	return (
     		<div className='flex text-white'>
     			<div className='form-control'>
     				<label className={`label gap-2 cursor-pointer ${selectedGender === 'male' ? "selected" : ""}`}>
     					<span className='label-text text-white'>Male</span>
     					<input type='checkbox' className='checkbox border-gray-100' checked={selectedGender === 'male'} onChange = {()=>onCheckboxChange("male")} />
     				</label>
     			</div>
     			<div className='form-control'>
     				<label className={`label gap-2 cursor-pointer ${selectedGender === 'female' ? "selected" : ""}`}>
     					<span className='label-text text-white'>Female</span>
     					<input type='checkbox' className='checkbox border-gray-100 ' checked={selectedGender === 'female'} onChange = {()=>onCheckboxChange("female")}/>
     				</label>
     			</div>
     		</div>
     	);
     };