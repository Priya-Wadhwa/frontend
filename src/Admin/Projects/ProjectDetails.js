import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import ApiServices, { BASE_URL } from "../../ApiServices";

const override = {
  margin: "0 auto",
  marginTop: "250px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default function ProjectDetail() {
  const [isLoading, setIsLoading] = useState(true);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [technology, setTechnology] = useState("");
  const [postedOn, setPostedOn] = useState("");
  const [name, setName] = useState("");
  const [previousImage, setPreviousImage] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const data = { _id: id };
    ApiServices.viewSingleProject(data)
      .then((res) => {
        const project = res.data.data;
        setClientName(project.clientId.name);
        setClientEmail(project.clientId.email);
        setCategoryName(project.categoryId.name);
        setDuration(project.duration);
        setDescription(project.description);
        setTechnology(project.technology);
        setName(project.name);
        setPreviousImage(project.attachment);
        setPostedOn(project.createdAt);
        setTimeout(() => setIsLoading(false), 1200);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <>
      {isLoading ? (
        <ClipLoader
          color="#2c4964"
          loading={isLoading}
          cssOverride={override}
          size={100}
          aria-label="Loading Spinner"
        />
      ) : (
        <main className="main py-5" style={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
          <section className="container">
            <div className="text-center mb-4">
              <h2 style={{ fontWeight: "bold", fontSize: "2.2rem", color: "#2c4964" }}>
                {name.toUpperCase()}
              </h2>
              <hr style={{ width: "60px", borderTop: "3px solid #2c4964", margin: "10px auto" }} />
            </div>

            <div
              className="mx-auto shadow"
              style={{
                maxWidth: "750px",
                borderRadius: "1rem",
                background: "#fff",
                overflow: "hidden",
              }}
            >
              <div style={{ width: "100%", position: "relative", paddingTop: "56.25%" /* 16:9 aspect ratio */ }}>
                <iframe
                  src={BASE_URL + previousImage}
                  title="project-visual"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                    borderRadius: "1rem 1rem 0 0",
                  }}
                  allowFullScreen
                ></iframe>
              </div>


              <div className="p-4">
                <h5 className="text-uppercase mb-3" style={{ color: "#071952" }}>
                  {categoryName}
                </h5>
                <p className="mb-2">{description}</p>
                <p className="mb-2">
                  <strong>Technology:</strong> {technology.toUpperCase()}
                </p>
                <p className="mb-2">
                  <strong>Duration:</strong> {duration}
                </p>
                <p className="mb-2">
                  <span className="badge bg-dark me-2">Posted On</span>
                  {formatDate(postedOn)}
                </p>
                <p className="mb-0">
                  <span className="badge bg-dark me-2">Posted By</span>
                  {clientName}, {clientEmail}
                </p>
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
}
