import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Helmet from "../component/Helmet/Helmet";
import hero_img from "../assets/images/hero-bg-img-removebg.png";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import Services from "../services/Services";
import SubTitle from "./../component/Uitilty/SubTitle";
import ProductList from "./../component/UI/ProductList";
import counterImg from '../assets/images/men-suit01-removebg-preview.png';
import Clock from "../component/UI/Clock";
import useGetData from "../custom-hooks/useGetData";
const Home = () => {
  const {data: products , loading} = useGetData('products') 
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const today = new Date();
  const year = today.getFullYear();

  const [trendProduct, setTrendProduct] = useState([]);
  const [bestProduct, setBestProduct] = useState([]);
  const [kidsProduct, setKidsProduct] = useState([]);
  const [popularProduct, setPopularProduct] = useState([]);
  useEffect(() => {
    const filterTrendProduct = products.filter((item) => item.category === "men");
    const filterBestProduct = products.filter((item) => item.category === "women");
    const filterKidsProduct = products.filter((item) => item.category === "kids");
    const filterPopularProduct = products.filter((item) => item.category === "men");
    setTrendProduct(filterTrendProduct);
    setBestProduct(filterBestProduct);
    setKidsProduct(filterKidsProduct);
    setPopularProduct(filterPopularProduct);
  }, [products]);

  return (
    <Helmet title={"Home"}>
      <section className="hero_sec">
        <Container>
          <Row>
            <Col lg={6} md={6} sm={6} className="mt-5">
              <p>Smiles for Selling anything</p>
              <h2>
                There is no sale without the story, and no knockout without the
                setting.
              </h2>
              <p className=" mt-5">Trading Product in </p>
              <Button className="shop_btn">
                <Link to="/shop">Shop Now</Link>
              </Button>
            </Col>
            <Col lg={6} md={6}>
              <img src={hero_img} alt="heroImg" />
            </Col>
          </Row>
        </Container>
      </section>
      <Services />

      <section className="trending_product">
        <Container>
          <Row>
            <Col>
              <SubTitle title="Trending Product" btnTitle="More" />
            </Col>
          </Row>
          <Row>
          {
            loading ? <h5 className="fw-bold text-center">loading</h5>
            :<ProductList data={trendProduct} />
          }
            
          </Row>
        </Container>
      </section>
      <section className="best_product">
        <Container>
          <Row>
            <Col>
              <SubTitle title="Best Product" btnTitle="More" />
            </Col>
          </Row>
          <Row>
          { loading ? <h5 className="fw-bold text-center">loading</h5>:
          <ProductList data={bestProduct} />
          }
            
          </Row>
        </Container>
      </section>
      <section className="timer_count">
      <Container>  <Row >
      
          <Col >
            <div className="clock_content">
              <h4 className="text-white fs-6 mb-2">Limited Offer</h4>
              <h3 className="text-white fs-5 mb-3">Quality Armchair</h3>
            </div>
            <div className="clock_sec"><Clock/></div>
            
            <Button className="mt-5" ><Link to="/shop">Visit Store</Link></Button>
          </Col>
          <Col  className="timer_img text-end ">
            <img src={counterImg} alt="timer"/>
          </Col>
        </Row></Container>
      
      </section>
      <section className="new_arrivals-product">
        <Container>
          <Row>
            <Col>
              <SubTitle title="New Arrivals Product" btnTitle="More" />
            </Col>
          </Row>
          <Row>
          { loading ? <h5 className="fw-bold text-center">loading</h5>:
         <ProductList data={kidsProduct} />
          }
            
          </Row>
        </Container>
      </section>
      <section className="popular_product">
        <Container>
          <Row>
            <Col>
              <SubTitle title="Popular Product" btnTitle="More" />
            </Col>
          </Row>
          <Row>
          { loading ? <h5 className="fw-bold text-center">loading</h5>:
          <ProductList data={popularProduct} />
          }
            
          </Row>
        </Container>
      </section>


      
    </Helmet>
  );
};

export default Home;
