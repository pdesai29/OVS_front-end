import * as types from "./actionTypes";

const initState = {
  cart: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case types.ADD_CART_ITEM:
      return { cart: [...state.cart, action.payload] };

    case types.INCREMENT_QTY:
      let new_cart = state.cart.map((item) =>
        item._id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return { cart: new_cart };
    case types.DECREMENT_QTY:
      let dec_cart = state.cart.map((item, i) =>
        item._id === action.payload
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      dec_cart = dec_cart.filter((item) => item.quantity > 0);
      return { cart: dec_cart };
    case types.EMPTY_CART:
      return { cart: [] };
    default:
      return state;
  }
};

export default reducer;
