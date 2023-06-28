import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  /*  div {
        // border: 1px solid red;
    } */
`;

const Title = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: #3e4152;
`;

const BillItems = (props) => {
  // console.log("inside bill items");
  const { data } = props;
  // {
  //   console.log(data);
  // }
  return (
    <Wrapper>
      <div className="row justify-content-between mb-2">
        <div className="row col-md-auto align-self-center pr-0">
          <div className="col-1"></div>
          <Title
            className="col text-left pr-0"
            style={{ maxWidth: "220px", paddingLeft: "7px" }}
          >
            {data.name}
            <small
              style={{
                fontSize: "13px",
                marginLeft: "3px",
                marginRight: "0px",
                marginBottom: "2px !important",
              }}
            >
              {data.quantity ? <>(x{data.quantity})</> : <>(x{1})</>}
            </small>
          </Title>
        </div>

        <div className="col  col-md-auto ">
          <p className="  text-muted m-0">
            {" "}
            {/* ₹ {console.log(data)} */}
            {data.quantity ? (
              <>{data.quantity * data.price}</>
            ) : (
              <>{data.price}</>
            )}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default BillItems;
