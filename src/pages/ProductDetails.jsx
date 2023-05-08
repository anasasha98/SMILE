import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Helmet from "./../component/Helmet/Helmet";
import CommonSection from "./../component/UI/CommonSection";
import "../styles/productDetails.css";
import ProductList from "./../component/UI/ProductList";
import { cartAction } from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { db } from "../firebase.config";
import { doc , getDoc } from "firebase/firestore";
import useGetData from "../custom-hooks/useGetData";
const ProductDetails = () => {
  const {data: products} = useGetData('products')
  const [product, setProduct] = useState({});
  const [tab, setTab] = useState('desc');
  
  const reviewUser = useRef("");
  const reviewMsg = useRef("");
  const dispatch = useDispatch();
  const [rating, setRating] = useState(null);

  const { id } = useParams();
  // const product = products.find((item) => item.id === id);

  const docRef = doc(db, 'products', id);
  useEffect(() => {
    const getProduct = async()=>{
      const docSnap = await getDoc(docRef)

      if(docSnap.exists()){
        setProduct(docSnap.data())
      }else{
        console.log('no product')

      }
    }
    getProduct()
   
  }, [docRef]);
  const {
    imgUrl,
    productName,
    price,
    // avgRating,
    // reviews,
    description,
    shortDesc,
    category,
  } = products;

  const submitHandler = (e) => {
    e.preventDefault();

    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;

    const reviewObj = {
      authorName: reviewUserName,
      text: reviewUserMsg,
      rating,
    };
    console.log(reviewObj);
    toast.success("Review Submitted");
  };
  const addToCart = () => {
    dispatch(
      cartAction.addItem({
        id :id,
        imgUrl: imgUrl,
        productName :productName,
        price : price,
        category:category,
      })
    );
    toast.success("Product added successfully");
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  const relatedProducts = products.filter((item) => item.category === category);

  return (
    <Helmet title={productName}>
      <CommonSection title={productName} />
      <section className="product_detail">
        <Container>
          <Row>
            <Col lg="6" className="pt-0">
              <img src={imgUrl} alt="" />
            </Col>
            <Col lg="6">
              <div className="product_detail">
                <h2>{productName}</h2>
                <div className="product_rating d-flex align-item-center gap-5 mb-4">
                  <div>
                    <span onClick={() => setRating(1)}>
                      <i className="fa-solid fa-star"></i>
                    </span>
                    <span onClick={() => setRating(2)}>
                      <i className="fa-solid fa-star"></i>
                    </span>
                    <span onClick={() => setRating(3)}>
                      <i className="fa-solid fa-star"></i>
                    </span>
                    <span onClick={() => setRating(4)}>
                      <i className="fa-solid fa-star"></i>
                    </span>
                    <span onClick={() => setRating(5)}>
                      <i className="fa-regular fa-star-half-stroke"></i>
                    </span>
                  </div>
                  <p>
                    {/* (<span>{avgRating}</span> rating) */}
                  </p>
                </div>
                <div className="d-flex align-items-center gap-5">
                  <span className="product_detail-price">{price} JD</span>
                  <span>Category: {category.toUpperCase()}</span>
                </div>
                <p className="mt-3">{shortDesc}</p>
                <Button onClick={addToCart}>Add to Cart</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab_details d-flex align-items-center gap-5">
              
                <h6

                  className={`${tab === "desc" ? "active_tab" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h6>
                <h6
                  className={`${tab === "rev" ? "active_tab" : ""}`}
                  onClick={() => setTab("rev")}
                >
                  Reviews
                   {/* ({reviews.length}) */}
                </h6>
              </div>

              {tab === "desc" ? (
                <div className="tab_content mt-5">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="product_review mt-5">
                  <div className="review_details">
                    {/* <ul>
                      {reviews?.map((item, index) => (
                        <li key={index} className="mb-4">
                          <h6>anas asha</h6>
                          <span>{item.rating} rating</span>

                          <p>{item.text}</p>
                        </li>
                      ))}
                    </ul> */}
                    <div className="review_form">
                      <h4>Leave your experience</h4>
                      <form action="" onSubmit={submitHandler}>
                        <div className="form-group">
                          <input
                            type="text"
                            placeholder="Enter your name"
                            className="form-control"
                            ref={reviewUser}
                            required
                          />
                        </div>
                        <div className="form-group d-flex align-items-center justify-content-start gab-5 rating_group">
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(1)}
                          >
                            1<i className="fa-solid fa-star"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(2)}
                          >
                            2<i className="fa-solid fa-star"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(3)}
                          >
                            3<i className="fa-solid fa-star"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(4)}
                          >
                            4<i className="fa-solid fa-star"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(5)}
                          >
                            5<i className="fa-solid fa-star"></i>
                          </motion.span>
                        </div>
                        <div className="form-group">
                          <textarea
                            ref={reviewMsg}
                            placeholder="Review Message... "
                            className="form-control"
                            id="review_message"
                            rows="4"
                            required
                          ></textarea>
                        </div>
                        <Button type="submit" className="btn">
                          Submit
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Col>
            <Col lg="12" className="mt-5">
              <h1 className="related_title">You might also like</h1>
            </Col>
            <ProductList data={relatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
