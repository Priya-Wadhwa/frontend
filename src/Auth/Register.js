import React from 'react'
import { useState } from "react"
import ApiServices from '../ApiServices'
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import RegisterHeader from './RegisterHeader'

function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState()
  const [name, setName] = useState()
  const[image,setImage]=useState("")
  const[imageName,setImageName]=useState("")
  const [contact, setContact] = useState()
  const [address, setAddress] = useState()
  const [companyName, setCompanyName] = useState()
  const [country, setCountry] = useState()
  const nav = useNavigate()



  const changeImage=(e)=>{
    console.log(e.target.files[0]);
    setImage(e.target.files[0])
    setImageName(e.target.value)
  }
const Submitted = (e) => { 
    e.preventDefault()
    console.log(e)
    let data = new FormData()
    data.append("name",name)
    data.append("photo",image)
    data.append("password",password)
    data.append("address",address)
    data.append("contact",contact)
    data.append("email",email)
    data.append("country",country)
    data.append("companyName",companyName)


    
    ApiServices.clientRegister(data)
    .then((res) => { 
      console.log(res)
      toast.success(res.data.message);
      nav("/login")

      setContact("");
      setEmail("");
      setAddress("");
      setCountry("");
      setPassword("");
      setName("");
      setCompanyName("")
    }
)
}

  return (
    <>
    <RegisterHeader/>
    <section id="hero" className="hero">
      <div className="container position-relative">
        <div className="row gy-5" data-aos="fade-in">
          <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start">
          <h2>
              Welcome to <span>DevHunt</span><br></br>
              Register Yourself:)
            </h2>
            
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
      <div className="row gx-lg-0">
        <center>
      <div className="col-lg-12 ">
          <form
            onSubmit={Submitted}
            className="php-email-form"
          >
            <div className="row">
              <div className="col-md-6 form-group">
                <input
                    type="file"
                    className="form-control"
                    id="profile"
                    placeholder="Photo  "
                    onChange={changeImage} value={imageName}
                    />

              </div>
              <div className="col-md-6 form-group mt-3 mt-md-0">
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="Name"
                  required=""
                  value={name} onChange={(e) => { setName(e.target.value) }} />

              
              </div>
              <div className="col-md-6 form-group mt-3 mt-md-0">
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="Company Name"
                  required=""
                  value={companyName} onChange={(e) => { setCompanyName(e.target.value) }} />

              
              </div>
              <div className="col-md-6 form-group mt-3 mt-md-0">
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="Country"
                  required=""
                  value={country} onChange={(e) => { setCountry(e.target.value) }}
                />
              </div>
              <div className="col-md-6 form-group mt-3 mt-md-0">
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="Address"
                  required=""
                  value={address} onChange={(e) => { setAddress(e.target.value) }}
                />
              </div>
              <div className="col-md-6 form-group mt-3 mt-md-0">
                <input
                  type="tel"
                  className="form-control"
                  name="email"
                  id="email"
                  maxLength={10}
                  minLength={10}
                  placeholder="Contact"
                  required=""
                  value={contact} onChange={(e) => { setContact(e.target.value) }}
                />
              </div>
              <div className="col-md-6 form-group mt-3 mt-md-0">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="email"
                  required=""
                  value={email} onChange={(e) => { setEmail(e.target.value) }}
                  
                />
              </div>
              <div className="col-md-6 form-group mt-3 mt-md-0">
                <input
                  type="password"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="password"
                  required=""
                  value={password} onChange={(event) => { setPassword(event.target.value) }}
                />
              </div>
            </div>
            <div className="text-center">
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
        </center> 
      </div>
   </div>
  </section>

</>

  </section>
</>
  )
}

export default Register