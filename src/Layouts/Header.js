import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Header() {
  const nav = useNavigate()
   let token = sessionStorage.getItem('token')
  
  const logout=()=>{
    toast.success("Logout successfully!!!")
    sessionStorage.clear()
    nav("/login")
  }
  return (
    <>
  {/* ======= Header ======= */}
  <section id="topbar" className="topbar d-flex align-items-center">
    <div className="container d-flex justify-content-center justify-content-md-between">
      <div className="contact-info d-flex align-items-center">
        <i className="bi bi-envelope d-flex align-items-center">
          <a href="mailto:contact@example.com">contact@example.com</a>
        </i>
        <i className="bi bi-phone d-flex align-items-center ms-4">
          <span>+91 893322211</span>
        </i>
      </div>
      <div className="social-links d-none d-md-flex align-items-center">
        <a href="#" className="twitter">
          <i className="bi bi-twitter" />
        </a>
        <a href="#" className="facebook">
          <i className="bi bi-facebook" />
        </a>
        <a href="#" className="instagram">
          <i className="bi bi-instagram" />
        </a>
        <a href="#" className="linkedin">
          <i className="bi bi-linkedin" />
        </a>
      </div>
    </div>
  </section>
  {/* End Top Bar */}
  <header id="header" className="header d-flex align-items-center">
    <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
      <a href="index.html" className="logo d-flex align-items-center">
        {/* Uncomment the line below if you also wish to use an image logo */}
        {/* <img src="/assets/img/logo.png" alt=""> */}
        <h1>
          DevHunt<span>.</span>
        </h1>
      </a>
      <nav id="navbar" className="navbar">
        <ul>
          <li>
            <Link to={"/admin"}>
            <a href="#">Home</a>
            </Link>
          </li>
          <li className="dropdown">
            <a href="#">
              <span>Category</span>{" "}
              <i className="bi bi-chevron-down dropdown-indicator" />
            </a>
            <ul>
              <li>
                <Link to={'/admin/addCategory'}>
                <a href="#">Add Category</a>
                </Link>
              </li>
              <li>
                <Link to={'/admin/manageCategory'}>
                <a href="#">Manage Category</a>
                </Link>
              </li>
  
            </ul>
          </li>
          <li>
            <Link to={"/admin/viewProjects"}>
            <a href="#">All Projects</a>
            </Link>
          </li>
          <li>
            <Link to={"/admin/viewBde"}>
            <a href="#">BDE's</a>
            </Link>
          </li>
          <li>
            <Link to={"/admin/Clients"}>
            <a href="#">Clients</a>
            </Link>
          </li>
          <li>
            <Link to={"/admin/viewAllBids"}>
            <a href="#">Bids History</a>
            </Link>
          </li>

          {!token ? (
          <li>
        <Link to={"/login"}>
        <a href="" className="nav-item nav-link">
          Login
        </a>
        </Link>
        </li>
          ):(
        <li>
        <a href="" className="nav-item nav-link" onClick={logout}>
          Logout
        </a>
        </li>
      
        )}


        </ul>
      </nav>
      {/* .navbar */}
      <i className="mobile-nav-toggle mobile-nav-show bi bi-list" />
      <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x" />
    </div>
  </header>
  {/* End Header */}
  {/* End Header */}
</>

  )
}

export default Header