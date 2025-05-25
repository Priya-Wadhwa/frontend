import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ApiServices, { BASE_URL } from "../../ApiServices";
import { ClipLoader } from "react-spinners";

const override = {
  margin: "0 auto",
  marginTop: "250px",
  marginBottom: "200px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
};

export default function ViewProjects() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  let [color, setColor] = useState("#2c4964");

  useEffect(() => {
    ApiServices.viewProjects({})
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {/* Table Styling */}
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
            border-radius: 12px;
            object-fit: cover;
          }

          .btn-view {
            background-color: #071952;
            color: white;
            border: none;
            padding: 8px 14px;
            border-radius: 6px;
            font-size: 14px;
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
        <div className="container" data-aos="fade-up">
          <div className="section-header mt-2">
            <h2>All Projects</h2>
          </div>

          <div className="container mb-4">
            <div className="table-responsive table-container">
              <table className="table table-bordered table-hover table-striped">
                <thead>
                  <tr>
                    <th>Sno</th>
                    <th>Project Name</th>
                    <th>Attachment</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Budget</th>
                    <th>Technology</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {data?.map((el, index) => (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#ECF4D6" : "#ffffff" }}>
                      <td>{index + 1}</td>
                      <td>{el.name}</td>
                      <td>
                        <img
                          src={BASE_URL + el.attachment}
                          height="100"
                          width="100"
                          className="img-thumbnail"
                          alt="attachment"
                        />
                      </td>
                      <td style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {el.description}
                      </td>
                      <td>{el.duration}</td>
                      <td>{el.budget}</td>
                      <td>{el.technology}</td>
                      <td>{el.categoryId?.name}</td>
                      <td>{el.status === true ? "Active" : el.status === false ? "Inactive" : "Unknown"}</td>
                      <td>
                        <Link to={`/admin/projectDetail/${el._id}`}>
                          <button className="btn btn-view">
                            View
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
