import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import ApiServices, { BASE_URL } from "../ApiServices";
import { ClipLoader } from "react-spinners";
import "./ViewProject.css"; // Create this file for custom styles

const loaderStyle = {
  margin: "0 auto",
  marginTop: "250px",
  marginBottom: "200px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
};

function ViewProject() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const categoryData = { _id: sessionStorage.getItem("_id") };

    ApiServices.singleFreelancer(categoryData).then((res) => {
      const storedToken = sessionStorage.getItem("token");
      if (!storedToken) {
        toast.error("User not authenticated! Login first");
        navigate("/login");
      } else {
        setCategory(res.data.data?.freelancer.categoryId?.name);
        const data = { categoryId: res.data.data?.freelancer.categoryId?._id };

        ApiServices.viewProject(data)
          .then((result) => {
            setData(result.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <ClipLoader
          color="#2c4964"
          loading={isLoading}
          cssOverride={loaderStyle}
          size={100}
        />
      ) : (
        <section id="projects" className="projects-section py-4">
          <div className="container">
            <div className="section-header text-center mb-4">
              <h2>
                {!category ? "All Projects" : `Projects under ${category}`}
              </h2>
              {/* <div className="section-underline mx-auto mt-2 mb-4"></div> */}
            </div>

            <div className="row g-4 d-flex justify-content-center">
              {data?.filter((el) => el.status === true).map((el, index) => (
                <div className="col-md-6 col-lg-4" key={index}>
                  <div className="card project-card h-100 shadow-sm">
                    <img
                      src={BASE_URL + el?.attachment}
                      className="card-img-top project-img"
                      alt="Project Preview"
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title text-uppercase">{el.name}</h5>
                      <p className="text-muted small mb-1">{el.description}</p>
                      <p><strong>Tech:</strong> {el.technology}</p>
                      <p><strong>Budget:</strong> {el.budget}</p>
                      <p><strong>Duration:</strong> {el.duration}</p>

                      <div className="mt-auto text-center">
                        <Link to={`/addBids/${el._id}`}>
                          <button className="btn btn-dark w-75">Add Bid</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {data?.filter((el) => el.status === true).length === 0 && (
                <p className="text-center">Currently no data available!</p>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default ViewProject;
