import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Link, useNavigate, useParams, Navigate } from "react-router-dom"
import ApiServices, { BASE_URL } from "../../ApiServices"
import { ClipLoader } from "react-spinners"
import Modal from 'react-modal';

const override = {

  margin: "0 auto",
  marginTop: "250px",
  marginBottom: '200px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: "hidden"
};

function AddBids() {
  const [isLoading, setIsLoading] = useState(true);
  let [color, setColor] = useState("#2c4964;");
  const [budget, setBudget] = useState('');
  const [technology, setTechnology] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [client, setClient] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [duration, setDuration] = useState('');
  const [freelancerDuration, setFreelancerDuration] = useState('');
  const [description, setDescription] = useState('');
  const [freelancerDescription, setFreelancerDescription] = useState('');
  const [previousImage, setPreviousImage] = useState("");
  const [image, setImage] = useState("")
  const [imageName, setImageName] = useState("")
  const changeImage = (e) => {
    // console.log(e.target.value)
    setImageName(e.target.value)
    // console.log(e.target.files[0])
    setImage(e.target.files[0])
  }
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []
  )
  const nav = useNavigate()
  const { id } = useParams()
  let project = {
    _id: id
  }
  ApiServices.viewSingleBDEProject(project)
    .then((res) => {
      console.log('single Loaded', res)
      setClient(res.data.data.clientId._id)
      setCategory(res.data.data.categoryId.name)
      setPreviousImage(res.data.data.attachment)
      setBudget(res.data.data.budget)
      setDuration(res.data.data.duration)
      setDescription(res.data.data.description)
      setTechnology(res.data.data.technology)
      setName(res.data.data.name)




    })

  const Submitted = (e) => {
    e.preventDefault()
    let data = new FormData()
    data.append("duration", freelancerDuration)
    data.append("freelancerId", sessionStorage.getItem('_id'))
    data.append("clientId", client)
    data.append("projectId", id)
    data.append("bidAmount", bidAmount)
    data.append("description", freelancerDescription)
    data.append("poc", image)
    console.log("data is :", data)
    ApiServices.addBid(data).then(
      (res) => {
        console.log("response is:", res)

        toast.success(res.data.message)
        nav('/viewBids')
      }
    ).catch(
      (err) => {
        console.log(err);
        toast.error(err.data.message)
      }
    )

  }

  return (
    <>
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
        <section id="services" className="services sections-bg">

          <section id="contact" className="contact">
            <div className="container" data-aos="fade-up">
              <div className="row gx-0 gy-4 ">
                <div className="col-lg-6">
                  <section id="departments" className="departments">
                    <div className="container" data-aos="fade-up">
                      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <div class="card" style={{ width: "100%" }}>
                          <img
                            className="card-img-top"
                            src={BASE_URL + previousImage}
                            alt="Project"
                            style={{
                              width: '100%',
                              height: '300px',
                              objectFit: 'cover',
                              borderRadius: '10px',
                            }}
                          />

                          <div class="card-body">
                            <h5 class="card-title">{name.toUpperCase()}</h5>
                            <p>{description}</p>
                            <p>{technology}</p>
                            <p>{budget}</p>
                            <p>{duration}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
                <div className="col-lg-6">

                  <form className="php-email-form" onSubmit={Submitted}>
                    <div className="container" data-aos="fade-up">
                      <div className="section-header pt-5">
                        <h2>Add Bid</h2>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 form-group">
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          id="name"
                          placeholder="Enter Bid Amount"
                          required=""
                          value={bidAmount} onChange={(e) => { setBidAmount(e.target.value) }}
                        />
                      </div>
                      <div className="col-md-12 form-group">
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          id="name"
                          placeholder="Duration"
                          required=""
                          value={freelancerDuration} onChange={(e) => { setFreelancerDuration(e.target.value) }}
                        />
                      </div>
                      <div className="col-md-12 form-group">
                        <textarea
                          type="text"
                          name="name"
                          className="form-control"
                          id="name"
                          placeholder="Description"
                          required=""
                          value={freelancerDescription} onChange={(e) => { setFreelancerDescription(e.target.value) }}
                        />
                      </div>
                      <div className="col-md-12 form-group mt-3 mt-md-0">
                        <input
                          type="file"
                          className="form-control"
                          name="image"
                          id="image"
                          placeholder="Poc"
                          required=""
                          onChange={changeImage}
                          value={imageName}
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <button type="submit">Add</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </section>
      )}
    </>

  )
}

export default AddBids