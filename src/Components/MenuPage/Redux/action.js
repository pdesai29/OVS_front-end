import * as types from "./actionTypes";

const addCartItem = (payload) => ({ type: types.ADD_CART_ITEM, payload });
const incrementQty = (payload) => ({ type: types.INCREMENT_QTY, payload });
const decrementQty = (payload) => ({ type: types.DECREMENT_QTY, payload });
const cartUpdate = (payload) => ({ type: types.EMPTY_CART, payload });

export const handleCart = (data) => (dispatch) => {
  dispatch(addCartItem({ ...data, quantity: 1 }));
};

export const handleIncrement = (data) => (dispatch) => {
  dispatch(incrementQty(data));
};

export const handleDecrement = (data) => (dispatch) => {
  dispatch(decrementQty(data));
};

export const handleCartUpdate = () => (dispatch) => {
  dispatch(cartUpdate());
};
