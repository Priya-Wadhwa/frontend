import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import ApiServices, {BASE_URL} from '../ApiServices';
import { toast } from 'react-toastify';
import {ClipLoader} from "react-spinners"

const override= {

    margin: "0 auto",
    marginTop: "150px",
    marginBottom: '200px',
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow:"hidden"
  };

function ViewSingleProject() {
  const param=useParams()
  console.log(param);
  const id=param.id 
  // console.log("Id is :",id)
  const [name,setName]=useState("")
  const [budget,setBudget]=useState("")
  const [technology,setTechnology]=useState("")
  const [description,setDescription]=useState("")
  const [duration,setDuration]=useState("")
  const[department,setDepartment]=useState("")
  const [allDepartment,setAllDepartment]=useState([])
  const [image,setImage]=useState({})
  const [imageName,setImageName]=useState("")
  const [previousImage,setPreviousImage]=useState("")
  let [color, setColor] = useState("#2c4964;");
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(()=>{
    let data={
        _id:id
        
    }
    console.log("Data is:",data)
        ApiServices.singleProject(data).then((res)=>{
            console.log("Category result is :",res);
 
            setName(res.data.data.name)
            setDepartment(res.data.data.categoryId.name)
            // console.log(res.data.data.categoryId._id)
            setDescription(res.data.data.description)
            setDuration(res.data.data.duration)
            setBudget(res.data.data.budget)
            setTechnology(res.data.data.technology)

            setPreviousImage(res.data.data.attachment)
           //  setCategoryId(res.data.data?.categoryId?._id)
        }).catch((err)=>{
            console.log(err);
        })
        setTimeout(() => {
         setIsLoading(false);
       }, 1500);
       
   },[])

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
        <h2>Single Project Loaded</h2>
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
          >
            <div className="row">

            <center>
              <img src={BASE_URL+previousImage} width={200} className='mb-4'/></center>

              <div className="col-md-6 form-group">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  placeholder="Project Title"
                  required=""
                  value={name} />
          
              </div>
              <div className="col-md-6 form-group mt-3 mt-md-0">
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="technology"
                  required=""
                  value={technology} />
              
              </div>
              <div className="col-md-6 form-group mt-3 mt-md-0">
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="Duration"
                  required=""
                  value={duration}/>
                
              </div>
              <div className="col-md-6 form-group mt-3 mt-md-0">
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="Duration"
                  required=""
                  value={department}/>
                
              </div>
              <div className="col-md-6 form-group mt-3 mt-md-0">
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="Budget"
                  required=""
                  value={budget}/>
              </div>
              <div className="col-md-6 form-group mt-3 mt-md-0">
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="Description"
                  required=""
                  value={description}/>

              </div>
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

export default ViewSingleProject