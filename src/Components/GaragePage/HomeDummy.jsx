import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import axios from "axios";

import GarageCard from "./GarageCard";
import MoreCard from "./MoreCard";
import Promotions from "./Promotions";

const Wrapper = styled.div`
  color: #535665;
  font-family: sans-serif;

  p {
    font-size: 16px;
    font-weight: 600;
    text-transform: capitalize;
    margin-bottom: 1px;
  }

  small {
    color: "light grey";
    font-size: 10px;
    opacity: 0.8;
    text-transform: uppercase;
    margin-top: 1px;
    font-weight: 300;
  }

  .item {
    padding-left: 25px;
    padding-top: 15px;
    padding-bottom: 15px;

    &:hover {
      background-color: #002d62;
      color: white;
      a {
      text-decoration: none;
      background-color: #002d62;
      color: white;
    
    }
    
    }
     a {
      text-decoration: none;
      color: #535665;
    
    }
  }

  .topHeader {
    margin-top: 1px;
    position: sticky;
    top: 90px;
  }


  }

  .content {
    p {
      margin: 0;
      margin-top: 0.5rem;
      line-height: 1.2;
    }
    small {
      margin: 0;
    }
  }

  .img-wrap {
    i {
      width: 40px;
      font-size: 2rem;
    }
  }
`;

const Section = styled.div`
  /* // border: 1px solid red; */
  margin-top: 30px;
  padding-bottom: 10px;
  border-bottom: 1px dashed #bebfc5;
`;

const Title = styled.p`
  /*  // border: 1px solid black; */
  font-size: 28px !important;
  font-weight: 600;
  color: #282c3f;
  line-height: 1.2;
  margin-left: 12px;
`;

function HomeDummy() {
  const history = useHistory();
  const [topPicks, setTopPicks] = useState([]);
  const [twoWheelerOnly, setTwoWheelerOnly] = useState([]);
  const [newlyAdded, setNewlyAdded] = useState([]);
  const [fourWheelerOnly, setFourWheelerOnly] = useState([]);
  const [threeWheelerOnly, setThreeWheelerOnly] = useState([]);

  const [totalTwoWheelerOnly, setTotalTwoWheelerOnly] = useState([]);
  const [totalNewlyAdded, setTotalNewlyAdded] = useState([]);
  const [totalFourWheelerOnly, setTotalFourWheelerOnly] = useState([]);
  const [totalThreeWheelerOnly, setTotalThreeWheelerOnly] = useState([]);
  const [totalTopPicks, setTotalTopPicks] = useState([]);

  const userData = JSON.parse(window.localStorage.getItem("customerData"));
  const coords = JSON.parse(window.localStorage.getItem("Coordinates"));

  const getData = (filter, userData) => {
    let config;
    if (userData) {
      console.log("inside if");
      config = {
        method: "get",
        url: `https://ovs-backend.onrender.com/api/v1/garages/garages-within/2/center/${userData.geometry.coordinates[1]},${userData.geometry.coordinates[0]}/unit/km/subCategory/${filter}`,
        headers: {},
      };
    } else {
      console.log("inside else");
      config = {
        method: "get",
        url: `https://ovs-backend.onrender.com/api/v1/garages/garages-within/2/center/${coords.lat},${coords.long}/unit/km/subCategory/${filter}`,
        headers: {},
      };
    }

    axios(config)
      .then(function (response) {
        if (filter === "top-pick") {
          setTopPicks(response.data.garages);
          setTotalTopPicks(response.data.results);
        } else if (filter === "two-wheeler-only") {
          setTwoWheelerOnly(response.data.garages);
          setTotalTwoWheelerOnly(response.data.results);
        } else if (filter === "newly-added") {
          setNewlyAdded(response.data.garages);
          setTotalNewlyAdded(response.data.results);
        } else if (filter === "four-wheeler-only") {
          setFourWheelerOnly(response.data.garages);
          setTotalFourWheelerOnly(response.data.results);
        } else if (filter === "three-wheeler-only") {
          setThreeWheelerOnly(response.data.garages);
          setTotalThreeWheelerOnly(response.data.results);
        }
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    if (window.localStorage.getItem("Coordinates")) {
      // const { lat, long, area, place_name } = JSON.parse(
      //   window.localStorage.getItem("Coordinates")
      // );
      // const updateUserGeometry = async () => {
      //   const result = await axios.patch(
      //     `http://localhost:9000/api/v1/users/${userData?._id}`,
      //     {
      //       geometry: {
      //         type: "Point",
      //         coordinates: [long, lat],
      //         area: area,
      //         place_name: place_name,
      //       },
      //     },
      //     {
      //       "Content-Type": "application/json",
      //     }
      //   );
      // };
      // updateUserGeometry();
    }
    // console.log("inside useEffect");
    getData("top-pick", userData);
    getData("two-wheeler-only", userData);
    getData("newly-added", userData);
    getData("four-wheeler-only", userData);
  }, []);

  return (
    <>
      <Promotions />

      <div className="container">
        <Wrapper>
          <div className="row">
            <div className="col-3">
              <div className="border-left border-right border-bottom shadow topHeader pt-5">
                <div className="item img-wrap ">
                  <a href="#topPicks">
                    <div className="row" id="list">
                      <div className="col-3 p-1 ">
                        <i class="fas fa-fire "></i>
                      </div>
                      <div className="col-9 text-left content">
                        <p>Top Picks</p>
                        <small>{totalTopPicks} OPTIONS</small>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="item img-wrap">
                  <a href="#twoWheelerOnly">
                    <div className="row">
                      <div className="col-3 text-center img-wrap">
                        <i class="fas fa-biking"></i>
                      </div>
                      <div className="col-9 text-left content">
                        <p>Two Wheeler only</p>
                        <small>{totalTwoWheelerOnly} OPTIONS</small>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="item img-wrap ">
                  <a href="#newlyAdded">
                    <div className="row">
                      <div className="col-3 text-right img-wrap">
                        <i class="fas fa-smile"></i>
                      </div>
                      <div className="col-9 text-left content">
                        <p>Newly Added</p>
                        <small>{totalNewlyAdded} OPTIONS</small>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="item img-wrap">
                  <a href="#fourWheelerOnly">
                    <div className="row">
                      <div className="col-3 text-center img-wrap">
                        <i class="fas fa-car"></i>
                      </div>
                      <div className="col-9 text-left content">
                        <p>Four Wheeler Only</p>
                        <small>{totalFourWheelerOnly} OPTIONS</small>
                      </div>
                    </div>
                  </a>
                </div>

                <div className="item img-wrap">
                  <a href="#seeAll">
                    <div className="row">
                      <div className="col-3 text-center img-wrap ">
                        <i class="fas fa-arrow-down"></i>
                      </div>
                      <div className="col-9 text-left  mb-5 content">
                        <p>SEE ALL</p>
                        <small>Garages</small>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div
              className="col-9"
              data-spy="scroll"
              data-target="#list"
              data-offset="0"
            >
              <Section className="row">
                <Title id="topPicks">Top Pics</Title>
                <div className="row row-cols-3">
                  {topPicks.map(
                    (item, index) =>
                      index < 6 && <GarageCard data={item} key={item._id} />
                  )}
                  {totalTopPicks - 5 > 0 ? (
                    <MoreCard filter={"top-pick"} more={totalTopPicks - 5} />
                  ) : (
                    <></>
                  )}
                </div>
              </Section>
              <Section className="row">
                <Title id="twoWheelerOnly">Two Wheeler Only</Title>
                <div className="row row-cols-3 justify-content-center">
                  {twoWheelerOnly.map(
                    (item, index) =>
                      index < 6 && <GarageCard data={item} key={item._id} />
                  )}
                  {totalTwoWheelerOnly - 5 > 0 ? (
                    <MoreCard
                      filter={"two-wheeler-only"}
                      more={totalTwoWheelerOnly - 5}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </Section>
              <Section className="row">
                <Title id="newlyAdded">Newly Added</Title>
                <div className="row row-cols-3 justify-content-center">
                  {newlyAdded.map(
                    (item, index) =>
                      index < 6 && <GarageCard data={item} key={item._id} />
                  )}
                  {totalNewlyAdded - 5 > 0 ? (
                    <MoreCard
                      filter={"newly-added"}
                      more={totalNewlyAdded - 5}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </Section>
              <Section className="row">
                <Title id="fourWheelerOnly">Four Wheeler Only</Title>
                <div className="row row-cols-3 justify-content-center">
                  {fourWheelerOnly.map(
                    (item, index) =>
                      index < 6 && <GarageCard data={item} key={item._id} />
                  )}
                  {totalFourWheelerOnly - 5 > 0 ? (
                    <MoreCard
                      filter={"four-wheeler-only"}
                      more={totalFourWheelerOnly - 5}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </Section>
            </div>
          </div>
        </Wrapper>
      </div>
    </>
  );
}

export default HomeDummy;
