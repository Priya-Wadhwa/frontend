import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import ApiServices, {BASE_URL} from '../../ApiServices';
import { toast } from 'react-toastify';
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

function UpdateCategory() {
  const param=useParams()
  console.log(param);
  const id=param.id 
  // console.log("Id is :",id)
  const [name,setName]=useState("")
  const [image,setImage]=useState({})
  const [imageName,setImageName]=useState("")
  const [previousImage,setPreviousImage]=useState("")
  let [color, setColor] = useState("#2c4964;");
  const [isLoading, setIsLoading] = useState(true);


  useEffect(()=>{
    let data={
        _id:id
        
    }
    console.log("Data is:",data)
        ApiServices.singleDepartment(data).then((res)=>{
            console.log("Category result is :",res);
 
            setName(res.data.data.name)
            // console.log("category Id  is:",res.data.data?.catgoryId?._id)
            setPreviousImage(res.data.data.photo)
           //  setCategoryId(res.data.data?.categoryId?._id)
        }).catch((err)=>{
            console.log(err);
        })
        setTimeout(() => {
         setIsLoading(false);
       }, 1500);
       
   },[])
   const changeImage=(e)=>{
    setImageName(e.target.value)
    setImage(e.target.files[0])
   }
   const nav=useNavigate()
   const Submitted=(e)=>{
     e.preventDefault();
     let data=new FormData()
     data.append("_id",id)
     data.append("name",name)
     data.append("photo",image)
     // data.append("subcategory_image",image)
     // data.append("categoryId",categoryId)
 
     ApiServices.updateDepartment(data).then((res)=>{
         toast.success(res.data.message)
         nav("/admin/manageCategory")
     }).catch((err)=>
        toast.error(err.data.message))
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
        <h2>Update Category</h2>
      </div>
    </div>
    <>
  <section id="contact" className="contact">
    <div className="container" data-aos="fade-up">
      <div className="row gx-lg-0 gy-4">
        <center>
      <div className="col-lg-12 w-50">
          <form
            onSubmit={Submitted}
            className="php-email-form"
          >
            <div className="row">
              
            <center>
              <img src={BASE_URL+previousImage} width={200}/></center>

              <div className="col-md-12 form-group mt-4">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  placeholder="name"
                  required=""
                  value={name} onChange={(e) => { setName(e.target.value) }} />
                  
                
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
              <button type="submit">Update</button>
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

export default UpdateCategory