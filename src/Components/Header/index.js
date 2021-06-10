/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useState, useEffect} from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import * as Icon from 'react-bootstrap-icons';
import firebase from 'firebase/app';
import { useHistory } from "react-router-dom";

const Header = () => {
  let history = useHistory();
  const [uid, setUid] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [didMount, setDidMount] = useState(false); 
  const [msgLength, setMsgLength] = useState('')
  const [allItems, setAllItems] = useState([]);
  const [currUser, setCurrUser] = useState('')

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

  const goYourOrder = () => {
    history.push('/yourorders')
  };

  const goShowCarts = () => {
    history.push('/showcarts')
  }

    useEffect(() => {
      setDidMount(true)
      firebase.auth().onAuthStateChanged((user) => {
        let uid = user?.uid;
        setUid(uid);
        firebase
          .database()
          .ref(`/addCarts/${uid}`)
          .on("value", (snapshot) => {
            let data = snapshot.val() ? Object.values(snapshot.val()) : [];
            setAllItems(data);
          });

          firebase
          .database()
          .ref(`/contactUs/`)
          .on("value", (snapshot) => {
            let data = snapshot.val() ? Object.values(snapshot.val()) : [];
            let ka = []
            data.forEach((item) => {
             let as = Object.keys(item)
             as.forEach((val) => {
              ka.push(val)
              setMsgLength(ka.length);
            })
            })
          });
                firebase
                .database()
                .ref(`/newUser/${uid}`)
                .on("value", (snapshot) => {
                  let data = snapshot.val() ? snapshot.val() : [];
                  setCurrUser(data)
                });
      });
    return () => setDidMount(false);
    },[])

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

           {currUser.email === 'admin@gmail.com' ? <li className="nav-item" onClick={goAddItems}>
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
            </li> : null}

           { uid ? currUser.email === 'admin@gmail.com' ?  null : <li className="nav-item" onClick={goContactus}>
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
            </li> : null}

           {currUser.email === 'admin@gmail.com' ? <li className="nav-item" onClick={goOrders}>
              <span
                className="nav-link"
                style={{
                  paddingLeft: 20,
                  cursor: "pointer",
                  fontSize: 20,
                  paddingTop: 20,
                }}
              >
               Buyer Orders
              </span>
            </li> : null }

          { currUser.email === 'admin@gmail.com' ? <li className="nav-item" onClick={goMessage}>
              <span
                className="nav-link"
                style={{
                  paddingLeft: 20,
                  cursor: "pointer",
                  fontSize: 20,
                  paddingTop: 20,
                }}
              >
               {uid ? msgLength === '' ? null :  <div style={{position: 'absolute', left: '40%', top: 0, width: 28, height: 28, backgroundColor: 'red', borderRadius: 18}}>
                <p style={{color: '#f1f1f1', textAlign: 'center', paddingTop: 2}}>{msgLength}</p>
                </div> : null}
                Messages
              </span>
            </li> : null}

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

         { uid ? <div className="nav-item">
              <span 
                className="nav-link"
                style={{fontSize: 20, color: '#f3f3f3'}}><b style={{color: 'black', marginRight: 5}}> Hello Dear, </b>  {currUser.firstName}</span>
            </div> : null }

         { uid ? currUser.email === 'admin@gmail.com' ?  null : <div className="nav-item" onClick={goShowCarts}>
          <span
                className="nav-link"
                style={{
                  fontSize: 20,
                  color: '#f1f1f1'
                }}
              >
                {allItems.length > 0 ? <span style={{position: 'absolute', zIndex: 1, top: 3, right: '28vh', backgroundColor: '#f36e36', width: 30, height: 30, borderRadius: 15, color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer',}}>{allItems.length}</span> : null}
                <Icon.Cart4 style={{marginBottom: 6, marginLeft: 10, color: 'black', fontSize: 45, cursor: 'pointer', }} />
              </span>
          </div> : null }

        {uid ? currUser.email === 'admin@gmail.com' ?  null : <div className="nav-item" onClick={goYourOrder}>
          <span
                className="nav-link"
                style={{
                  paddingLeft: 20,
                  cursor: "pointer",
                  fontSize: 20,
                }}
              >
                Your Orders
              </span>
          </div> : null}

         {uid ? <button type="button" className="btn btn-outline-success" onClick={logBtn}>Log Out</button> : null}
        </div>
      </div>
    </h1>
  );
};

export default Header;
