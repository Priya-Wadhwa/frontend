import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
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

function UpdateBids() {
  const [isLoading, setIsLoading] = useState(true);
  let [color] = useState("#2c4964");

  const [budget, setBudget] = useState("");
  const [technology, setTechnology] = useState("");
  const [name, setName] = useState("");
  const [client, setClient] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [freelancerDuration, setFreelancerDuration] = useState("");
  const [description, setDescription] = useState("");
  const [freelancerDescription, setFreelancerDescription] = useState("");
  const [previousImage, setPreviousImage] = useState("");
  const [poc, setPoc] = useState("");
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");

  const nav = useNavigate();
  const { id } = useParams();

  const changeImage = (e) => {
    setImageName(e.target.value);
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    ApiServices.viewSingleBid({ _id: id }).then((res) => {
      const data = res.data.data;
      setClient(data.clientId._id);
      setPreviousImage(data.projectId.attachment);
      setBudget(data.projectId.budget);
      setDuration(data.projectId.duration);
      setDescription(data.projectId.description);
      setTechnology(data.projectId.technology);
      setName(data.projectId.name);
      setFreelancerDescription(data.description);
      setFreelancerDuration(data.duration);
      setBidAmount(data.bidAmount);
      setPoc(data.poc);
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [id]);

  const Submitted = (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("_id", id);
    data.append("duration", freelancerDuration);
    data.append("freelancerId", sessionStorage.getItem("_id"));
    data.append("clientId", client);
    data.append("projectId", id);
    data.append("bidAmount", bidAmount);
    data.append("description", freelancerDescription);
    data.append("poc", image);

    ApiServices.updateBid(data)
      .then((res) => {
        toast.success(res.data.message);
        nav("/viewBids");
      })
      .catch((err) => {
        toast.error(err.data.message);
      });
  };

  return (
    <>
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
        <section className="update-section">
          <div className="container mt-5 mb-5">
            <h2 className="text-center mb-4">Update Your Bid</h2>
            <div className="row gx-5 gy-4">
              {/* Project Info Card */}
              <div className="col-md-6">
                <div className="card shadow-sm">
                  <img
                    src={BASE_URL + previousImage}
                    alt="Project"
                    className="project-img"
                  />
                  <div className="project-details mt-3">
                    <h4 className="project-title">{name?.toUpperCase()}</h4>
                    <div className="detail-row">
                      <span className="label">📝 Description:</span>
                      <span>{description}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">💻 Technology:</span>
                      <span>{technology}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">💰 Budget:</span>
                      <span>{budget}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">&nbsp;⏱  Duration:</span>
                      <span>{duration}</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Update Form */}
              <div className="col-md-6">
                <div className="card shadow-sm">
                  {poc && (
                    <img
                      src={BASE_URL + poc}
                      alt="POC Preview"
                      className="project-img"
                      style={{ maxHeight: "240px" }}
                    />
                  )}
                  <form onSubmit={Submitted}>
                    <div className="mb-3">
                      <label className="form-label">Bid Amount</label>
                      <input
                        type="text"
                        className="form-control"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Duration</label>
                      <input
                        type="text"
                        className="form-control"
                        value={freelancerDuration}
                        onChange={(e) => setFreelancerDuration(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={freelancerDescription}
                        onChange={(e) => setFreelancerDescription(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Upload POC</label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={changeImage}
                      />
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn update-btn">
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Styling */}
      <style jsx>{`
        .update-section {
          background-color: #f0f4f8;
          padding: 50px 0;
          min-height: 100vh;
        }

        .card {
          background-color: white;
          border-radius: 16px;
          padding: 25px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          height: 100%;
        }

        .project-img {
          width: 100%;
          height: 250px;
          object-fit: cover;
          border-radius: 12px;
          margin-bottom: 20px;
        }

        .update-btn {
          background-color: #2c4964;
          color: white;
          padding: 10px 35px;
          border: none;
          border-radius: 30px;
          font-weight: 500;
          font-size: 16px;
          transition: background-color 0.3s ease;
        }

        .update-btn:hover {
          background-color: #1e3448;
        }

        .form-label {
          font-weight: 600;
          margin-bottom: 6px;
        }

        .form-control {
          padding: 10px 12px;
          font-size: 15px;
          border-radius: 8px;
          border: 1px solid #ccc;
          margin-bottom: 15px;
        }

        textarea.form-control {
          resize: none;
        }

        h2.text-center {
          font-weight: 700;
          color: #2c4964;
          margin-bottom: 35px;
        }

        h4 {
          color: #333;
          font-weight: 700;
        }

        strong {
          color: #2c4964;
        }

        .row.gx-5 > .col-md-6 {
          display: flex;
          flex-direction: column;
          justify-content: stretch;
        }
          .project-details {
           font-size: 16px;
           line-height: 1.8;
           display: flex;
           flex-direction: column;
           gap: 10px;
        }
       .project-title {
         font-weight: 700;
         color: #2c4964;
         margin-bottom: 20px;
         text-transform: uppercase;
         font-size: 20px;
        }
        .detail-row {
         display: flex;
         align-items: flex-start;
         gap: 8px;
        }
       .detail-row .label {
         min-width: 120px;
         font-weight: 600;
         color: #2c4964;
        }
      `}</style>
    </>
  );
}

export default UpdateBids;
