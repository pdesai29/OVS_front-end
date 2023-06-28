import React from "react";
import { Route, Switch } from "react-router-dom";
import LandingPg from "../Components/LandingPage/LandingPg";
import Home from "../Components/GaragePage/Home";
import ShowMoreGarages from "../Components/GaragePage/ShowMoreGarages";
import ServiceList from "../Components/MenuPage/ServiceList";
import CheckoutPage from "../Components/CheckoutPage/CheckoutPage";
import MyAccountPage from "../Components/MyAccount/MyAccountPage";
// import Confirmation from "../Components/CheckoutPage/Customer/Confirmation";
// import Garage from "../Components/Garage/Garage";
import CancelOrder from "../Components/CheckoutPage/Customer/CancelOrder";
export const Routes = () => {
  return (
    <>
      <Switch>
        <Route path="/" exact render={() => <LandingPg />} />
        <Route path="/GarageList" render={() => <Home />} />
        <Route path="/ServiceList" render={() => <ServiceList />} />
        <Route
          path="/CheckoutPage"
          render={(props) => <CheckoutPage {...props} />}
        />
        <Route
          path="/ShowMoreGarages"
          render={(props) => <ShowMoreGarages {...props} />}
        />
        <Route
          path="/my-account"
          render={(props) => <MyAccountPage {...props} />}
        />
        {/* <Route path="/Confirmation" render={() => <Confirmation />} /> */}
        {/* <Route path="/Garage" render={() => <Garage />} /> */}
        <Route path="/CancelOrder" render={() => <CancelOrder />} />
      </Switch>
    </>
  );
};
