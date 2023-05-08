import { motion } from "framer-motion";
import React from "react";
import { Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../../styles/productCard.css";
import { cartAction } from "../../redux/slices/cartSlice";
import {  toast } from 'react-toastify';

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      cartAction.addItem({
        id: item.id,
        productName: item.productName,
        price: item.price,
        imgUrl: item.imgUrl,
        category:item.category,
      })
    );
    toast.success('Product Added Successfully');
  };

  return (
    <Col xs="6" sm="6" md="4" lg="3" className="d-flex">
    
      <div
        className="product_item card my-2"
        style={{
          width: "18rem",
          borderRadius: "8px",
          border: "none",
          color: "",
        }}
      >
      <Link to={`/shop/${item.id}`}>
        <motion.img whileHover={{ scale: 0.9 }} alt="card" src={item.imgUrl} />
</Link>
        <div className="product_title ">
          <div className="d-flex justify-content-between align-items-center">
          
            <h4 className="card-title">
            <Link to={`/shop/${item.id}`}>   {item.productName}</Link>
            </h4>
            
            <motion.span whileTap={{ scale: 1.2 }} onClick={addToCart}>
              <i className="fa-solid fa-plus" ></i>
            </motion.span>
          </div>

          <span className="d-flex justify-content-center text-center d-inline-block">
            {item.category}
          </span>
        </div>

        <div className="product_card-bottom d-flex justify-content-between align-items-center my-2">
          <div className="d-flex text-warning ">
            <span>
              <i className="fa-solid fa-star"></i>
            </span>

            <div className="card-rate">4.5</div>
          </div>
          <div className="d-flex">
            <div className="card-price">{item.price}</div>
            <div className="card-currency mx-1">jd</div>
          </div>
        </div>
      </div>
      
    </Col>
  );
};

export default ProductCard;
