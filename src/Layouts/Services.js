import React from 'react'

function Services() {
  return (
    <>
    {/* ======= Our Services Section ======= */}
    <section id="services" className="services sections-bg">
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          <h2>Our Services</h2>
          <p>
           Join us now and discover the endless possibilities of DevHunt!
          </p>
        </div>
        <div className="row gy-4" data-aos="fade-up" data-aos-delay={100}>
          <div className="col-lg-4 col-md-6">
            <div className="service-item  position-relative">
              <div className="icon">
                <i className="bi bi-activity" />
              </div>
              <h3>Fair and Transparent</h3>
              <p>
              We believe in fairness and transparency. Our bidding process is open and competitive, ensuring that everyone has an equal chance to win.
              </p>
  
            </div>
          </div>
          {/* End Service Item */}
          <div className="col-lg-4 col-md-6">
            <div className="service-item position-relative">
              <div className="icon">
                <i className="bi bi-broadcast" />
              </div>
              <h3>Dedicated Support</h3>
              <p>
               Our knowledgeable customer support team is available to assist you with any questions or concerns. Whether you need help with a transaction or guidance on using our platform, we're here to help

              </p>

            </div>
          </div>
          {/* End Service Item */}
          <div className="col-lg-4 col-md-6">
            <div className="service-item position-relative">
              <div className="icon">
                <i className="bi bi-easel" />
              </div>
              <h3>Community Engagement</h3>
              <p>
              Join our vibrant community of buyers and sellers to connect with fellow enthusiasts, share insights, and stay updated on the latest trends in online bidding and auctions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* End Our Services Section */}
  </>
  
  )
}

export default Services