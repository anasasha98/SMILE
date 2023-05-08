import React from "react";
import "../styles/cart.css";
import Helmet from "../component/Helmet/Helmet";
import CommonSection from "./../component/UI/CommonSection";
import { Button, Col, Container, Row } from "react-bootstrap";
import { motion } from "framer-motion";
import { cartAction } from "../redux/slices/cartSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItem = useSelector((state) => state.cart.cartItem);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  
  return (
    <Helmet title="Cart">
      <CommonSection title="Shopping Cart" />
      <section className="">
        <Container>
          <Row>
            <Col lg={9}>
              {cartItem.length === 0 ? (
                <h2 className="fs-4 text-center">No item added to the cart</h2>
              ) : (
                <div className="table-responsive">
                  <table className="table bordered">
                    <thead>
                      <tr className="cart_titles">
                        <th scope="col" className="border-0 bg-light">
                          <div className="p-2 px-3 text-uppercase">Product</div>
                        </th>

                        <th scope="col" className="border-0 bg-light">
                          <div className="py-2 text-uppercase">Price</div>
                        </th>
                        <th scope="col" className="border-0 bg-light">
                          <div className="py-2 text-uppercase">Qty</div>
                        </th>
                        <th scope="col" className="border-0 bg-light">
                          <div className="py-2 text-uppercase">Remove</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItem.map((item, index) => (
                        <Trash item={item} key={index} />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Col>
            <Col lg={3}>
              <div>
                <h6 className="fs-5 d-flex  justify-content-between">
                  Subtotal <span className="fs-4 fw-bold">${totalAmount}</span>
                </h6>
              </div>
              <p className="fs-6 mt-2">Shipping well calc in checkOut</p>
              <div className="btn_cart">
               
                <Button className="w-100 ">
                  <Link to="/checkout">Check Out</Link>
                </Button>
                <Button className="w-100 mt-3">
                  <Link to="/shop">Continue Shopping</Link>
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const Trash = ({ item }) => {
  const dispatch = useDispatch();

  const deleteProduct = () => {
    dispatch(cartAction.deleteItem(item.id));
  };
  return (
    <tr>
      <th scope="row">
        <div className="p-2 ">
          <img
            src={item.imgUrl}
            alt=""
            width="70"
            className="img-fluid rounded shadow-sm "
          />
          <div className=" ml-5 d-inline-block align-middle">
            <h5 className="mb-0 ">
              {" "}
              <a href="#!" className="text-dark d-inline-block">
                {item.productName}
              </a>
            </h5>
            <span className="text-muted font-weight-normal font-italic">
              Category: {item.category}
            </span>
          </div>
        </div>
      </th>
      <td>
        <strong className=" text-center ">{item.totalPrice} JD</strong>
      </td>
      <td className="text-center align-items-center ">
        <strong>{item.quantity}</strong>
      </td>
      <motion.td
        onClick={deleteProduct}
        whileTap={{ scale: 1.2 }}
        className="text-center align-items-center "
      >
        <a href="#!" className="text-danger ">
          <i className="fa fa-trash"></i>
        </a>
      </motion.td>
    </tr>
  );
};

export default Cart;
