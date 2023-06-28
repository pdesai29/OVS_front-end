import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { handleCart, handleDecrement, handleIncrement } from "./Redux/action";

const Wrapper = styled.div`
  overflow: hidden;
  font-family: sans-serif;
  border-left: 2px solid #e9eaec;
  margin-left: -8%;
  h2 {
    font-size: 32px;
    letter-spacing: -0.3px;
    font-weight: bolder;
    color: #282c3f;
    line-height: 1.2;
    margin-bottom: 0px;
  }
  small {
    color: #686b78;
    margin-top: 0px;
    font-weight: bolder;
  }

  .veg {
    border-radius: 50%;
    width: 10px;
    height: 10px;
    background: green;
  }

  .nonVeg {
    border-radius: 50%;
    width: 10px;
    height: 10px;
    background: red;
  }

  h6 {
    color: #282c57;
    margint-top: 3px;
  }

  img {
    width: 150px;
    height: 130px;
    border-radius: 15px;
  }

  .row {
    border-bottom: 2px solid #e9eaec;
  }

  .addCart {
    font-size: 0.9rem;
    font-weight: 600;
    margin-top: 40px;
    background: white;
    margin-left: 90px;
  }

  &:hover .addCart {
    cursor: pointer;
  }

  .buttoncart {
    margin-left: 0;
    margin-right: 0;
    border: none;
    background: white;
    padding: 5%;
    color: green;
  }
`;

function ServicesCards(props) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { cart } = state;
  const [quantity, setQuantity] = useState(0);
  const { data } = props;
  const productInCart = cart.find((item) => item._id === data._id) || {
    quantity: 0,
  };

  const handleAdd = (data) => {
    setQuantity(quantity + 1);
    dispatch(handleCart(data));
  };

  const handleInc = () => {
    setQuantity(quantity + 1);
    dispatch(handleIncrement(data._id));
  };

  const handleDec = () => {
    setQuantity(quantity - 1);
    dispatch(handleDecrement(data._id));
  };

  return (
    <Wrapper>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-7 mt-3">
            <div style={{ marginLeft: "11%" }}>
              <h6 className="mt-2">{data.name}</h6>
              <small>
                <i className="fas fa-rupee-sign mr-1"></i>
                {data.price}
              </small>
              <br />
              {/* <small className="mb-5">{data.description}</small> */}
            </div>
          </div>
          <div className="col-lg-5 mt-4 mb-5 position-relative">
            {/* <img src={data.img_url} alt="item" className="p-2" /> */}
            <div>
              {productInCart && productInCart.quantity === 0 ? (
                <div
                  className="addCart col-5 text-center py-2 text-success"
                  onClick={() => handleAdd(data)}
                  style={{ border: "1px solid green" }}
                >
                  ADD
                </div>
              ) : (
                <div className="addCart">
                  <button className="buttoncart" onClick={() => handleDec()}>
                    <i class="fas fa-minus"></i>
                  </button>
                  <button className="buttoncart">
                    <span style={{ fontWeight: "400" }}>
                      {productInCart && productInCart.quantity}
                    </span>
                  </button>
                  <button className="buttoncart" onClick={() => handleInc()}>
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default ServicesCards;
