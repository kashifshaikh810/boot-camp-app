import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../Authentication/Login";
import Signup from "../Authentication/Signup";
import Dashboard from "../Dashboard/index";
import AboutUs from "../AboutUs/index";
import AddItems from "../AddItems/index";
import Orders from "../Orders/index";
import ContactUs from "../ContactUs/index";
import Message from "../BuyerMessages/index";
import Header from "../Header/index";
import Footer from "../Footer/index";
import YourOrders from "../Your Orders/index";
import ShowCarts from "../ShowCarts/index";
import CheckOutForm from "../CheckOutForms/index";
import firebase from "firebase/app";

const Routing = () => {
  const [uid, setUid] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    firebase.auth().onAuthStateChanged((user) => {
      let uid = user?.uid;
      setUid(uid);
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    });
  }, [uid]);

  return (
    <>
      {isLoading ? (
      <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: isLoading ? 'progress' : 'default'}}>
        <div class="spinner-border text-success" style={{width: '4rem', height: '4rem'}} role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        </div>
      ) : (
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            {uid === undefined ? (
              <Route path="/login" component={Login} />
            ) : null}
            {uid === undefined ? (
              <Route path="/signup" component={Signup} />
            ) : null}
            <Route path="/aboutus" component={AboutUs} />
            <Route path="/additems" component={AddItems} />
            <Route path="/orders" component={Orders} />
            <Route path="/contactus" component={ContactUs} />
            <Route path="/message" component={Message} />
            <Route path="/showcarts" component={ShowCarts} />
            <Route path="/checkoutform" component={CheckOutForm} />
            <Route path="/yourorders" component={YourOrders} />
          </Switch>
          <Footer />
        </Router>
      )}
    </>
  );
};

export default Routing;
