import React, { useState, useEffect } from "react";
import MyAccNavigator from "./MyAccNavigator";
import Container from "./Container";
import styled from "styled-components";
import axios from "axios";

const Wrapper = styled.div`
  font-family: ProximaNova, Arial, Helvetica Neue, sans-serif;
  letter-spacing: 0;
  background: #002d62;
  min-height: calc(100vh - 368px);
  position: relative;
  z-index: 2;
  padding-bottom: 60px;
  h4 {
    text-transform: capitalize;
  }
`;

const Title = styled.div`
  height: 130px;
  background: inherit;
  color: #fff;
  font-size: 32px;
  font-weight: 600;
  margin: auto;
  margin-top: 110px;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  justify-content: left;
  cursor: pointer;
  contain: strict;
`;

const Edit = styled.button`
  border: 1px solid hsla(0, 0%, 100%, 0.6);
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  color: #fff;
  border-radius: 0;
  padding: "12px !important";
  margin-bottom: "20px";
`;

const MyAccountPage = () => {
  const [data, setData] = useState({});
  const id = JSON.parse(localStorage.getItem("customerData"))._id;

  useEffect(() => {
    var config = {
      method: "get",
      // https://ovs-backend.onrender.com/
      // url: `http://localhost:9000/api/v1/users/${id}`,
      url: `https://ovs-backend.onrender.com/api/v1/users/${id}`,

      headers: {},
    };

    axios(config)
      .then(function (response) {
        setData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      <MyAccNavigator />
      <Wrapper>
        <div className="container-fluid" style={{ width: "90%" }}>
          <div className="row ">
            <Title className="col-lg-12">
              <div className="row">
                <div className="col">
                  <div className="col text-left text-capitalize">
                    {data.name}
                  </div>
                  <div class="w-100"></div>
                  <p
                    className="col text-left"
                    style={{
                      fontSize: "16px",
                      fontWeight: 300,
                    }}
                  >
                    {data.phonenumber}{" "}
                    <span
                      className="align-items-end mb-2 mr-3 ml-3"
                      style={{
                        fontSize: "20px",
                      }}
                    >
                      |
                    </span>{" "}
                    {data.email}
                  </p>
                </div>
                <div className="col-md-auto align-self-center">
                  <Edit type="button" className="btn btn-lg ">
                    Edit profile
                  </Edit>
                </div>
              </div>
            </Title>
            <div
              className="col"
              style={{
                backgroundColor: "white",
              }}
            >
              {" "}
              <Container />
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default MyAccountPage;
