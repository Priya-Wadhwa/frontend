import { useEffect, useState } from "react"
import ApiServices from "../ApiServices"
import { Link,Navigate } from "react-router-dom";
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

function Dashboard() {

  const [isLoading, setIsLoading] = useState(true);
  const [clients,setClients]=useState([])
  const [category,setCategory]=useState([])
  const [freelancers,setFreelancers]=useState([])
  const [projects,setProjects]=useState([])
  let [color, setColor] = useState("#2c4964");

  useEffect(()=>{
      let data = {
          status:sessionStorage.getItem.data
      }
      ApiServices.dashboard(data)
      .then((res)=>{
          console.log(res)

          setClients(res.data.totalClients)
          setFreelancers(res.data.totalfreelancers)
          setProjects(res.data.totalProjects)
          setCategory(res.data.totalCategory)

     


          
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

    <>
    <h1  className="text-center" style={{marginTop:'3%'}}>Dashboard</h1>
    <div className='container'>
    <div class="row my-5 g-5" style={{boxShadow:'20px 20px 20px grey'}} >
    <div  class="col-sm-6" >
      <div class="card" style={{borderLeft:'20px solid #ECF4D6'}}>
        <div class="card-body">
          <h5 class="card-title">Total Clients</h5>
          <p class="card-text">{clients}</p>
        </div>
      </div>
    </div>

    <div  class="col-sm-6" >
      <div class="card" style={{borderLeft:'20px solid #ECF4D6'}}>
        <div class="card-body">
          <h5 class="card-title">Total Categories</h5>
          <p class="card-text">{category}</p>
        </div>
      </div>
    </div>

    <div  class="col-sm-6" >
      <div class="card" style={{borderLeft:'20px solid #ECF4D6'}}>
        <div class="card-body">
          <h5 class="card-title">Total Freelancers</h5>
          <p class="card-text">{freelancers}</p>
        </div>
      </div>
    </div>

    <div  class="col-sm-6" >
      <div class="card" style={{borderLeft:'20px solid #ECF4D6'}}>
        <div class="card-body">
          <h5 class="card-title">Total Projects</h5>
          <p class="card-text">{projects}</p>
        </div>
      </div>
    </div>

    </div>
    </div>
    </>
  )}
    </>
  )
}

export default Dashboard