import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import TextField from "@material-ui/core/TextField";

import styled from "styled-components";

import axios from "axios";

import Map from "./Map";

const Wrapper = styled.div`
  overflow: hidden;
  padding: 10px 0;
  margin: 0;
  box-sizzing: border-box;
  font-family: sans-serif;
  box-shadow: 0 15px 40px -20px rgba(40, 44, 63, 0.15);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  width: inherit;
  background: #fff;
  z-index: 1000;
`;

const Middle = styled.div`
  margin-top: 80px;
  width: 80%;
`;

const MapContainer = styled.div`
  font: 400 11px Roboto, Arial, sans-serif !important;
  box-sizing: inherit;
  height: 250px;
  width: 350px;
  padding: 0px;
  border-width: 0px;
  margin: 0px;
`;

const Button2 = styled.button`
  border-radius: 0px;
  &:hover {
    color: #fff;
    background-color: black;
  }
`;

const Wrapper2 = styled.div`
  overflow: hidden;
  padding: 10px 0;
  margin: 0;
  box-sizzing: border-box;
  font-family: sans-serif;
  box-shadow: 0 -2px 4px 0 #e9e9eb;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  width: inherit;
  background: #fff;
  z-index: 1000;
`;

const Button = styled.button`
  box-shadow: 0 2px 8px #d4d5d9;
  background-color: #002d62;
  border-radius: 0px;
  border: none;
  line-height: 50px;
  font-size: 14px;
  font-weight: 600;
  height: 50px;
  padding: 0 2rem;
  letter-spacing: 0;
  color: #fff;
  &:hover {
    color: #fff;
  }
`;

const Heading = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
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

const AddLocation = styled.img`
  height: 25px;
  width: 25px;
  vertical-align: inherit;
  margin-radius: 0px;
`;

const useStyles = makeStyles({
  list: {
    width: 450,
  },
  fullList: {
    width: "auto",
  },
});

export default function TemporaryDrawer() {
  const history = useHistory();
  const [flatNo, setFlatNo] = useState("");
  const [landmark, setLandmark] = useState("");
  const [type, setType] = useState("");
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const getUserLocation = () => {
    const data = JSON.parse(window.localStorage.getItem("CustomerCurrentLoc"));

    const userLoc = {
      flat_no: flatNo,
      landmark: landmark,
      place_name: data.place_name,
      long: data.long,
      lat: data.lat,
      type: type,
    };

    window.localStorage.setItem("CustomerCurrentLoc", JSON.stringify(userLoc));

    axios
      // .patch("http://localhost:9000/api/v1/users/userAddress", {
      .patch("https://ovs-backend.onrender.com/api/v1/users/userAddress", {
        user_id: JSON.parse(window.localStorage.getItem("customerData"))._id,
        flat_no: flatNo,
        landmark: landmark,
        lat: data.lat,
        long: data.long,
        place_name: data.place_name,
      })
      .then((res) => {
        // console.log(res);
        history.push("/temp");
      })
      .then((res) => {
        setState({ ...state, left: false });
        history.push("/CheckoutPage");
      });
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
    >
      <Wrapper className="container-fluid">
        <div className="container" style={{ width: "65%" }}>
          <div className="row justify-content-between">
            <button
              type="button"
              className="btn btn-sm col col-md-auto"
              onClick={toggleDrawer(anchor, false)}
            >
              <i className="fas fa-times fa-lg"></i>
            </button>
            <Heading className="col col-md-auto text-center">
              Save delivery address
            </Heading>
          </div>
        </div>
      </Wrapper>
      <Middle className="container">
        <div className="row">
          <div className="col-lg-10">
            <MapContainer>
              <Map />
            </MapContainer>
          </div>
          <div
            className="col-lg-10 mt-5 pt-5"
            /* style={{
                            paddingLeft: '15px',
                            paddingRight: '15px',
                        }} */
          >
            <TextField
              label="Door/Flat No."
              placeholder=""
              fullWidth
              variant="outlined"
              style={{
                marginLeft: "0px",
                borderRadius: "0px",
              }}
              onChange={(e) => {
                setFlatNo(e.target.value);
              }}
            />
          </div>
          <div className="col-lg-10 pt-2">
            <TextField
              label="Landmark"
              placeholder=""
              fullWidth
              variant="outlined"
              style={{
                marginLeft: "0px",
                borderRadius: "0px",
              }}
              onChange={(e) => {
                setLandmark(e.target.value);
              }}
            />
          </div>
          <div className="col-lg-10">
            <div className="container">
              <div className="row">
                <Button2
                  type="button"
                  className="col btn"
                  onClick={() => setType("Home")}
                >
                  Home
                </Button2>
                <Button2
                  type="button"
                  className="col btn"
                  onClick={() => setType("Work")}
                >
                  Work
                </Button2>
                <Button2
                  type="button"
                  className="col btn"
                  onClick={() => setType("Other")}
                >
                  Other
                </Button2>
              </div>
            </div>
          </div>
        </div>
      </Middle>
      <Wrapper2 className="container-fluid ">
        <div className="container" style={{ width: "75%" }}>
          <Button
            type="button"
            className="btn col btn-block"
            onClick={getUserLocation}
          >
            SAVE ADDRESS & PROCEED
          </Button>
        </div>
      </Wrapper2>
    </div>
  );

  return (
    <div>
      <AddressContainer
        type="button"
        className="btn btn-md text-capitalize row py-3"
        onClick={toggleDrawer("left", true)}
      >
        <div className="col-1">
          {/* <i class="fas fa-map-marker-alt col-1" style={{color:"#002D62" ,fontSize:"20px",marginLeft:"none"}}></i> */}
        </div>
        <div className="col ">
          <div className=" row row-cols-1">
            <AddAddressTitle className="col text-left text-capitalize">
              Change Address
            </AddAddressTitle>
            <AddressText>
              <div className="col text-left text-capitalize">
                Ahmedabad, Mumbai , India
              </div>
            </AddressText>
            <button
              type="button"
              className="col-5 btn btn-outline-success text-uppercase mt-2"
              style={{
                borderRadius: "0px",
                marginLeft: "15px",
              }}
            >
              Change Address
            </button>
          </div>
        </div>
      </AddressContainer>
      <Drawer
        anchor={"left"}
        open={state["left"]}
        // onClose={toggleDrawer('left', false)}
      >
        {list("left")}
      </Drawer>
    </div>
  );
}
