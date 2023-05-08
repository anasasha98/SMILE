import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import './Footer.css'
const Footer = () => {
  return (
    <div className="footer_sec text-center text-lg-start text-muted bg-light">
      <section className="social_sec d-flex justify-content-between justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
         
          <Link to='#' className="me-4 text-reset"><i className="fa-brands fa-facebook"></i></Link>
          <Link to='#' className="me-4 text-reset"><i className="fa-brands fa-instagram"></i></Link>
          <Link to='#' className="me-4 text-reset"><i className="fa-brands fa-linkedin"></i></Link>
          <Link to='#' className="me-4 text-reset"><i className="fa-brands fa-github"></i></Link>
            
          

        
        </div>
      </section>

      <section className="">
        <Container className="text-center text-md-start mt-5">
          <Row className="mt-3">
            <Col md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fa-sharp fa-solid fa-buildings"></i>
                Smiles
              </h6>
              <p>
                Here you can use rows and columns to organize your footer
                content. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit.
              </p>
            </Col>

            <Col md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <Link to="/shop" className="text-reset">
                  Product
                </Link>
              </p>
              <p>
                <Link to="/shop" className="text-reset">
                  Shop
                </Link>
              </p>
              <p>
                <Link to="/login" className="text-reset">
                  Login
                </Link>
              </p>
              <p>
                <Link to="/aboutUs" className="text-reset">
                about us
                </Link>
              </p>
            </Col>

            <Col md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <i className="fa-solid fa-location-dot"></i> Jordan, Amman
              </p>
              <p>
                <i className="fa-solid fa-envelope"></i> info@Smiles.com
              </p>
              <p>
                <i className="fa-solid fa-phone"></i> +962 786659173
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2023 Copyright:
        <a className="text-reset fw-bold" href="#facebook">
          Anas Abdallah Asha{" "}
        </a>
      </div>
    </div>
  );
};

export default Footer;
