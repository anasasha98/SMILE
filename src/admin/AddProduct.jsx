
import React , {useState} from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import {db ,storage } from './../firebase.config';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import { collection , addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {

    const [enterTitle , setEnterTitle] = useState("");
    const [enterShortDesc , setEnterShortDesc] = useState("");
    const [enterDescription , setEnterDescription] = useState("");
    const [enterCategory , setEnterCategory] = useState("");
    const [enterPrice , setEnterPrice] = useState("");
    const [enterProductImg , setEnterProductImg] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const addProduct = async(e)=>{
        e.preventDefault();
        setLoading(true)

    // const product ={
    //     title:enterTitle,
    //     shortDesc:enterShortDesc,
    //     description:enterDescription,
    //     category:enterCategory,
    //     price:enterPrice,
    //     imgUrl:enterProductImg,
    // };
        try {
            const docRef = await collection(db, 'products');
            const storageRef = ref(storage, `productImages/${Date.now() + enterProductImg.name}`);
            const uploadTask = uploadBytesResumable(storageRef,enterProductImg);

            uploadTask.on(()=>{
                toast.error("images not uploaded!");
            },()=>{
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL)=>{
                    await addDoc(docRef, {
                        
                        productName:enterTitle,
                        shortDesc:enterShortDesc,
                        description:enterDescription,
                        category:enterCategory,
                        price:enterPrice,
                        imgUrl:downloadURL,
                    });
                });
                
            })
            setLoading(false)
            toast.success("product successfully added");
            navigate('/dashboard/all-product')

            
        } catch (error) {
            setLoading(false)

            toast.error("product not added");
        }

    // toast.success("product successfully added")
    // console.log(product);

}

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
          {
            loading? <h4 className="py-5 text-center">Loading....</h4>:<>
            <h4 className="mb-5">Add Product</h4>
            <Form onSubmit={addProduct}>
              <Form.Group >
                <Form.Label >Product title</Form.Label>
                <Form.Control type="text" placeholder=""  value={enterTitle}
                 onChange={e=> setEnterTitle(e.target.value)} required/>
              </Form.Group>
              <Form.Group >
                <Form.Label>Short Description product</Form.Label>
                <Form.Control type="text" placeholder="" value={enterShortDesc}
                 onChange={e=> setEnterShortDesc(e.target.value)} required />
              </Form.Group>
              <Form.Group >
                <Form.Label>Product Description</Form.Label>
                <Form.Control type="text" placeholder="" value={enterDescription}
                 onChange={e=> setEnterDescription(e.target.value)} required/>
              </Form.Group>

              <div  className="d-flex align-items-center justify-content-between">
                <Form.Group className="w-50" >
                  <Form.Label>Category</Form.Label>
                  <select
                    className="form-select w-100 p-2"
                    aria-label="Default select example"
                    value={enterCategory}
                 onChange={e=> setEnterCategory(e.target.value)} 
                 required

                  >
                    <option defaultValue  disabled selected>Select Category : </option>
                    <option   value="men">chair</option>
                    <option value="women">women</option>
                    <option value="kids">kids</option>
                    
                  </select>
                </Form.Group>
                <Form.Group className="" >
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="number" placeholder="" value={enterPrice}
                 onChange={e=> setEnterPrice(e.target.value)}  required/>
                </Form.Group>
              </div>
              <div> <Form.Group >
                  <Form.Label>Product Image</Form.Label>
                  <Form.Control type="file" placeholder="" onChange={e=> setEnterProductImg(e.target.files[0])} required />
                </Form.Group>
                </div>

                <Button className="mt-5" type="submit" >Add Product</Button>
            </Form>
            </>
          }
          </Col>
        </Row>
        
      </Container>
    </section>
  );
};

export default AddProduct;
