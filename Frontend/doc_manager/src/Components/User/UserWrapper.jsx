import React from 'react'
import { Routes, Route } from "react-router-dom";
import UserLogin from '../../Pages/UserLogin';
import UserSignup from '../../Pages/UserSignup';
import Home from '../../Pages/Home';
import PrivateRoute from '../PrivateRoute';
import Room from '../../Pages/Room';

function UserWrapper() {
  return (
    <div>
        <Routes>
        
        <Route path="/" element={<UserLogin/>}></Route>
        <Route path="register" element={<UserSignup />}></Route>
        <Route
          path="home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="room"
          element={
            <PrivateRoute>
              <Room/>
            </PrivateRoute>
          }
        ></Route>

      </Routes>
      
    </div>
  )
}

export default UserWrapper
