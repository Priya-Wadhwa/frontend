import React from 'react'
import { useState,useEffect } from "react"
import { toast } from "react-toastify"
import ApiServices,{BASE_URL} from '../ApiServices'
import { useNavigate,useParams,Link } from "react-router-dom"
import {ClipLoader} from "react-spinners"
// import "./Type.css"
const override= {

  margin: "0 auto",
  marginTop: "250px",
  marginBottom: '200px',
  display:'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow:"hidden"

};



function ChangePassword() {
    sessionStorage.getItem('name')
    sessionStorage.getItem('email')
    const[newPassword,setNewPassword]=useState("")
    const[currentPassword,setCurrentPassword]=useState("")
    const[Image,setImage]=useState("")
    const [isLoading, setIsLoading] = useState(true);
    let [color, setColor] = useState("#2c4964;");

  
  useEffect(()=>{
  let data = {
 _id:sessionStorage.getItem("_id")
}
ApiServices.singleClient(data)
.then((res) => { 
  console.log('single Loaded',res)
  // console.log("category ID",res.data.data.freelancer.categoryId._id)
  setImage(res.data.data.client.photo)

  })
},[])
     useEffect(()=>{
          setTimeout(() => {
          setIsLoading(false);
        }, 1500);
     })
    const handleForm=(e)=>{
      e.preventDefault();
    
    let data = {
       _id:sessionStorage.getItem('_id'),
       newPassword:newPassword,
       currentPassword:currentPassword
  
       
    }
    ApiServices.changePassword(data)
    .then(
      (res)=>{
        toast(res.data.message)
      //   nav("/managetype")
      setNewPassword("")
      setCurrentPassword("")
      }
    ).catch((error)=>{
      console.log(error);
    })
  }
  return (
    <>
    {isLoading &&(
    <ClipLoader
    color={color}
    loading={isLoading}
    cssOverride={override}
    size={100}
    aria-label="Loading Spinner"
    data-testid="loader"
  />
  )}
  {!isLoading &&(
    <>
<div className="container" data-aos="fade-up">
<div className="section-header mt-4">
<h2>My Profile</h2>
</div>
</div>

<section id="contact" className="contact">
    <div className="container" data-aos="fade-up">
      <div className="row gx-lg-0 gy-4">


        <center>
      <div className="col-lg-12 w-50">
          <form
            className="php-email-form"
            onSubmit={handleForm}
          >
      <center>
              <img src={BASE_URL+Image} width={200} className='mb-4'/></center>
            <div className="row">
              <div className="col-md-12 form-group">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  placeholder="name"
                  required=""
                  value={sessionStorage.getItem('name')} 
                  readOnly
                />
              </div>
              <div className="col-md-12 form-group mt-3 mt-md-0">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="email"
                  required=""
                  value={sessionStorage.getItem('email')} 
                  readOnly
                />
              </div>
              <div className="col-md-12 form-group mt-3 mt-md-0">
                <input
                  type="password"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="current password"
                  required=""
                  value= {currentPassword}
                  onChange={(e)=>{setCurrentPassword(e.target.value)}}
                />
              </div>
              <div className="col-md-12 form-group mt-3 mt-md-0">
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="New Password"
                  required=""
                  value= {newPassword}
                  onChange={(e)=>{setNewPassword(e.target.value)}}
                />
              </div>
            </div>
            <div className="text-center">
              <button type="submit">Update Password</button>
            </div>
          </form>
        </div>
        </center> 
      </div>
   </div>
  </section>
   
    </>
)}
</>
  )
}

export default ChangePassword