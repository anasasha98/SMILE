import React, { useState } from "react";
import CommonSection from "../component/UI/CommonSection";
import "../styles/checkout.css";
import Helmet from "./../component/Helmet/Helmet";
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Checkout = () => {
  const totalQty = useSelector(state => state.cart.totalQuantity);
  const totalAmount = useSelector(state=>state.cart.totalAmount);


  const [showCredit, setShowCredit] = useState(false);
  const [checked, setChecked] = useState(true);

  const onCheck = () => setShowCredit(true)
  return (
    <Helmet title="Check Out">
      <CommonSection title="Check Out" />
      <section className="">
        {" "}
        <div className="container">
          <div className="row">
            <div className="col-md-4 order-md-2 mb-4">
            <div className="checkout_cart">
              <h6>Total Qty: <span>{totalQty} items</span></h6>
              
              <h4>Total: <span>{totalAmount} JD</span></h4>
              <Button className="w-100">Place an holder</Button>
            </div>
             

           
            </div>
            <div className="col-md-8 order-md-1">
              <h4 className="mb-3">Billing address</h4>
              <form className="needs-validation">
                <div className="row">
                  <div className="mb-3">
                    <label htmlFor="username">User Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Enter your name"
                      required
                    />
                    <div className="invalid-feedback">
                      Valid your name is required.
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3">
                    <label htmlFor="phone">Phone Number</label>
                    <div className="input-group">
                      <input
                        type="number"
                        className="form-control"
                        id="phone"
                        placeholder="Enter your Phone Number"
                        required
                      />
                      <div
                        className="invalid-feedback"
                        style={{ width: "100%" }}
                      >
                        Your phone is required.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                <div className="mb-3">
                  <label htmlFor="email">
                    Email <span className="text-muted">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="you@example.com"
                  />
                  <div className="invalid-feedback">
                    Please enter a valid email address for shipping updates.
                  </div>
                </div>
                </div>
                <div className="row">
                  <div className="mb-3">
                    <label  htmlFor="address">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="for example: Amman"
                    />
                    <div className="invalid-feedback">
                      Please enter your shipping address.
                    </div>
                  </div>
                </div>

                

                <h4 className="mb-3">Payment</h4>

                <div className="d-block my-3">
                  <div className="custom-control custom-radio">
                    <input
                      id="cash"
                      name="paymentMethod"
                      type="radio"
                      className="custom-control-input"
                      defaultChecked={checked}
                      onChange={() => setChecked(!checked)}
                      required
                    />
                    <label className="custom-control-label" htmlFor="cash">
                      Cash (after delivery or in shop location)
                    </label>
                  </div>
                  <div className="custom-control custom-radio" id="credit">
                    <input
                      id="credit"
                      name="paymentMethod"
                      type="radio"
                      className="custom-control-input"
                      onClick={onCheck}
                      required
                    />
                    <label className="custom-control-label" htmlFor="credit">
                      Credit card
                    </label>
                  </div>
                </div>
                { showCredit ? <Credit /> : null }

                <div className="row">
                <Button className="w-100"
                  
                  type="submit"
                >
                  Continue to checkout
                </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Helmet>
  );
};
const Credit = () => (
  <>
    {" "}
    <div className="row">
      <div className="col-md-6 mb-3">
        <label htmlFor="cc-name">Name on card</label>
        <input
          type="text"
          className="form-control"
          id="cc-name"
          placeholder=""
          required
        />
        <small className="text-muted">Full name as displayed on card</small>
        <div className="invalid-feedback">Name on card is required</div>
      </div>
      <div className="col-md-6 mb-3">
        <label htmlFor="cc-number">Credit card number</label>
        <input
          type="text"
          className="form-control"
          id="cc-number"
          placeholder=""
          required
        />
        <div className="invalid-feedback">Credit card number is required</div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-3 mb-3">
        <label htmlFor="cc-expiration">Expiration</label>
        <input
          type="text"
          className="form-control"
          id="cc-expiration"
          placeholder=""
          required
        />
        <div className="invalid-feedback">Expiration date required</div>
      </div>
      <div className="col-md-3 mb-3">
        <label htmlFor="cc-cvv">CVV</label>
        <input
          type="text"
          className="form-control"
          id="cc-cvv"
          placeholder=""
          required
        />
        <div className="invalid-feedback">Security code required</div>
      </div>
    </div>
  </>
);

export default Checkout;
