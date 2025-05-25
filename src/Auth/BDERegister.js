import React from 'react'
import { useState,useEffect } from "react"
import ApiServices from '../ApiServices'
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import RegisterHeader from './RegisterHeader'
import {ClipLoader} from "react-spinners"


const override= {

    margin: "0 auto",
    marginTop: "250px",
    marginBottom: '200px',
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow:"hidden"
  };

function BDERegister() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState()
  const [name, setName] = useState()
  const[image,setImage]=useState("")
  const[imageName,setImageName]=useState("")
  const [contact, setContact] = useState()
  const[department,setDepartment]=useState("")
  const [allDepartment,setAllDepartment]=useState([])
  let [color, setColor] = useState("#2c4964;");
  const [isLoading, setIsLoading] = useState(true);
  const nav = useNavigate()



  useEffect(()=>{
  
    ApiServices.manageDepartment()
    .then((data)=>{
      // console.log(data);
      console.log("data",data.data.data);
      setAllDepartment(data.data.data);
    })
    .catch((err)=>{
        console.log(err);
    })
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
  },[])


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
    data.append("contact",contact)
    data.append("categoryId",department)
    data.append("email",email)




    
    ApiServices.BDEregister(data)
    .then((res) => { 
      console.log(res)
      toast.success(res.data.message);
      let data = {
        email: email,
        password: password
      }
      ApiServices.login(data)
        .then((res) => { 
          console.log(res)
          if(res.data.data.user.userType === 3){
            sessionStorage.setItem("token", res.data.token)
            sessionStorage.setItem("_id", res.data.data.user._id) 
            // sessionStorage.setItem("_id", res.data.data.categoryId._id) 
            sessionStorage.setItem("email", res.data.data.user.email)
            sessionStorage.setItem("name", res.data.data.user.name)
            sessionStorage.setItem("data", JSON.stringify(res.data.data))
            console.log(res.data.message)
            toast.success(res.data.message)
            nav("/")
            }  else {
            toast.error(res.data.message)
          }
        
        
      }).catch((error)=>{
          toast.error(error.data.message)
        })

    }
    ).catch((error)=>{
      toast.error(error.data.message)
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
              <select value={department} onChange={(e)=>{setDepartment(e.target.value)}} className="form-select" >
                    <option value={""} hidden selected>Select Category</option>
                    {
                      allDepartment?.map((el)=>(
                        <option value={el._id} >{el.name}</option>
                      ))
                    }
                </select>
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
  )}
  </>
  )
}

export default BDERegister