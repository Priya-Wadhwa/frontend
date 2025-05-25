import React from 'react'
import Footer from './Footer'
import {Outlet} from 'react-router-dom'
import BdeHeader from './BdeHeader'

function BdeMaster() {
  return (
    <>
    <BdeHeader/>
    <div style={{minHeight:'70vh'}}>
    <Outlet/>
    </div>
    <Footer/>
    </>
  )
}

export default BdeMaster