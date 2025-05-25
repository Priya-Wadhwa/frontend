import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import ApiServices from "../ApiServices";

const override = {
  margin: "0 auto",
  marginTop: "250px",
  marginBottom: "200px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden"
};

export default function ViewBidsAdmin() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [color] = useState("#2c4964");

  useEffect(() => {
    ApiServices.viewBids({})
      .then((res) => {
        console.log("Full Response: ", res.data);

        // Safely get data from nested response
        const responseData = res.data?.data;

        // Ensure it's an array before setting
        if (Array.isArray(responseData)) {
          setData(responseData);
        } else {
          console.warn("Expected an array but got:", responseData);
          setData([]); // fallback to empty array
        }
      })
      .catch((err) => {
        console.error("API error:", err);
        setData([]); // fallback on error
      });

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const allBids = Array.isArray(data) ? data : [];


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
            background-color:#7f0f09;
            cursor: pointer;
          }

          .img-thumbnail {
            border: none;
         
            object-fit: cover;
          }
        `}
      </style>
      {isLoading ? (
        <ClipLoader
          color={color}
          loading={isLoading}
          cssOverride={override}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <div className="container" data-aos="fade-up">
          <div className="section-header mt-2">
            <h2>All Winning Bids</h2>
          </div>

          <div className="container mb-4">
            <div className="table-responsive table-container">
              <table className="table table-bordered table-hover table-striped">
                <thead style={{ backgroundColor: '#ECF4D6' }}>
                  <tr>
                    <th>Sno</th>
                    <th>Project Name</th>
                    <th>Technology</th>
                    <th>Bid Amount</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Freelancer Details</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {allBids.map((el, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{el.projectId?.name || "-"}</td>
                      <td>{el.projectId?.technology || "-"}</td>
                      <td>{el.bidAmount}</td>
                      <td>{el.description}</td>
                      <td>{el.duration}</td>
                      <td>{el.freelancerId ? `${el.freelancerId.email}, ${el.freelancerId.name}` : "-"}</td>
                      <td>
                        <span
                          style={{
                            padding: "5px 10px",
                            borderRadius: "5px",
                            color: "white",
                            backgroundColor:
                              el.status === "Approved"
                                ? "green"
                                : el.status === "Declined"
                                  ? "rgb(185, 32, 32)"
                                  : "#ffc107", // yellow for pending
                          }}
                        >
                          {el.status}
                        </span>
                      </td>

                    </tr>
                  ))}

                  {allBids.length === 0 && (
                    <tr>
                      <td colSpan="8" className="text-center">
                        No Approved Bids Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
