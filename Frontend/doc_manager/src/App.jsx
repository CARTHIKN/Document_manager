import { useState } from 'react'
import './App.css'
import UserLogin from './Pages/UserLogin'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserWrapper from './Components/User/UserWrapper';
import { Provider } from "react-redux";


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-slate-200 min-h-screen'>
      <Router>
      <Routes>
        <Route path="*" element={<UserWrapper />} /> 
      </Routes>
    </Router>
    </div>
  )
}

export default App
