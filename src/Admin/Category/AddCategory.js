import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import ApiServices from '../../ApiServices';
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

function AddCategory() {

  const [name,setName]=useState("")
  const [image,setImage]=useState({})
  const [imageName,setImageName]=useState("")
  let [color, setColor] = useState("#2c4964;");
  const [isLoading, setIsLoading] = useState(true);
  const changeImage=(e)=>{
    // console.log(e.target.value)
    setImageName(e.target.value)
    // console.log(e.target.files[0])
    setImage(e.target.files[0])
  }

 useEffect(()=>{
  setTimeout(() => {
    setIsLoading(false);
  }, 1500);
 }
 ,[]
)
  const Submitted=(e)=>{
    e.preventDefault()
    let obj ={
      Authorization:sessionStorage.getItem("token")
    }
    console.log("obj is:",obj)
    let data=new FormData()
    data.append("name",name)
    data.append("photo",image)
    console.log("data is :",data)
    ApiServices.addDepartment(data).then(
      (res)=>{
        console.log("response is:",res)
   
          toast.success(res.data.message)
          setName('')
          setImageName("")
          setImage({})
      }
    ).catch(
      (err)=>{
        console.log(err);
        toast.error(err.data.message)
      }
    )

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
    <section id="services" className="services sections-bg">
    <div className="container" data-aos="fade-up">
      <div className="section-header">
        <h2>Add Category</h2>
      </div>
    </div>
    <>
  <section id="contact" className="contact">
    <div className="container" data-aos="fade-up">
      <div className="row gx-lg-0 gy-4">
        <center>
      <div className="col-lg-12 w-50">
          <form
            className="php-email-form"
            onSubmit={Submitted}
          >
            <div className="row">
              <div className="col-md-12 form-group">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  placeholder="name"
                  required=""
                  value={name} onChange={(e) => { setName(e.target.value) }}
                />
              </div>
              <div className="col-md-12 form-group mt-3 mt-md-0">
                <input
                  type="file"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="image"
                  required=""
                  onChange={changeImage} value={imageName}
                />
              </div>
            </div>
            <div className="text-center">
              <button type="submit">Add</button>
            </div>
          </form>
        </div>
        </center> 
      </div>
   </div>
  </section>

</>
  </section>
       )}
       </>


  )
}

export default AddCategory