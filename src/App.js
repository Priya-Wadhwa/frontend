import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from 'react-toastify'
import Master from './Layouts/Master'
import ClientMaster from './Layouts/ClientMaster'
import Home from './Layouts/Home'
import Register from './Auth/Register'
import Login from './Auth/Login'
import AddProject from './Client/AddProject'
import ManageProjects from './Client/ManageProjects'
import ViewSingleProject from './Client/ViewSingleProject'
import Services from './Layouts/Services'
import Dashboard from './Admin/Dashboard'
import AddCategory from './Admin/Category/AddCategory'
import ManageCategory from './Admin/Category/ManageCategory'
import UpdateCategory from './Admin/Category/UpdateCategory'
import ViewProjects from './Admin/Projects/ViewProjects'
import ProjectDetails from './Admin/Projects/ProjectDetails'
import ViewBde from './Admin/ViewBde'
import ViewClient from './Admin/ViewClient'
import BdeMaster from './Layouts/BdeMaster'
import ViewProject from './BDE/ViewProject'
import ViewBids from './BDE/Bids/ViewBids'
import ViewBdeBids from './Client/ViewBdeBids'
import ChangePassword from './Client/ChangePassword'
import UpdateProject from './Client/UpdateProject'
import BDERegister from './Auth/BDERegister'
import BdeChangePassword from './BDE/BdeChangePassword'
import AddBids from './BDE/Bids/AddBids'
import UpdateBids from './BDE/Bids/UpdateBids'
import ViewDetails from './Client/ViewDetails'
import ViewBidsAdmin from './Admin/ViewBidsAdmin'

function App() {
  return (
    <>

   <BrowserRouter>
   <Routes>
     <Route path='/login' element={<Login/>}/>
     <Route path='/register' element={<Register/>}/>
     <Route path='/BDEregister' element={<BDERegister/>}/>


    <Route path='/admin' element={<Master/>}>
    <Route path='/admin' element={<Dashboard/>}/>
    <Route path='/admin/addCategory' element={<AddCategory/>}/>
    <Route path='/admin/manageCategory' element={<ManageCategory/>}/>
    <Route path='/admin/updateCategory/:id' element={<UpdateCategory/>}/>
    <Route path='/admin/viewProjects' element={<ViewProjects/>}/>
    <Route path='/admin/projectDetail/:id' element={<ProjectDetails/>}/>
    <Route path='/admin/viewBde' element={<ViewBde/>}/>
    <Route path='/admin/Clients' element={<ViewClient/>}/>
    <Route path='/admin/viewAllBids' element={<ViewBidsAdmin/>}/>


    </Route> 

    <Route pathe='/client' element={<ClientMaster/>}>
      <Route path='/client' element={<Home/>}/>
      <Route path='/client/services' element={<Services/>}/>
      <Route path='/client/addProject' element={<AddProject/>}/>
      <Route path='/client/viewProject/:id' element={<ViewDetails/>}/>
      <Route path='/client/manageProject' element={<ManageProjects/>}/>
      <Route path='/client/updateProject/:id' element={<UpdateProject/>}/>
      <Route path='/client/viewSingleProject' element={<ViewSingleProject/>}/>
      <Route path='/client/viewBdeBids' element={<ViewBdeBids/>}/>
      <Route path='/client/changePassword' element={<ChangePassword/>}/>



    </Route>

    <Route pathe='/' element={<BdeMaster/>}>
      <Route path='/' element={<Home/>}/>
      <Route path='/services' element={<Services/>}/>
      {/* <Route path='/bde/addBids' element={<AddProject/>}/> */}
      <Route path='/viewBids' element={<ViewBids/>}/>
      <Route path='/updateBid/:id' element={<UpdateBids/>}/>
      <Route path='/addBids/:id' element={<AddBids/>}/>
      {/* <Route path='/viewCategory' element={<ViewCategory/>}/> */}
      <Route path='/viewProjects' element={<ViewProject/>}/>
      <Route path='/changePassword' element={<BdeChangePassword/>}/>



    </Route>
   </Routes>
   </BrowserRouter>
      <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
    </>
  )
}

export default App