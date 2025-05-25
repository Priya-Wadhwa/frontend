import React from 'react'

function Home() {
  return (
    <>
    {/* ======= Hero Section ======= */}
    <section id="hero" className="hero">
      <div className="container position-relative">
        <div className="row gy-5" data-aos="fade-in">
          <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start">
            <h2>
              Welcome to <span>DevHunt</span>
            </h2>
            <p>Join our vibrant community of buyers and sellers to connect with fellow enthusiasts!!
            we've got everything you need to embark on your bidding journey with confidence.
            </p>
            
          </div>
          <div className="col-lg-6 order-1 order-lg-2">
            <img
              src="assets/img/hero-img.svg"
              className="img-fluid"
              alt=""
              data-aos="zoom-out"
              data-aos-delay={100}
            />
          </div>
        </div>
      </div>
      <div className="icon-boxes position-relative">
        <div className="container position-relative">
          <div className="row gy-4 mt-5">
            <div
              className="col-xl-3 col-md-6"
              data-aos="fade-up"
              data-aos-delay={100}
            >
              <div className="icon-box">
                <div className="icon">
                  <i className="bi bi-easel" />
                </div>
                <h4 className="title">
                  <a href="" className="stretched-link">
                    Browse Listings
                  </a>
                </h4>
              </div>
            </div>
            {/*End Icon Box */}
            <div
              className="col-xl-3 col-md-6"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              <div className="icon-box">
                <div className="icon">
                  <i className="bi bi-gem" />
                </div>
                <h4 className="title">
                  <a href="" className="stretched-link">
                    Place Your Bid
                  </a>
                </h4>
              </div>
            </div>
            {/*End Icon Box */}
            <div
              className="col-xl-3 col-md-6"
              data-aos="fade-up"
              data-aos-delay={300}
            >
              <div className="icon-box">
                <div className="icon">
                  <i className="bi bi-patch-check" />
                </div>
                <h4 className="title">
                  <a href="" className="stretched-link">
                    Secure Transactions
                  </a>
                </h4>
              </div>
            </div>
            {/*End Icon Box */}
            <div
              className="col-xl-3 col-md-6"
              data-aos="fade-up"
              data-aos-delay={500}
            >
              <div className="icon-box">
                <div className="icon">
                  <i className="bi bi-command" />
                </div>
                <h4 className="title">
                  <a href="" className="stretched-link">
                    Compete and Win
                  </a>
                </h4>
              </div>
            </div>
            {/*End Icon Box */}
          </div>
        </div>
      </div>
    </section>
    {/* End Hero Section */}
    <main id="main">
      {/* ======= About Us Section ======= */}
      <section id="about" className="about">
        <div className="container" data-aos="fade-up">
          <div className="section-header">
            <h2>About Us</h2>
          </div>
          <div className="row gy-4">
            <div className="col-lg-6">
              <h3>Join us today and discover the excitement of bidding like never before!</h3>
              <img
                src="assets/img/about.jpg"
                className="img-fluid rounded-4 mb-4"
                alt=""
              />
              <p>
              we connect buyers and sellers in an exciting marketplace where bids dictate the price. Whether you're looking to sell unique items or searching for that perfect find, our platform offers a dynamic and engaging environment to make it happen
              </p>
  
            </div>
            <div className="col-lg-6">
              <div className="content ps-0 ps-lg-5">
                <p className="fst-italic">
                Explore a diverse range of products and services listed by our community of sellers.
                we've got everything you need to embark on your bidding journey with confidence!
                </p>
                <ul>
                  <li>
                    <i className="bi bi-check-circle-fill" />With thousands of listings across various categories, you'll always find something new and exciting to bid on.
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill" />Our platform is designed to be easy to use, whether you're a seasoned bidder or new to the concept of online auctions.
                  </li>
      
                </ul>
                <div className="position-relative mt-4">
                  <img
                    src="assets/img/about-2.jpg"
                    className="img-fluid rounded-4"
                    alt=""
                  />
                  <a
                    href="https://www.youtube.com/watch?v=LXb3EKWsInQ"
                    className="glightbox play-btn"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End About Us Section */}
    </main>
  </>
  
  )
}

export default Home