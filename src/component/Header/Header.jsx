import React, { useRef, useEffect } from "react";
import { Badge, Navbar } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import userIcon from "../../assets/images/user-icon.png";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import useAuth from "../../custom-hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from 'react-toastify';
const navLink = [
  {
    path: "home",
    display: "Home",
  },
  {
    path: "shop",
    display: "Shop",
  },
  {
    path: "about",
    display: "About Us",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const { currentUser } = useAuth();
  const profileActionRef = useRef(null);

  const stickyHeaderFunction = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky_header");
      } else {
        headerRef.current.classList.remove("sticky_header");
      }
    });
  };

  const logout =()=>{
    signOut(auth).then(()=>{
      toast.success("logged out");
      navigate('/home')
    })
    .catch(error=>{
      toast.error(error.massage)
    })
  }

  useEffect(() => {
    stickyHeaderFunction();

    return () => window.removeEventListener("scroll", stickyHeaderFunction);
  });
  const navigateToCart = () => {
    navigate("/cart");
  };

  const toggleProfileActions = () =>
    profileActionRef.current.classList.toggle("show_profile-actions");

  return (
    <div className="navBar" ref={headerRef}>
      <div className="superNav border-bottom py-2 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 centerOnMobile">
              <select className="me-3 border-0 bg-light">
                <option value="en-us">EN-US</option>
                <option value="en-us" disabled>
                  AR-SA
                </option>
              </select>
              <span className="d-none d-lg-inline-block d-md-inline-block d-sm-inline-block d-xs-none me-3">
                <strong>info@smiles.com</strong>
              </span>
              <span className="me-3">
                <i className="fa-solid fa-phone me-1 text-primary"></i>{" "}
                <strong>+962-786659173</strong>
              </span>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 d-none d-lg-block d-md-block-d-sm-block d-xs-none text-end">
              <span className="me-3">
                <i className="fa-brands fa-facebook   me-2  text-primary "></i>
                <a className="text-muted " href="#Facebook">
                  Facebook
                </a>
              </span>
              <span className="me-3">
                <i className="fa-brands fa-instagram  me-2  text-primary"></i>
                <a className="text-muted" href="#Instagram">
                  Instagram
                </a>
              </span>
              <span className="me-3">
                <i className="fa-brands fa-linkedin me-2  text-primary"></i>
                <a className="text-muted" href="#Linkedin">
                  Linkedin
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
      <Navbar
        bg="light"
        expand="lg"
        className="sticky_header bg-white sticky-top  p-3 shadow-sm"
      >
        <div className="container">
          <Navbar.Brand>
            <Link to="/home">
              {" "}
              <i className="fa-solid fa-shop me-2 text-primary"></i>{" "}
              <strong>SMILE SHOP</strong>
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <ul className="navbar-nav ms-auto ">
              {navLink.map((item, index) => (
                <li className="nav-item" key={index}>
                  <NavLink
                    className="nav-link mx-1 text-uppercase "
                    to={item.path}
                  >
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
            <ul className="navbar-nav ms-auto ">
              <li className="nav-item">
                <NavLink className="nav-link" to="cart">
                  <i className="fa-sharp fa-regular fa-heart"></i>

                  <Badge color="danger">1</Badge>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  onClick={navigateToCart}
                  to="cart"
                >
                  <i className="fa-solid fa-cart-shopping "></i>
                  <Badge color="danger">{totalQuantity}</Badge>
                </NavLink>
              </li>
              <div className="profile">
                {" "}
                <li className="nav-item  ">
                
               
                  <div className="nav-link " > <motion.img
                      whileHover={{ scale: 1.1 }}
                      src={currentUser ? currentUser.photoURL :  userIcon }
                      alt=""
                      onClick={toggleProfileActions}

                    /></div>
                   
                   
                    </li>
                    
                    {/* <p>{currentUser.displayName}</p> */}
                    <div
                      className="profile_actions"
                      ref={profileActionRef}
                      onClick={toggleProfileActions}
                    >
                      {currentUser ? (
                        <span onClick={logout}>logout</span>
                      ) : (
                        <div className="d-flex align-items-center justify-content-center flex-column">
                          <Link to="/signup">Signup</Link>
                          <Link to="/login">Login</Link>
                          <Link to="/dashboard">Dashboard</Link>
                        </div>
                      )}
                    </div>
                  
                
              </div>
            </ul>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default Header;
