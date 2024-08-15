import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { set_Authentication } from '../Redux/authenticationSlice';
import { jwtDecode } from "jwt-decode";
import {  useSelector } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 



function UserLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState([]);
  const baseUrl = "http://127.0.0.1:8000";
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.authentication_user.isAuthenticated);

  useEffect(() => {
    if (location.state?.toast) {
      toast.success(location.state.toast);
    }
  }, [location.state]);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError([]);
    const formData = {username:username, password:password}

   
    try {
        console.log(formData);
        
        const res = await axios.post(
          "http://127.0.0.1:8000/auth/login/", formData
        )

        if (res.status === 200){
            localStorage.setItem("access", res.data.access);
            localStorage.setItem("refresh", res.data.refresh);
            dispatch(
              set_Authentication({
                username: jwtDecode(res.data.access).username,
                isAuthenticated: true,
              }),
            );
            console.log(res.data);
            console.log('success');
            navigate("home");
            return res;
        }
    }catch (error) {
        console.log(error);
        if (error.response.status === 400) {
          toast.success('invalid credentials')
          
        } else {
          console.error(error.response.data);
        }
      }
  };
  

  return (
    <div>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div className='it'>
                <h1 className="text-2xl font-semibold text-center">Login</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="email"
                      name="email"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                    />
                    <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Username</label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                    />
                    <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={handleSubmit}
                      className="bg-cyan-500 text-white rounded-md px-2 py-1">
                      Submit
                    </button>
                  </div>
            <div className="flex justify-center items-center mb-4">
            <Link to="/register" className="text-sm text-center">
                Not Have Account?
            </Link>
            </div>
          </div>
        </div>
      </div>

      

    </div>
  </div>
</div>
<ToastContainer />

    </div>
  )
}

export default UserLogin
