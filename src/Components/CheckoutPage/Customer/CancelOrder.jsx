import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
const Wrapper = styled.div`
  padding-left: 0px !important;

  div {
    /* // border: 1px solid red !important; */
    padding-right: 0px !important;
    padding-left: 0px !important;
  }
`;

const Title = styled.p`
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 17px !important;
  color: #282c3f;
  font-weight: 500;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  line-height: 1rem;
`;

const CancelOrder = () => {
  const history = useHistory();
  console.log("inside time out callback");
  (() => {
    setTimeout(() => {
      history.push({ pathname: "/my-account" });
    }, 3000);
  })();
  return (
    <Wrapper>
      <div className="row mb-3">
        <div className="col-2 col-md-auto"></div>
        <div className="col row-cols-1 text-truncate ml-2">
          <div className="col">
            <Title>"Canceling your order"</Title>
          </div>
          <div className="col text-truncate text-muted font-weight-light"></div>
        </div>
      </div>
    </Wrapper>
  );
};

export default CancelOrder;
