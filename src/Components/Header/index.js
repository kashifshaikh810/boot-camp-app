/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useState, useEffect} from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import firebase from 'firebase/app';
import { useHistory } from "react-router-dom";

const Header = () => {
  let history = useHistory();
  const [uid, setUid] = useState('')

  const goHome = () => {
    history.push("/");
  };

  const goLogin = () => {
    history.push("/login");
  };

  const goSignup = () => {
    history.push("/signup");
  };

  const goAboutus = () => {
    history.push("/aboutus");
  };

  const goAddItems = () => {
    history.push("/additems");
  };

  const goOrders = () => {
    history.push("/orders");
  };

  const goContactus = () => {
    history.push("/contactus");
  };

  const goMessage = () => {
    history.push("/message");
  };

  const logBtn = () => {
    firebase.auth().signOut();
    history.push('/login')
  };

    useEffect(() => {
      firebase.auth().onAuthStateChanged((user) => {
        let uid = user?.uid;
        setUid(uid);
      });
    },[uid])

  return (
    <h1>
      <div className="navbar">
        <div className="container-fluid">
          <ul
            className="navbar-nav me-auto mb-2 mb-lg-0"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <li>
              <p className="htext">Boot Camp App</p>
            </li>

            <li className="nav-item" onClick={goHome}>
              <span
                className="nav-link"
                style={{
                  paddingLeft: 10,
                  cursor: "pointer",
                  fontSize: 20,
                  paddingTop: 20,
                }}
              >
                Home
              </span>
            </li>
            
            { uid === undefined ? <li className="nav-item" onClick={goLogin}>
              <span
                className="nav-link"
                style={{
                  paddingLeft: 20,
                  cursor: "pointer",
                  fontSize: 20,
                  paddingTop: 20,
                }}
              >
                Login
              </span>
            </li> : null}
           
           { uid === undefined ? <li className="nav-item" onClick={goSignup}>
              <span
                className="nav-link"
                style={{
                  paddingLeft: 20,
                  cursor: "pointer",
                  fontSize: 20,
                  paddingTop: 20,
                }}
              >
                SignUp
              </span>
            </li> : null}

            <li className="nav-item" onClick={goAddItems}>
              <span
                className="nav-link"
                style={{
                  paddingLeft: 20,
                  cursor: "pointer",
                  fontSize: 20,
                  paddingTop: 20,
                }}
              >
                Add Items
              </span>
            </li>

            <li className="nav-item" onClick={goContactus}>
              <span
                className="nav-link"
                style={{
                  paddingLeft: 20,
                  cursor: "pointer",
                  fontSize: 20,
                  paddingTop: 20,
                }}
              >
                Contact Us
              </span>
            </li>

            <li className="nav-item" onClick={goOrders}>
              <span
                className="nav-link"
                style={{
                  paddingLeft: 20,
                  cursor: "pointer",
                  fontSize: 20,
                  paddingTop: 20,
                }}
              >
                Orders
              </span>
            </li>

            <li className="nav-item" onClick={goMessage}>
              <span
                className="nav-link"
                style={{
                  paddingLeft: 20,
                  cursor: "pointer",
                  fontSize: 20,
                  paddingTop: 20,
                }}
              >
                Message
              </span>
            </li>

            <li className="nav-item" onClick={goAboutus}>
              <span
                className="nav-link"
                style={{
                  paddingLeft: 20,
                  cursor: "pointer",
                  fontSize: 20,
                  paddingTop: 20,
                }}
              >
                About Us
              </span>
            </li>
          </ul>
         {uid ? <button type="button" className="btn btn-outline-success" onClick={logBtn}>Log Out</button> : null}
        </div>
      </div>
    </h1>
  );
};

export default Header;
