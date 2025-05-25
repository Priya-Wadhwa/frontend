import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import ApiServices, {BASE_URL} from '../ApiServices';
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


function AddProject() {

  const [projectTitle, setProjectTitle] = useState("")
  const [technology, setTechnology] = useState("")
  const [duration, setDuration] = useState()
  const [description, setDescription] = useState()
  const[department,setDepartment]=useState("")
  const [allDepartment,setAllDepartment]=useState([])
  const [budget, setBudget] = useState()
  const[image,setImage]=useState("")
  const[imageName,setImageName]=useState("")
  let [color, setColor] = useState("#2c4964;");
const [isLoading, setIsLoading] = useState(true);


  const nav = useNavigate()
  const changeImage=(e)=>{
      console.log(e.target.files[0]);
      setImage(e.target.files[0])
      setImageName(e.target.value)
    }

    useEffect(()=>{
  
      ApiServices.manageDepartment()
      .then((data)=>{
        // console.log(data);
        console.log("category data",data.data.data);
        setAllDepartment(data.data.data);
      })
      .catch((err)=>{
          console.log(err);
      })
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      
    },[])

    const Submitted=(e)=>{
      e.preventDefault()
      let obj ={
        Authorization:sessionStorage.getItem("token")
      }
      console.log("obj is:",obj)
      let data=new FormData()
      data.append("name",projectTitle)
      data.append("clientId",sessionStorage.getItem('_id'))
      data.append("attachment",image)
      data.append("categoryId",department)
      data.append("budget",budget)
      data.append("technology",technology)
      data.append("duration",duration)
      data.append("description",description)

      ApiServices.addProject(data).then(
        (res)=>{
  
          console.log(res)
          toast.success(res.data.message);
          setBudget("");
          setDescription("");
          setDepartment('')
          setProjectTitle("");
          setDuration("");
          setProjectTitle("");
          setTechnology("")
          setImageName("")
          setImage({})
        }
      ).catch(
        (err)=>{
          console.log(err);
          toast.error(err.message)
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
        <h2>Add Project</h2>
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
              <div className="col-md-6 form-group">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  placeholder="Project Title"
                  required=""
                  value={projectTitle} onChange={(e) => { setProjectTitle(e.target.value) }} />
          
              </div>
              <div className="col-md-6 form-group mt-3 mt-md-0">
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="technology"
                  required=""
                  value={technology} onChange={(e) => { setTechnology(e.target.value) }} />
              
              </div>
              <div className="col-md-6 form-group mt-3 mt-md-0">
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="Duration"
                  required=""
                  value={duration} onChange={(e) => { setDuration(e.target.value) }} />
                
              </div>
              <div className="col-md-6 form-group mt-3 mt-md-0">
              <select value={department} onChange={(e)=>{setDepartment(e.target.value)}} className="form-select" >
                    <option value={""} hidden selected>Select one</option>
                    {
                      allDepartment?.map((el)=>(
                        <option value={el._id} >{el.name}</option>
                      ))
                    }
                </select>
              </div>
              <div className="col-md-6 form-group mt-3 mt-md-0">
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="Budget"
                  required=""
                  value={budget} onChange={(e) => { setBudget(e.target.value) }} />
              </div>
              <div className="col-md-6 form-group mt-3 mt-md-0">
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="Description"
                  required=""
                  value={description} onChange={(e) => { setDescription(e.target.value) }} />

              </div>
              <div className="col-md-12 form-group mt-3 mt-md-0">
                <input
                  type="file"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="attachment"
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

export default AddProject