import React, { useState,useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CommonSection from "../component/UI/CommonSection";
import Helmet from "./../component/Helmet/Helmet";
import "../styles/shop.css";
import products from "../assets/data/products";

import ProductList from "./../component/UI/ProductList";
const Shop = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const [productsData, setProductsData] = useState(products);

  const handleFilter = (e) => {
    const filterValue = e.target.value;
    if (filterValue === "men") {
      const filteredProducts = products.filter(
        (item) => item.category === "men"
      );
      setProductsData(filteredProducts);
    }
    if (filterValue === "women") {
      const filteredProducts = products.filter(
        (item) => item.category === "women"
      );
      setProductsData(filteredProducts);
    }
    if (filterValue === "kids") {
      const filteredProducts = products.filter(
        (item) => item.category === "kids"
      );
      setProductsData(filteredProducts);
    }
   
    if (filterValue === "all") {
      setProductsData(products);
    }
  };
  const handleSearch = (e) => {
    const handleFilter = e.target.value;
    const searchProduct = products.filter((item) =>
      item.productName.toLowerCase().includes(handleFilter.toLowerCase())
    );
    setProductsData(searchProduct);
  };
  
  return (
    <Helmet title="Shop">
      <CommonSection title="Products" />

      <section>
        {" "}
        <Container>
          <Row>
            <Col lg="3" md="6">
              <div className=" filter_widget">
                <select onChange={handleFilter} className="form-select">
                  <option selected value="all">
                    Filter By Category
                  </option>
                  <option value="men">men</option>
                  <option value="women">women</option>
                  <option value="kids">kids</option>
                 
                </select>
              </div>
            </Col>
            <Col lg="3" md="6">
              <div className="filter_widget text-end">
                <select className="form-select ">
                  <option>Sort By </option>
                  <option value="Ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </Col>
            <Col lg="6" md="12">
              <div className="search_box mt-1">
                <input type="text" placeholder="Search......" onChange={handleSearch}/>
                <span>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="">
        <Container>
          <Row>
            {productsData.length === 0 ? (
              <h1 className="text-center fs-3">No Product Are Found!</h1>
            ) : (
              <ProductList data={productsData} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;
