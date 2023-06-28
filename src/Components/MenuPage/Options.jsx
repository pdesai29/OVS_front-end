import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  font-family: sans-serif;

  p {
    margin-left: 13%;
    font-size: 18px;
    color: #282c3f;
    margin-bottom: 5px;
    font-weight: bold;
    &:hover {
      color: #002d62;
    }
  }
`;

function Options() {
  const data = JSON.parse(localStorage.getItem("Garage"));
  return (
    <div className="text-right mr-5 mt-2 ml-0">
      <Wrapper>
        {data.categories.map((item) => (
          <p>{item}</p>
        ))}
      </Wrapper>
    </div>
  );
}

export default Options;
