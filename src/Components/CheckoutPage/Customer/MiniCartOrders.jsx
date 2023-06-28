import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Garagedisplay from "./Garagedisplay";
import BillItems from "./BillItems";
import { useSelector } from "react-redux";

const Wrapper1 = styled.div`
  overflow: hidden;
  font-family: sans-serif;
  line-height: 1.2;
`;

const Wrapper2 = styled.div`
  font-family: sans-serif;
`;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const state = useSelector((state) => state);

  useEffect(() => {
    setOrders(JSON.parse(localStorage.getItem("cart")));
  }, []);

  // console.log(orders);
  // console.log(state);

  return (
    <>
      <Wrapper1 className="container">
        <div className="col text-left">
          <Garagedisplay />
        </div>
      </Wrapper1>
      <Wrapper2 className="container">
        <div className="row  text-left">
          <div className="col">
            {state.cart.map(
              (item) => item.quantity > 0 && <BillItems data={item} />
            )}
          </div>
        </div>
      </Wrapper2>{" "}
    </>
  );
};

export default Orders;
