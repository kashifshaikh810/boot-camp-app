import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
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
  const [currUser, setCurrUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    firebase.auth().onAuthStateChanged((user) => {
      let uid = user?.uid;
      let use = user?.email;
      setCurrUser(use);
      setUid(uid);
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    });
  }, [uid]);

  return (
    <>
      {isLoading ? (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: isLoading ? "progress" : "default",
          }}
        >
            <p style={{fontSize: 25, marginRight: 20, marginTop: 10, fontWeight: 'bold'}}>Loading... please Wait a movement... !</p>
          <div
            className="spinner-border text-success"
            style={{ width: "4rem", height: "4rem" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <Router>
          <Header />
          <Switch>
            <Route path="/aboutus" component={AboutUs} />
            <Route exact path="/" component={Dashboard} />
          </Switch>
          {uid === undefined ? (
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
            </Switch>
          ) : (
            <Redirect to="/" />
          )}
          {currUser === "admin@gmail.com" && !uid ? (
            <Redirect to="/" />
          ) : (
            <Switch>
              <Route path="/contactus" component={ContactUs} />
              <Route path="/yourorders" component={YourOrders} />
              <Route path="/checkoutform" component={CheckOutForm} />
              <Route path="/showcarts" component={ShowCarts} />
            </Switch>
          )}
          {currUser === "admin@gmail.com" && uid ? (
            <Switch>
              <Route path="/additems" component={AddItems} />
              <Route path="/orders" component={Orders} />
              <Route path="/message" component={Message} />
            </Switch>
          ) : (
            <Redirect to="/" />
          )}
          <Footer />
        </Router>
      )}
    </>
  );
};

export default Routing;
