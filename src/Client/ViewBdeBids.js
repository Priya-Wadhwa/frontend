import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Link, useParams } from "react-router-dom"
import ApiServices, { BASE_URL } from "../ApiServices"
import { ClipLoader } from "react-spinners"
// import "./Type.css"
const override = {

  margin: "0 auto",
  marginTop: "150px",
  marginBottom: '200px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: "hidden"
};


export default function ViewBdeBids() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([])
  const [final, setFinal] = useState(false)
  let [color, setColor] = useState("#2c4964");

  const { id } = useParams()

  useEffect(() => {
    let data = {
      projectId: id
    }
    ApiServices.clientViewBid(data)
      .then((res) => {
        console.log(res)
        setData(res.data.data)
      }).catch((err) => {
        console.log(err);
      })
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [final])

  const changebookingStatus = (id, status) => {
    let data1 = {
      _id: id,
      status: status
    }
    let declineArray = data?.filter((el) => {
      if (el._id != id) {
        return el;
      }
    });
    let declineArrayId = declineArray?.map((el) => {
      return el._id
    })
    ApiServices.BidChangeStatus(data1)
      .then((res) => {
        toast.success(res.data.message)
        if (res.data.success == true) {

          for (let declineId of declineArrayId) {
            let dataDecline = {
              _id: declineId,
              status: "Declined"
            }
            ApiServices.BidChangeStatus(dataDecline)
              .then((res) => {
                setFinal(true)
              })

          }
        } setFinal(false)
      })
  }

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
              <div className="table-resposive table-container">
                {data && data.length > 0 ? (

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
                        <th className="text-center">Action</th>
                        {/* <td>Change Status</td> */}
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
                            <td>{el.freelancerId.email},{el.freelancerId.name}</td>
                            {/* <td>{el.clientId?.name},{el.clientId?.email}</td> */}
                            <td>
                              {el.status === "Pending" ? (
                                <span className="badge rounded-pill text-bg-info px-3 py-2" style={{ fontSize: "0.9rem" }}>
                                  Pending
                                </span>
                              ) : el.status === "Approved" ? (
                                <span className="badge rounded-pill text-bg-success px-3 py-2" style={{ fontSize: "0.9rem" }}>
                                  Approved
                                </span>
                              ) : el.status === "Declined" ? (
                                <span className="badge rounded-pill text-bg-danger px-3 py-2" style={{ fontSize: "0.9rem" }}>
                                  Declined
                                </span>
                              ) : (
                                <span className="badge rounded-pill text-bg-secondary px-3 py-2" style={{ fontSize: "0.9rem" }}>
                                  {el.status}
                                </span>
                              )}
                            </td>

                            <td>

                              {el.status === "Approved" && (
                                <button className="btn" style={{ margin: '0 auto' }}>Bid approved</button>

                              )}
                              {el.status === "Declined" && (
                                <button className="btn">Bid Declined</button>

                              )}

                              {el.status === "Pending" && (

                                <center>
                                  <button className="btn bg-success" onClick={() => { changebookingStatus(el?._id, "Approved") }} style={{ width: 'auto' }}>Approve</button>
                                </center>)}


                            </td>

                          </tr>
                        )
                      )}
                    </tbody>
                  </table>) : (
                  <p className="text">Currently no bids available!</p> // Render this message when data is empty
                )}
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  )
}
