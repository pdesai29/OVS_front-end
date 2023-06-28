import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Wrapper = styled.div`
  /*  // width: 10rem !important; */
  height: 250px;
  /*   // border: 1px solid red; */
  margin: 22px 0;
`;

const Button = styled.button`
  width: 80%;
  height: 90%;
  border-radius: 0px;
  font-size: 24px;
  line-height: 1.2;
  border: 2px solid #002d62;
  font-weight: 600;
  color: #002d62 !important;
  &:hover {
    box-shadow: 0 4px 14px #d4d5d9;
  }
`;

const MoreCard = (props) => {
  const history = useHistory();
  const { filter, more } = props;

  const handleMore = () => {
    history.push({
      pathname: "/ShowMoreGarages",
      filter: filter,
    });
  };

  return (
    <>
      <Wrapper className="justify-content-center" onClick={handleMore}>
        <Button type="button" className="btn">
          +{more} MORE
        </Button>
      </Wrapper>
    </>
  );
};

export default MoreCard;
