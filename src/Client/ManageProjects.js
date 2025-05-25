import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import ApiServices, { BASE_URL } from '../ApiServices';
import { toast } from 'react-toastify';
import { ClipLoader } from "react-spinners"

const override = {

  margin: "0 auto",
  marginTop: "250px",
  marginBottom: '200px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: "hidden"
};


function ManageProjects() {
  const nav = useNavigate()  //hook must be called outside function
  const [x, setX] = useState(false)
  const [data, setData] = useState([])
  const [image, setImage] = useState({})
  const [imageName, setImageName] = useState("")
  let [color, setColor] = useState("#2c4964;");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ApiServices.manageProject().then((res) => {
      console.log("Result is", res)
      // console.log(res.data.data)
      setData(res.data.data)
    })
      .catch((err) => { console.log(err) })
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [x])
  const changeImage = (e) => {
    // console.log(e.target.value)
    setImageName(e.target.value)
    // console.log(e.target.files[0])
    setImage(e.target.files[0])
  }

  const changeStatus = (id, status) => {
    let data = {
      _id: id,
      status: status
    }
    ApiServices.deleteProject(data)
      .then((res) => {
        toast.success(res.data.message)
        // window.location.reload()
      })
  }

  return (
    <>

      {/* Inline CSS for Table Styling */}
      <style>
        {`
          .table-container {
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            margin-top: 20px;
            background: #fff;
          }

          .table thead {
            background-color: #ECF4D6;
          }

          .table thead th {
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            vertical-align: middle;
          }

          .table tbody td {
            text-align: center;
            vertical-align: middle;
            font-size: 15px;
            padding: 12px 15px;
          }

          .table tbody tr:hover {
            background-color: #E0EFD8;
            cursor: pointer;
          }

          .img-thumbnail {
            border: none;
         
            object-fit: cover;
          }
        `}
      </style>
      {isLoading && (
        <ClipLoader
          color={color}
          loading={isLoading}
          cssOverride={override}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
      {!isLoading && (
        <div>
          <div className="container" data-aos="fade-up">
            <div className="section-header mt-2">
              <h2>Manage Projects</h2>
            </div>
          </div>
          <div className="container mb-4">
            <div className='table-responsive table-container'>
              <table className="table table-bordered table-hover table-striped">
                <thead>
                  <tr>
                    <th>Sno</th>
                    <th>Project Title</th>
                    <th>Attachment</th>
                    <th>Category</th>
                    <th>Technology</th>
                    <th>Duration</th>
                    <th>Discription</th>
                    <th>Budget</th>
                    <th>Edit</th>
                    {/* <td>Change Status</td> */}
                  </tr>
                </thead>
                <tbody>
                  {data.filter(el => el.status === true).map((el, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{el?.name}</td>
                      <td>
                        <img src={BASE_URL + el?.attachment} style={{ height: "100px", width: "100px" }} />
                      </td>
                      <td>{el.categoryId == null ? "Currently Not available!" : el?.categoryId?.name}</td>
                      <td>{el?.technology}</td>
                      <td>{el?.duration}</td>
                      <td style={{ width: '200px' }}>{el?.description}</td>
                      <td>{el?.budget}</td>
                      <td>
                        <button className="btn scrollto text-center" style={{ backgroundColor: "#071952" }} >
                          <Link to={"/client/viewProject/" + el._id} className="text-light">View</Link>
                        </button>
                      </td>


                    </tr>
                  )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ManageProjects