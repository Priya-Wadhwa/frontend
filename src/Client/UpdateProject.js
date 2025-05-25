import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import ApiServices, { BASE_URL } from '../ApiServices';
import { toast } from 'react-toastify';
import { ClipLoader } from "react-spinners";

const override = {
  margin: "0 auto",
  marginTop: "150px",
  marginBottom: '200px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: "hidden"
};

function UpdateProject() {
  const param = useParams();
  const id = param.id;

  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [technology, setTechnology] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [department, setDepartment] = useState("");
  const [allDepartment, setAllDepartment] = useState([]);
  const [image, setImage] = useState({});
  const [imageName, setImageName] = useState("");
  const [previousImage, setPreviousImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [color] = useState("#2c4964");

  const nav = useNavigate();

  useEffect(() => {
    ApiServices.manageDepartment()
      .then((data) => {
        setAllDepartment(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  useEffect(() => {
    let data = { _id: id };

    ApiServices.singleProject(data)
      .then((res) => {
        const proj = res.data.data;
        setName(proj.name);
        setDepartment(proj.categoryId._id);
        setDescription(proj.description);
        setDuration(proj.duration);
        setBudget(proj.budget);
        setTechnology(proj.technology);
        setPreviousImage(proj.attachment);
      })
      .catch((err) => {
        console.log(err);
      });

    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const changeImage = (e) => {
    setImageName(e.target.value);
    setImage(e.target.files[0]);
  };

  const Submitted = (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("_id", id);
    data.append("name", name);
    data.append("clientId", sessionStorage.getItem('_id'));
    data.append("attachment", image);
    data.append("categoryId", department);
    data.append("budget", budget);
    data.append("technology", technology);
    data.append("duration", duration);
    data.append("description", description);

    ApiServices.updateProject(data)
      .then((res) => {
        toast.success(res.data.message);
        nav("/client/manageProject");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Update failed");
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
        />
      ) : (
        <section className="py-5" style={{ background: "#f5f5f5", minHeight: "100vh" }}>
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="fw-bold">Update Project</h2>
              <div className="border-bottom mx-auto" style={{ width: "100px", borderBottom: "3px solid teal" }}></div>
            </div>

            <div className="row justify-content-center">
              <div className="col-lg-8 p-4 shadow rounded bg-white">

                {previousImage && (
                  <div className="text-center mb-4">
                    <img
                      src={BASE_URL + previousImage}
                      alt="Attachment Preview"
                      className="img-fluid rounded"
                      style={{
                        width: '100%',
                        maxHeight: '300px',
                        objectFit: 'cover',
                        borderRadius: '12px',
                        overflow: 'hidden',
                      }}
                    />
                  </div>
                )}

                <form onSubmit={Submitted}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Project Name</label>
                      <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Technology</label>
                      <input type="text" className="form-control" value={technology} onChange={(e) => setTechnology(e.target.value)} required />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Duration</label>
                      <input type="text" className="form-control" value={duration} onChange={(e) => setDuration(e.target.value)} required />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Budget</label>
                      <input type="text" className="form-control" value={budget} onChange={(e) => setBudget(e.target.value)} required />
                    </div>

                    <div className="col-md-12">
                      <label className="form-label">Department</label>
                      <select className="form-select" value={department} onChange={(e) => setDepartment(e.target.value)} required>
                        <option value="" disabled>Select Department</option>
                        {allDepartment.map((el, index) => (
                          <option key={index} value={el._id}>{el.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-12">
                      <label className="form-label">Description</label>
                      <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} required />
                    </div>

                    <div className="col-md-12">
                      <label className="form-label">Attachment</label>
                      <input type="file" className="form-control" onChange={changeImage} />
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    <button type="submit" className="btn btn-success px-4 py-2 rounded-pill">Update</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default UpdateProject;
