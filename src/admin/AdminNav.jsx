import React from "react";
import { Row, Container,  Navbar, Badge } from "react-bootstrap";
import useAuth from "../custom-hooks/useAuth";
import { motion } from "framer-motion";
import userIcon from '../assets/images/user-icon.png'
import '../styles/admin-nav.css'
import { NavLink } from "react-router-dom";
const admin_nav = [
    {
        display:'Dashboard',
        path:'/dashboard',
    },
    {
        display:'All-Product',
        path:'/dashboard/allProduct',
    },
    {
        display:'Orders',
        path:'/dashboard/orders',
    },
    {
        display:'Users',
        path:'/dashboard/users',
    },

]

const AdminNav = () => {
    const {currentUser} =useAuth();

  return (
    <>
    <header className="admin_header">
      <div className="admin_nav-top">
        <Container>
          <div className="admin_nav-wrapper-top d-flex ">
            <Navbar.Brand>
              {" "}
              <i className="fa-solid fa-shop me-2 text-primary"></i>{" "}
              <strong>SMILE SHOP</strong>
            </Navbar.Brand>
            <div className="ms-auto d-none d-lg-block ">
              <div className="input-group">
                <span className="border-primary input-group-text bg-primary text-white">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-primary"
                  style={{ color: "#7a7a7a" }}
                />
                <button className="btn btn-primary text-white">Search</button>
              </div>
            </div>
            <div className="admin_nav-top-right">
                <span><i className="fa-regular fa-bell">
                <Badge color="danger">1</Badge>
                </i></span>
                <span><i className="fa-solid fa-gear"></i>
                
                </span>
                <div className="nav-link " > <motion.img
                      whileHover={{ scale: 1.1 }}
                      src={currentUser ? currentUser.photoURL :  userIcon }
                      alt=""
                      

                    /></div>
            </div>
          </div>
        </Container>
      </div>
    </header>
    <section className="admin_menu p-0">
        <Container>
            <Row>
                <div className="admin_navigate">
                    <ul className="list-group d-flex flex-row admin_menu-list">
                        {
                            admin_nav.map((item,index)=>(
                               <motion.li whileTap={{scale:1.1}} className="list-group-item admin_menu-item" key={index}>
                               <NavLink to={item.path} className={navClass=> navClass.isActive ? 'active_admin-menu': ''}> {item.display} </NavLink>
                               </motion.li>
                            ))
                        }
                    </ul>
                </div>
            </Row>
        </Container>
    </section>
    </>
  );
};

export default AdminNav;
