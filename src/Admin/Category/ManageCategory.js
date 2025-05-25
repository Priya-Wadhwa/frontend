import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import ApiServices, { BASE_URL } from '../../ApiServices';
import { toast } from 'react-toastify';
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

function ManageCategory() {
  const nav = useNavigate();
  const [x, setX] = useState(false);
  const [data, setData] = useState([]);
  let [color, setColor] = useState("#2c4964");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ApiServices.manageDepartment()
      .then((res) => {
        console.log("Result is", res);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [x]);

  const changeStatus = (id, status) => {
    let data = {
      _id: id,
      status: status,
    };
    ApiServices.changeStatus(data)
      .then((res) => {
        toast.success(res.data.message);
        setX(true);
      })
    setX(false);
  };

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

          .btn-custom {
            background-color: rgba(41, 171, 135);
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 14px;
          }

          .btn-disable {
            background-color: crimson;
            color: white;
            border: none;
            padding: 8px 12px;
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
        <>
          <div className="container" data-aos="fade-up">
            <div className="section-header mt-2">
              <h2>Manage Category</h2>
            </div>
          </div>

          <div className="container mb-4">
            <div className="table-responsive table-container">
              <table className="table table-bordered table-hover table-striped">
                <thead>
                  <tr>
                    <th>Sno</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Status</th>
                    <th>Edit</th>
                    <th>Change Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((el, index) => (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#ECF4D6" : "#ffffff" }}>
                      <td>{index + 1}</td>
                      <td>{el?.name}</td>
                      <td>
                        <img
                          src={BASE_URL + el?.photo}
                          height="70"
                          width="70"
                          alt="Category"
                          className="img-thumbnail"
                        />
                      </td>
                      <td>
                        {el.status === true ? "Active" : el.status === false ? "Inactive" : "Unknown"}
                      </td>
                      <td>
                        <Link to={`/admin/updateCategory/${el._id}`} className="btn btn-custom">
                          Edit
                        </Link>
                      </td>
                      <td>
                        {el.status === true ? (
                          <button
                            className="btn btn-disable"
                            onClick={() => changeStatus(el?._id, false)}
                          >
                            Disable
                          </button>
                        ) : (
                          <button
                            className="btn btn-custom"
                            onClick={() => changeStatus(el?._id, true)}
                          >
                            Enable
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ManageCategory;
