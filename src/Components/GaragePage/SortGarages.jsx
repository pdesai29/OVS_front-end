import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import GarageCard from "./GarageCard";
var axios = require("axios");

const Wrapper = styled.div`
  color: #171a29;
  /* // border: 1px solid black; */
  font-family: sans-serif;

  h3 {
    margin: 0px 0px 10px 0px;
    font-weight: bolder;
  }

  .big-box {
    padding: 40px 0px 25px 0px;
  }

  .list-inline-item {
    font-size: 16px;
    font-weight: 300;
    line-height: 1.2;
    color: #686b78;
    cursor: pointer;
    border-radius: 0px;
    &:hover {
      border-bottom: 1px solid black;
    }
  }

  .filter {
    color: black;
  }

  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.15);
`;

const SortGarages = (props) => {
  console.log("props", props.filter, typeof props.filter);
  // const { filter } = props.filter;
  const history = useHistory();
  const [data, setData] = useState([]);
  const [totalGarages, setTotalGarages] = useState();
  const [filter, setFilter] = useState("");
  let customerData;
  // useEffect(() => {
  //   setFilter(props.filter);
  // }, []);
  if (window.localStorage.getItem("customerData")) {
    customerData = JSON.parse(window.localStorage.getItem("customerData"));
  } else {
    let coords = JSON.parse(window.localStorage.getItem("Coordinates"));
    customerData = { geometry: { coordinates: [coords.long, coords.lat] } };
  }
  useEffect(() => {
    setFilter(props.filter);
    var config = {
      method: "get",
      // url: `http://localhost:9000/api/v1/garages/garages-within/5/center/${customerData.geometry.coordinates[1]},${customerData.geometry.coordinates[0]}/unit/km/subCategory/${props.filter}`,
      url: `https://ovs-backend.onrender.com/api/v1/garages/garages-within/5/center/${customerData.geometry.coordinates[1]},${customerData.geometry.coordinates[0]}/unit/km/subCategory/${props.filter}`,

      headers: {},
    };

    axios(config)
      .then(function (response) {
        setData(response.data.garages);
        setTotalGarages(response.data.total);
        // console.log(totalGarages);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  }, []);

  const allData = () => {
    var config = {
      method: "get",
      // url: `http://localhost:9000/api/v1/garages/garages-within/5/center/${customerData.geometry.coordinates[1]},${customerData.geometry.coordinates[0]}/unit/km/subCategory/${props.filter}`,
      url: `https://ovs-backend.onrender.com/api/v1/garages/garages-within/5/center/${customerData.geometry.coordinates[1]},${customerData.geometry.coordinates[0]}/unit/km/subCategory/${props.filter}`,

      headers: {},
    };

    axios(config)
      .then(function (response) {
        setData(response.data.current);
        history.push("/temp");
        history.push("/GarageList");
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

  console.log(data);

  const filterData = (sort) => {
    var config = {
      method: "get",
      // url: `http://localhost:9000/api/v1/garages/garages-within/5/center/${customerData.geometry.coordinates[1]},${customerData.geometry.coordinates[0]}/unit/km/subCategory/${props.filter}`,
      url: `https://ovs-backend.onrender.com/api/v1/garages/garages-within/5/center/${customerData.geometry.coordinates[1]},${customerData.geometry.coordinates[0]}/unit/km/subCategory/${props.filter}`,

      headers: {},
    };

    axios(config)
      .then(function (response) {
        // console.log(response.data.current);
        setData(response.data.current);
      })
      .catch(function (error) {
        // console.log(error.response.data);
      });
  };

  return (
    <Wrapper>
      <div className="container-fluid ">
        <div className="big-box align-self-center">
          <div
            className="row mb-0 pb-0"
            style={{ borderBottom: "3px solid whitesmoke" }}
          >
            <div className="col-lg-8">
              <h3 className="text-left">
                <button className="btn btn-sm" onClick={allData}></button>
                {totalGarages} Garages
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div
        className="row row-cols-4"
        style={{
          width: "100%",
          margin: "auto",
        }}
      >
        {data.map((item) => (
          <GarageCard data={item} key={item._id} />
        ))}
      </div>
    </Wrapper>
  );
};

export default SortGarages;
