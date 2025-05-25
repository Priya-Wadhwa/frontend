import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import ApiServices, { BASE_URL } from "../../ApiServices"
import { ClipLoader } from "react-spinners"
// import "./Type.css"
const override = {

  margin: "0 auto",
  marginTop: "250px",
  marginBottom: '200px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: "hidden"
};


export default function
  ViewBids() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([])
  let [color, setColor] = useState("#2c4964");

  useEffect(() => {
    let data = {
      freelancerId: sessionStorage.getItem("_id")
    }
    ApiServices.viewBid(data)
      .then((res) => {
        console.log(res)
        setData(res.data.data)
      }).catch((err) => {
        console.log(err);
      })
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [])


  return (
    <>

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
              <h2>All Bids</h2>
            </div>

            <div className="container mb-4">
              {data && data.length > 0 ? (
                <div className="table-responsive table-container">
                  <table className="table table-bordered table-hover table-striped">
                    <thead>
                      <tr>
                        <th>Sno</th>
                        <th>Project Name</th>
                        <th>Technology</th>
                        <th>BidAmount</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Clients Details</th>
                        {/* <th>Posted By</th> */}
                        <th>Status</th>
                        <th>Action</th>
                        {/* <th>Change Status</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map(
                        (el, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{el.projectId.name}</td>
                            <td>{el.projectId.technology}</td>
                            {/* <td><img src={BASE_URL+el.projectId.attachment} height={150} width={150}></img></td> */}
                            <td>{el.bidAmount}</td>
                            <td>{el.description}</td>
                            <td>{el.duration}</td>
                            <td>{el.clientId.email},{el.clientId.name}</td>
                            {/* <td>{el.clientId?.name},{el.clientId?.email}</td> */}
                            <td>{el.status === "Pending" ? (
                              <span style={{ backgroundColor: '#5BBCFF', borderRadius: '5px', height: '35px', padding: '10px' }} class="badge badge-pill badge-info" >Pending</span>
                            ) : el.status === "Approved" ? (
                              <span style={{ backgroundColor: 'green', borderRadius: '5px', height: '35px', padding: '10px' }} class="badge badge-pill badge-info">Approved</span>
                            ) : el.status === "Declined" ? (
                              <span style={{ backgroundColor: 'red', borderRadius: '5px', height: '35px', padding: '10px' }} class="badge badge-pill badge-info">Declined</span>
                            ) : (
                              <span>{el.status}</span>
                            )}
                            </td>
                            <td>
                              {(el.status === "Approved" || el.status === "Declined") && (
                                <button className="btn text-center" style={{ backgroundColor: "rgb(186, 218, 169)" }}>
                                  Edit
                                </button>
                              )}

                              {el.status === "Pending" && (
                                <Link to={'/updateBid/' + el._id}>
                                  <button className="btn text-center text-light" style={{ backgroundColor: "#071952" }}>
                                    Edit
                                  </button>
                                </Link>
                              )}
                            </td>

                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>Currently no bids available!</p> // Render this message when data is empty
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
