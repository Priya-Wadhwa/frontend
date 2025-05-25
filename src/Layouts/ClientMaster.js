import React from 'react'
import Footer from './Footer'
import {Outlet} from 'react-router-dom'
import ClientHeader from './ClientHeader'

function ClientMaster() {
  return (
    <>
    <ClientHeader/>
    <div style={{minHeight:'70vh'}}>
    <Outlet/>
    </div>
    <Footer/>
    </>
  )
}

export default ClientMaster