import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import BillItems from "../CheckoutPage/Customer/BillItems";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";

const Wrapper = styled.div`
  font-family: ProximaNova, Arial, Helvetica Neue, sans-serif;
  letter-spacing: 0;
  color: #171a29;
  font-family: sans-serif;
  border: 1px solid #d4d5d9;
`;

const Image = styled.img`
  width: inherit;
`;

const Tick = styled.img`
  margin-left: 15px;
  height: 20px;
  width: 20px;
  vertical-align: text-bottom;
`;

const Name = styled.p`
  font-size: 20px;
  font-weight: 500;
  color: #171a29;
  margin-bottom: 0px;
  cursor: pointer;
  &:hover {
    color: #002d62;
  }
`;

const Info = styled.p`
  font-size: 15px;
  font-weight: 400;
  margin-bottom: 0px;
  cursor: pointer;
`;

const Dets = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #002d62;
  margin-bottom: 0px;
  cursor: pointer;
  &:hover {
    color: #171a29;
  }
`;

const Reorder = styled.button`
  font-size: 16px;
  font-weight: 600;
  border-radius: 0px;
  color: #fff;
  background: #002d62;
  &:hover {
    box-shadow: 0 2px 8px #d4d5d9;
    color: #fff;
  }
`;

const Help = styled.button`
  font-size: 16px;
  font-weight: 600;
  border-radius: 0px;
  border: 1px solid #002d62;
  color: #002d62;
  &:hover {
    box-shadow: 0 2px 8px #d4d5d9;
    color: #002d62;
  }
`;

const OrderCard = (props) => {
  const { data } = props;
  const history = useHistory();
  const [handleCancel, sethandleCancel] = useState();
  const [rating, setRating] = useState("");
  const [message, setMessage] = useState("");
  const [toggle, setToggle] = useState(false);
  const [value, setValue] = React.useState(2);

  useEffect(() => {
    if (handleCancel === "reviewed") {
      sethandleCancel("reviewed");
    } else {
      sethandleCancel(data.orderStatus);
      // console.log("inside useEffect");
    }
  });

  const handleCancelOrder = (id) => {
    axios
      // https://ovs-backend.onrender.com/

      // .patch(`http://localhost:9000/api/v1/orders/${id}`, {
      .patch(`https://ovs-backend.onrender.com/api/v1/orders/${id}`, {
        orderStatus: "rejected",
      })
      .then((res) => {
        sethandleCancel(res.data.data.orderStatus);
      });
    history.push({ pathname: "/cancelOrder" });
  };

  const handleSubmit = (id) => {
    axios
      // https://ovs-backend.onrender.com/

      // .patch(`http://localhost:9000/api/v1/orders/${id}`, {
      .patch(`// https://ovs-backend.onrender.com/api/v1/orders/${id}`, {
        orderStatus: "reviewed",
        review: {
          rating: value,
          reviewMessage: message,
        },
      })
      .then((res) => {
        // console.log("inside patch", res);
        sethandleCancel(res.data.data.orderStatus);
      });

    axios
      // https://ovs-backend.onrender.com/

      // .post("http://localhost:9000/api/v1/reviews", {
      .post("https://ovs-backend.onrender.com/api/v1/reviews", {
        review: message,
        rating: value,
        user_id: data.user._id,
        garage_id: data.garage._id,
      })
      .then((res) => {});
  };

  const date = new Date(data.createdAt).toLocaleString();

  const showGarageStatus = (handleCancel) => {
    if (handleCancel === "pending") {
      return (
        <i
          class="fas fa-clock"
          style={{ color: "orange", marginLeft: "10px" }}
        ></i>
      );
    } else if (handleCancel === "processing") {
      return (
        <i
          class="fas fa-hourglass"
          style={{ color: "#002D62", marginLeft: "10px" }}
        ></i>
      );
    } else if (handleCancel === "rejected") {
      return (
        <i
          class="fas fa-frown"
          style={{ color: "red", marginLeft: "10px" }}
        ></i>
      );
    } else if (handleCancel === "completed") {
      return (
        <i
          class="fas fa-check-circle"
          style={{ color: "green", marginLeft: "10px" }}
        ></i>
      );
    } else if (handleCancel === "reviewed") {
      return (
        <i
          class="fas fa-check-double"
          style={{ color: "green", marginLeft: "10px" }}
        ></i>
      );
    }
  };
  const showButtons = (handleCancel) => {
    if (handleCancel === "pending") {
      return (
        <Help
          type="button"
          className="btn col-2 p-2 mr-4 text-uppercase"
          onClick={() => handleCancelOrder(data._id)}
          style={{
            color: "white",
            backgroundColor: "red",
            border: "1px solid red",
          }}
        >
          Cancel order
        </Help>
      );
    } else if (handleCancel === "processing") {
      return <p>Someone will reach you soon</p>;
    } else if (handleCancel === "rejected") {
      return <p>Your order has been canceled</p>;
    } else if (handleCancel === "completed") {
      return (
        <Box
          className="row"
          component="fieldset"
          mb={3}
          borderColor="transparent"
        >
          <Typography className="col" component="legend">
            Rate your Experiance with us :
          </Typography>
          <Rating
            className="col-lg-12"
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            size="large"
          />
          <TextField
            className="col-lg-12"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            id="standard-basic"
            label="Message"
            style={{ marginLeft: "20px" }}
          />

          <Button
            className="col-lg-3"
            variant="contained"
            onClick={() => handleSubmit(data._id)}
            style={{
              marginLeft: "20px",
              marginTop: "10px",
              color: "white",
              backgroundColor: "green",
            }}
          >
            Done
          </Button>
        </Box>
      );
    } else if (handleCancel === "reviewed") {
      if (data.review.rating) {
        return (
          <>
            <p className="col-lg-12">Your rating for Service</p>
            <p className="col">
              {data.review.rating}{" "}
              <i class="fas fa-star" style={{ color: "	#FFD700" }}></i>|{" "}
              <span>{data.review.reviewMessage}</span>
            </p>
          </>
        );
      } else {
        return (
          <>
            <p className="col-lg-12">Your rating for Service</p>
            <p className="col">
              {value} <i class="fas fa-star" style={{ color: "	#FFD700" }}></i>|{" "}
              <span>{message}</span>
            </p>
          </>
        );
      }
    }
  };
  const showCard = () => {
    if (handleCancel === "reviewed") {
      return (
        <Wrapper className="container text-left mb-5">
          <div className="row p-4">
            <div className="col-3 pl-0">
              <Image src={data.garage.img_url} alt="Garage" />
            </div>
            <div className="col row-cols-1 pl-0">
              <div className="col">
                <div className="row justify-content-between">
                  <div className="col-md-auto">
                    <Name>{data.garage.name}</Name>
                  </div>
                  <div className="col-md-auto text-right mt-1 text-muted">
                    {handleCancel}
                    {showGarageStatus(handleCancel)}
                  </div>
                </div>
              </div>
              <div className="col text-capitalize text-muted">
                <Info>
                  ORDER #{data._id} | {date.toString()}
                </Info>
              </div>
              <div className="col text-uppercase mt-3">
                <Dets>view details</Dets>
              </div>
            </div>
          </div>
          <div className="row-cols-1">
            <div
              className="col mt-3 mb-3"
              style={{ border: "1px dashed #d4d5d9" }}
            ></div>
            <div className="col" style={{ fontWeight: 300 }}>
              {data.serviceList.map((item) => (
                <BillItems data={item} />
              ))}
            </div>

            <div className="col">
              <div className="row justify-content-end">
                <div
                  className="col-md-auto text-right text-muted"
                  style={{ borderTop: "2px solid #d4d5d9" }}
                >
                  Total Paid: ₹{" "}
                  {data.serviceList.reduce(
                    (a, b) => a + b.quantity * b.price,
                    50
                  )}
                </div>
              </div>
            </div>
            <div className="col mb-4">
              <div className="row ml-1">{showButtons(handleCancel)}</div>
            </div>
          </div>
        </Wrapper>
      );
    } else {
      return (
        <Wrapper className="container text-left mb-5">
          <div className="row p-4">
            <div className="col-3 pl-0">
              <Image src={data.garage.img_url} alt="Garage" />
            </div>
            <div className="col row-cols-1 pl-0">
              <div className="col">
                <div className="row justify-content-between">
                  <div className="col-md-auto">
                    <Name>{data.garage.name}</Name>
                  </div>
                  <div className="col-md-auto text-right mt-1 text-muted">
                    {handleCancel}
                    {showGarageStatus(handleCancel)}
                  </div>
                </div>
              </div>
              <div className="col text-capitalize text-muted">
                <Info>
                  ORDER #{data._id} | {date.toString()}
                </Info>
              </div>
              <div className="col text-uppercase mt-3">
                <Dets>view details</Dets>
              </div>
            </div>
          </div>
          <div className="row-cols-1">
            <div
              className="col mt-3 mb-3"
              style={{ border: "1px dashed #d4d5d9" }}
            ></div>
            <div className="col" style={{ fontWeight: 300 }}>
              {data.serviceList.map((item) => (
                <BillItems data={item} />
              ))}
            </div>

            <div className="col">
              <div className="row justify-content-end">
                <div
                  className="col-md-auto text-right text-muted"
                  style={{ borderTop: "2px solid #d4d5d9" }}
                >
                  Total Paid: ₹{" "}
                  {data.serviceList.reduce(
                    (a, b) => a + b.quantity * b.price,
                    50
                  )}
                </div>
              </div>
            </div>
            <div className="col mb-4">
              <div className="row ml-1">{showButtons(handleCancel)}</div>
            </div>
          </div>
        </Wrapper>
      );
    }
  };
  /* else{
            return(
                <Wrapper className='container text-left mb-5'>
            <div className='row p-4'>
                <div className='col-3 pl-0'>
                    <Image src={data.garage.img_url} alt='Garage' />
                </div>
                <div className='col row-cols-1 pl-0'>
                    <div className='col'>
                        <div className='row justify-content-between'>
                            <div className='col-md-auto'>
                                <Name>{data.garage.name}</Name>
                            </div>
                            <div className='col-md-auto text-right mt-1 text-muted'>
                                {data.orderStatus}
                                {showGarageStatus(data.orderStatus)}  
                            </div>
                        </div>
                    </div>
                    <div className='col text-capitalize text-muted'>
                        <Info>
                            ORDER #{data._id} | {date.toString()}
                        </Info>
                    </div>
                    <div className='col text-uppercase mt-3'>
                        <Dets>view details</Dets>
                    </div>
                </div>
            </div>
            <div className='row-cols-1'>
                <div
                    className='col mt-3 mb-3'
                    style={{ border: '1px dashed #d4d5d9' }}
                ></div>
                <div className='col' style={{ fontWeight: 300 }}>
                    {data.serviceList.map((item) => (
                        <BillItems data={item} />
                    ))}
                </div>

                <div className='col'>
                    <div className='row justify-content-end'>
                        <div
                            className='col-md-auto text-right text-muted'
                            style={{ borderTop: '2px solid #d4d5d9' }}
                        >
                            Total Paid: ₹{' '}
                            {data.serviceList.reduce(
                                (a, b) => a + b.quantity * b.price,
                                50,
                            )}
                        </div>
                    </div>
                </div>
                <div className='col mb-4'>
                    <div className='row ml-1'> 
                        {showButtons(data.orderStatus)}
                    </div>
                </div>
            </div>
        </Wrapper>
            )
        } */

  return showCard();
};

export default OrderCard;
