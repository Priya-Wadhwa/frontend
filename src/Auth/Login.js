import React from 'react'
import LoginHeader from './LoginHeader'
import { useState } from "react"
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom";
import ApiServices from '../ApiServices';



function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState()
  const nav = useNavigate()

  const Submitted = (e) => { 
    e.preventDefault()
    console.log(e)
    let data = {
      email: email,
      password: password
    }
    ApiServices.login(data)
      .then((res) => { 
        console.log(res)

        if (res.data.success) {
          if(res.data.data.user.userType === 1){
          sessionStorage.setItem("token", res.data.token)
          sessionStorage.setItem("_id", res.data.data._id)
          sessionStorage.setItem("data", JSON.stringify(res.data.data))
          toast.success(res.data.message)
          nav("/admin")
         
        } // for client
        else if(res.data.data.user.userType === 2){
          sessionStorage.setItem("token", res.data.token)
          sessionStorage.setItem("_id", res.data.data.user._id)
          // sessionStorage.setItem("userId", res.data.data.userId)
          sessionStorage.setItem("email", res.data.data.user.email)
          sessionStorage.setItem("name", res.data.data.user.name)
          sessionStorage.setItem("data", JSON.stringify(res.data.data))
          toast.success(res.data.message)
          nav("/client")

        }// for frelancer
        else if(res.data.data.user.userType === 3){
          sessionStorage.setItem("token", res.data.token)
          sessionStorage.setItem("_id", res.data.data.user._id) 
          // sessionStorage.setItem("_id", res.data.data.categoryId._id) 
          sessionStorage.setItem("email", res.data.data.user.email)
          sessionStorage.setItem("name", res.data.data.user.name)
          sessionStorage.setItem("data", JSON.stringify(res.data.data))
          toast.success(res.data.message)
          nav("/")
        }
    
      }  
        else {
          toast.error(res.data.message)
        }
    }
      ).catch((error)=>{
        toast.error("Something went wrong!! Try again later!!")
      })
      
  }
      
  
  return (
    <>
    <LoginHeader/>
    <section id="hero" className="hero">
      <div className="container position-relative">
        <div className="row gy-5" data-aos="fade-in">
          <div className="col-lg-6 order-2 d-flex flex-column justify-content-center text-center text-lg-start" style={{marginTop:"-5%"}}>
            <h2>
              Welcome to <span>DevHunt</span><br></br>
              Login
            </h2>
             {/* <h3 className='text-center'>Login</h3> */}

          </div>
          <div className="col-lg-6 order-1 order-lg-2">
            <img
              src="assets/img/hero-img.svg"
              className="img-fluid"
              alt=""
              data-aos="zoom-out"
              data-aos-delay={100}
            />
          </div>
        </div>
      </div>
    <>
    <section id="contact" className="contact">
    <div className="container" data-aos="fade-up"> 
    <center>
      <div className="row gx-lg-0" style={{width:'70%'}}>
       
      <div className="col-lg-12">
          <form
            onSubmit={Submitted}
            className="php-email-form"
          >
            <div className="row">
              <div className="col-md-12 form-group">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  placeholder="email"
                  required=""
                  onChange={(e) => { setEmail(e.target.value)}}
                />
              </div>
              <div className="col-md-12 form-group mt-3 mt-md-0">
                <input
                  type="password"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="password"
                  required=""
                  onChange={(event) => { setPassword(event.target.value) }}
                />
              </div>
            </div>
            <div className="text-center">
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
       
      </div> 
      </center> 
   </div>
  </section>
</>

  </section>
</>
  )
}

export default Login