import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import styled from "styled-components";

import Location from "./Location";

const Wrapper = styled.div`
  line-height: 1.2;
  background: #fff;
  margin-bottom: 20px;
  padding-top: 35px;

  padding-bottom: 39px;
`;

const Title = styled.p`
  font-size: 32px;
  font-weight: 600;
  color: #282c3f;
`;

const AddAddressTitle = styled.p`
  margin-bottom: 4px;
  font-size: 17px;
  font-weight: 600 !important;
  color: #282c3f;
  line-height: 1.18;
`;

const AddressText = styled.p`
  font-size: 13px;
  color: #93959f;
  margin-bottom: 8px;
  font-weight: 300;
  line-height: 16px;
  overflow: hidden;
`;

const AddressContainer = styled.button`
  border: 1px dashed #e9e9eb;
  padding: 0px;
  background: white;
  &:hover {
    box-shadow: 0 3px 5px 0 rgba(40, 44, 63, 0.4);
  }
`;

const Change = styled.button`
  border: 1px solid #002d62;
  font-weight: 500;
  border-radius: 0px;
  color: #002d62;
  &:hover {
    background-color: #002d62;
    color: #fff !important;
  }
`;

const CurrAddr = () => {
  const history = useHistory();
  const [addr, setAddr] = useState({});
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    setAddr(JSON.parse(localStorage.getItem("CustomerCurrentLoc")));
  }, []);

  const AddrSelected = () => {
    history.push({
      pathname: "/CheckoutPage",
      isAddrSelected: flag,
    });
    setFlag(!flag);
  };

  return (
    <>
      <div className="col-6">
        <div className="container">
          <AddressContainer type="button" className="row py-3">
            <div className="col-1">
              <i
                class="fas fa-map-marker-alt col-1"
                style={{ color: "#002D62", fontSize: "10px" }}
              ></i>
            </div>
            <div className="col">
              <div className="row row-cols-1">
                <AddAddressTitle className="col text-left">
                  Home
                </AddAddressTitle>
                <AddressText>
                  <div className="col text-left text-capitalize">
                    {addr.flat_no}, {addr.landmark}, {addr.place_name}
                  </div>
                  <div className="col mb-3 text-left text-capitalize">
                    {addr.type} Address
                  </div>
                </AddressText>

                <button
                  type="button"
                  className="col-8 btn btn-outline-success text-uppercase mt-2"
                  style={{
                    borderRadius: "0px",
                    marginLeft: "15px",
                  }}
                  onClick={AddrSelected}
                >
                  Select
                </button>
              </div>
            </div>
          </AddressContainer>
        </div>
      </div>
      <div className="col-5 align-self-center">
        <Location />
      </div>
    </>
  );
};

const Address = (props) => {
  const history = useHistory();
  const [addr, setAddr] = useState({});
  const { flag } = props;
  const [isAddrSelected, setIsAddrSelected] = useState(false);
  const userData = JSON.parse(window.localStorage.getItem("customerData"));
  useEffect(() => {
    setIsAddrSelected(flag || false);
    const userLoc = {
      flat_no: 121,
      landmark: "raj hospital",
      place_name: userData.geometry.place_name,
      long: userData.geometry.coordinates[0],
      lat: userData.geometry.coordinates[1],
      type: "HOME",
    };

    window.localStorage.setItem("CustomerCurrentLoc", JSON.stringify(userLoc));
    setAddr(JSON.parse(localStorage.getItem("CustomerCurrentLoc")));
  }, [flag]);

  const AddrSelected = () => {
    history.push({
      pathname: "/CheckoutPage",
      isAddrSelected: !flag,
    });
    /* // setFlag(!flag); */
  };

  if (isAddrSelected) {
    return (
      <>
        <Wrapper className="container">
          <div className="row">
            <i
              class="fas fa-map-marker-alt col-1"
              style={{ color: "#002D62", fontSize: "2rem", marginTop: "5px" }}
            ></i>
            <div className="col-11">
              <div className="row ">
                <div className="col">
                  <Title>
                    Delivery Address
                    <i
                      class="fas fa-check-circle"
                      style={{ color: "green", marginLeft: "10px" }}
                    ></i>
                  </Title>
                </div>{" "}
                <div class="w-100"></div>
                <div className="col-6">
                  <div className="container">
                    <AddressContainer type="button" className="row py-3">
                      <div className="col-1">
                        <i
                          class="fas fa-map-marker-alt col-1"
                          style={{ color: "#002D62", fontSize: "10px" }}
                        ></i>
                      </div>
                      <div className="col">
                        <div className="row row-cols-1">
                          <AddAddressTitle className="col text-left">
                            Home
                          </AddAddressTitle>
                          <AddressText>
                            <div className="col text-left text-capitalize">
                              {addr.flat_no}, {addr.landmark}, {addr.place_name}
                            </div>
                            <div className="col mb-3 text-left text-capitalize">
                              {addr.type} Address
                            </div>
                          </AddressText>
                        </div>
                      </div>
                    </AddressContainer>
                  </div>
                </div>
                <div className="col-5">
                  <Change type="button" className="btn" onClick={AddrSelected}>
                    Select this new address
                  </Change>
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      </>
    );
  } else {
    return (
      <>
        <>
          <Wrapper className="container">
            <div className="row">
              <i
                class="fas fa-map-marker-alt col-1"
                style={{ color: "#002D62", fontSize: "2rem", marginTop: "5px" }}
              ></i>

              <div className="col-11">
                <div className="row ">
                  <div className="col">
                    <Title>Delivery Address</Title>
                  </div>{" "}
                  <div class="w-100"></div>
                  {window.localStorage.getItem("CustomerCurrentLoc") ===
                  null ? (
                    <div className="col-5 ">
                      <Location />
                    </div>
                  ) : (
                    <>
                      <CurrAddr />
                    </>
                  )}
                </div>
              </div>
            </div>
          </Wrapper>
        </>
      </>
    );
  }
};

export default Address;
