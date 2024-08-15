import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 


function UserSignup() {
  const navigate = useNavigate()
  const [formError, setFormError] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const baseUrl = "http://127.0.0.1:8000";
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError([]);
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    const formData = {username:username, password:password, email:email}
    try {
        
        
        const res = await axios.post(
            baseUrl + "/auth/signup/", formData
        );
        console.log('hello');
        
        if (res.status === 201) {
            toast.success('account created successfully')
            navigate("/", { state: { toast: 'Account created successfully' } });
        }
        return res;
    } catch (error) {
        if (error.response && error.response.status === 400) {
            console.log(error.response.data);
            setFormError(error.response.data);
            toast.error('A user with that username already exists.')
          } else {
            console.log(error);
          }
    }
    
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div
            className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
          </div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">

            <div className="max-w-md mx-auto">
              <div className='it'>
                <h1 className="text-2xl font-semibold text-center">Sign Up</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <form onSubmit={handleSubmit}>
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                      <input 
                        autoComplete="off" 
                        id="username" 
                        name="username" 
                        type="text" 
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" 
                        placeholder="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                      />
                      <label htmlFor="username" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Username</label>
                    </div>
                    <div className="relative">
                      <input 
                        autoComplete="off" 
                        id="email" 
                        name="email" 
                        type="email" 
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" 
                        placeholder="Email address" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                      />
                      <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                    </div>
                    <div className="relative">
                      <input 
                        autoComplete="off" 
                        id="password" 
                        name="password" 
                        type="password" 
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                      />
                      <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                    </div>
                    <div className="relative">
                      <input 
                        autoComplete="off" 
                        id="confirm_password" 
                        name="confirm_password" 
                        type="password" 
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" 
                        placeholder="Confirm Password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                      />
                      <label htmlFor="confirm_password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Confirm Password</label>
                    </div>
                    <div className="flex justify-center">
                      <button type="submit" className="bg-cyan-500 text-white rounded-md px-2 py-1">Submit</button>
                    </div>
                    <ul className="text-danger">
                </ul>
                    <div className="flex justify-center items-center mb-4">
                    <Link to="/" className="text-sm text-center">
                        Have Account ? Login
                    </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default UserSignup;
