import React from "react";
import { Container , Button } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import useGetData from "./../custom-hooks/useGetData";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
const Users = () => {
  const { data: usersData, loading } = useGetData("users");
  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
    toast.success('Deleted')
  };
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4 className="mb-5 fw-bold">Users</h4>
          </Col>
          <Col lg="12" className="pt-5">
            <table className="table bordered">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>UserName</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <h4 className="text-center py-5">loading...</h4>
                ) : (
                  usersData?.map((user) => (
                    <tr key={user.uid}>
                      <td>
                        <img
                          style={{ width: "50px", height: "50px" }}
                          src={user.photoURL}
                          alt=""
                        />
                      </td>
                      <td>{user.displayName}</td>
                      <td>{user.email}</td>
                      
                      <td>
                        {" "}
                        <Button
                          onClick={() => {
                            deleteUser(user.uid);
                          }}
                          variant="danger"
                        >
                          Delete
                        </Button>
                        {" "}
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

export default Users;
