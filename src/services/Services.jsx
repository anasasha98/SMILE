import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Services.css";
import serviceData from '../assets/data/serviceData';
import { motion } from "framer-motion";
const Services = () => {
  return (
    <section className="service_sec ">
      <Container >
        <Row >
        
        {
            serviceData.map((item , index)=>(
                <Col lg={4} md={6}  key={index}>
            <motion.div whileHover={{scale : 1.1}} className="card mb-3" style={{ backgroundColor:`${item.bg}` }}>
              <div className="card-body">
                <span>
                  <i className={item.icon}></i>
                </span>
                <div>
                  {" "}
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-text">
                  {item.subtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          </Col>
            )
            
            )
        }
         
       
       
        </Row>
      </Container>
    </section>
  );
};

export default Services;
