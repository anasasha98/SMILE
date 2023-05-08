import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import useGetData from "../custom-hooks/useGetData";
import { db } from "../firebase.config";
import { doc, deleteDoc } from "firebase/firestore";
const AllProduct = () => {
  const { data: productData, loading } = useGetData("products");

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    toast.success('Deleted')
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <table className="table bordered">
              <thead>
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Title</th>
                  <th scope="col">Category</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <h4 className="text-center py-5">loading...</h4>
                ) : (
                  productData.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img
                          style={{ width: "50px", height: "50px" }}
                          src={item.imgUrl}
                          alt=""
                        />
                      </td>
                      <td>{item.title}</td>
                      <td>{item.category}</td>
                      <td>{item.price} JD</td>
                      <td>
                        {" "}
                        <Button
                          onClick={() => {
                            deleteProduct(item.id);
                          }}
                          variant="danger"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AllProduct;
