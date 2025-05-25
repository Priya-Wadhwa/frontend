import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Outlet, Navigate} from 'react-router-dom'
import { toast } from 'react-toastify'

function Master() {
  const storedToken = sessionStorage.getItem("token");
  if(!storedToken){
    toast.error("user not authenticated! Login first");
    return <Navigate to='/login'/>
 
  }
  return (
    <>
    <Header/>

    <div style={{minHeight:'70vh'}}>
    <Outlet/>
    </div>
    <Footer/>
    </>
  )
}

export default Master