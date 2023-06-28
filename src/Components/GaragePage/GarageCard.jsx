import React from "react";
import styled from "styled-components";
// import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

const Div = styled.div`
  font-family: sans-serif !important;
  overflow: hidden;
  border: 0;
  width: 18.2rem !important;
  border: 1px solid white;
  border-radius: 0px;
  div > span {
    margin-right: 12px;
  }
  &:hover {
    cursor: pointer;
    border: 1px solid #d3d5df;
    box-shadow: 0 4px 7px 0 rgba(218, 220, 230, 0.6);
  }
`;

const Tag = styled.p`
  font-weight: 300 !important;
  color: #686b78;
  font-size: 13px !important;
  margin-top: 3px !important;
`;

const Badge = styled.span`
  fontsize: 14px;
  padding: 5px;
  border-radius: 0px;
  background-color: ${(props) => {
    if (props.rating < 4) {
      return "#db7c38";
    } else {
      return "none";
    }
  }};
`;

const QuickView = styled.div`
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const Discount = styled.p`
  font-size: 14px !important;
  line-height: 1.2 !important;
  font-weight: 400 !important;
  color: #8a584b;
  margin-top: 15px;
`;

const GarageCard = (props) => {
  const history = useHistory();

  const { data } = props;

  const goTo = () => {
    localStorage.setItem("Garage", JSON.stringify(data));
    history.push("/ServiceList");
  };
  return (
    <>
      <div className="col">
        <Div className="card mb-2 btn" onClick={goTo}>
          <img
            className="card-img-top align-self-center mt-3 "
            src={data.img_url}
            alt="Garage Img"
            style={{
              width: "90%",
              borderRadius: "0px",
            }}
          />
          <div className="card-body text-left">
            <h5 className="card-title" style={{ color: "#171a29" }}>
              {data.name}
              <br />
              <Tag>{data.categories.join(", ")}</Tag>
            </h5>
            <div
              className="card-text font-weight-normal"
              style={{ fontSize: "12px" }}
            >
              <Badge
                rating={data.ratingsAverage}
                className="badge badge-success"
              >
                <i className="fas fa-star mr-1"></i>
                {data.ratingsAverage}
              </Badge>
              <span>Contact Number : {data.phonenumber}</span>

              <div className="dropdown-divider"></div>
              <Discount className="font-weight-normal">
                50% off | Use FirstService50
              </Discount>
              <QuickView
                className="text-center font-weight-bold mb-0"
                style={{ color: "#5d8ed5" }}
              >
                <div className="dropdown-divider"></div>
                QUICK VIEW
              </QuickView>
            </div>
          </div>
        </Div>
      </div>
    </>
  );
};

export default GarageCard;
