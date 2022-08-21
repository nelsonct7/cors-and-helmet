
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import { useState,useEffect } from "react";
import {useSelector} from 'react-redux'
import AdminLoginPage from './pages/AdminLogin'
import AdminDashBoard from "./pages/AdminDashBoard";
import Protected from "./components/protector/Protected";


function App() {
  const [isLoggedIn,setIsLogedIn]=useState(false)
  const {adminInfo} =useSelector((state)=>({...state.admin}))
  useEffect(()=>{
    adminInfo?setIsLogedIn(true):setIsLogedIn(false)
  },[adminInfo])
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<AdminLoginPage/>} />
      <Route exact path="/admindashboard" element={
      <Protected isLoggedIn={isLoggedIn}>
      <AdminDashBoard/>
      </Protected>} />
      </Routes>
    </Router> 
  ); 
}

export default App;
