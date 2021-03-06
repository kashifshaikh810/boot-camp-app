/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import * as Icon from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";
import './index.css'

const Dashboard = () => {
  const [allItems, setAllItems] = useState([]);
  let history = useHistory();
  const [uid, setUid] = useState("");
  const [pushKey, setPushKey] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [didMount, setDidMount] = useState(false); 
  const [role, setRole] = useState("");

  const addCarts = (e, items) => {
    e.preventDefault();
    if (!uid) {
      history.push("/login");
    } else {
      let productPrice = items.productPrice;
      let totalPrice = items.productPrice;
      let productTitile = items.productTitile;
      let yourLocation = items.yourLocation;
      let productImage = items.productImage;
      let productCondition = items.productCondition;
      let description = items.description;
      let productValue = 1;
      let uid = firebase.auth()?.currentUser?.uid;
      firebase.database().ref(`/addCarts/${uid}`).push({
        productTitile: productTitile,
        productPrice: productPrice,
        productCondition: productCondition,
        yourLocation: yourLocation,
        productImage: productImage,
        description: description,
        productValue: productValue,
        totalPrice: totalPrice,
      });
      alert("Congratulations... Cart Added Successfully.. !");
    }
  };

  const removeCart = (e, i) => {
    e.preventDefault();
    firebase.database().ref(`/addItems/${uid}/${pushKey[i]}`).remove()
    alert('Deleted Successfully...')
  }

  useEffect(() => {
    setDidMount(true)
    firebase
      .database()
      .ref(`/addItems/`)
      .on("value", (snapshot) => {
        let data = snapshot.val() ? Object.values(snapshot.val()) : [];
        data.forEach((item) => {
          let newData = Object.values(item);
          let pushKey = Object.keys(item);
          setPushKey(pushKey);
          setAllItems(newData);
        });
      });

    firebase.auth().onAuthStateChanged((user) => {
      let uid = user?.uid;
      let use = user ? user : '';
      setRole(use.email);
      setUid(uid);
    });
    return () => setDidMount(false);
  }, []);

  return (
    <div style={{ height: "auto", marginBottom: 60, overflow: 'scroll' }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
        className="headerContainer">
          <p
            className="home-head"
          >
            Home Page
          </p>
        </div>
      </div>

          <div
            style={{
              display: "flex",
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}
          >
            <div>
              <img
                src={"./off.jpg"}
                style={{ maxWidth: '100%', height: 500, borderRadius: 20 }}
              />
            </div>
            <div>
              <img
                src={"./offTwo.jpg"}
                style={{
                  maxWidth: "100%",
                  height: 400,
                  marginLeft: 7,
                  borderRadius: 20,
                }}
              />
            </div>
          </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="items-header-container"
        >
          <p
            className="items-header"
          >
           { role === 'admin@gmail.com' ?  "See Your Items You Can Sell Now" : "Available Items You Can Buy Now"}
          </p>
        </div>
      </div>

          <div  style={{ display: "flex", justifyContent: 'space-around', flexWrap: 'wrap'}} >
      {allItems.length > 0 ? allItems.map((val, index) => {
        return (
            <div
              className="card card-container"
            >
              <div>
                <img
                  src={val.productImage}
                  style={{ width: "100%", height:300, borderRadius: 20 }}
                />
                <div style={{ marginTop: 20 }}>
                  <div style={{ display: "flex", marginLeft: 10, maxWidth: '100%',
                        minWidth: '80%' }}>
                    <p
                      style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        fontStyle: "revert",
                      }}
                    >
                      Product Titile :
                    </p>
                    <p
                      style={{
                        marginLeft: 5,
                        fontSize: 20,
                        fontStyle: "revert",
                        
                      }}
                    >
                      {val.productTitile}
                    </p>
                  </div>
                  <div style={{ display: "flex", marginLeft: 10, }}>
                    <p
                      style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        fontStyle: "revert",
                      }}
                    >
                      Product Price :
                    </p>
                    <p
                      style={{
                        marginLeft: 5,
                        fontSize: 20,
                        fontStyle: "revert",
                        maxWidth: '50%',
                      }}
                    >
                      ${val.productPrice} 
                    </p>
                  </div>

                  <div style={{ display: "flex", marginLeft: 10 }}>
                    <p
                      style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        fontStyle: "revert",
                        maxWidth: '70%'
                      }}
                    >
                      Location :
                    </p>
                    <p
                      style={{
                        marginLeft: 5,
                        fontSize: 20,
                        fontStyle: "revert",
                        maxWidth: '40%'
                      }}
                    >
                      {val.yourLocation}
                    </p>
                  </div>

                  <div style={{ display: "flex", marginLeft: 10 }}>
                    <p
                      style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        fontStyle: "revert",
                      }}
                    >
                      Product Condition :
                    </p>
                    <p
                      style={{
                        marginLeft: 5,
                        fontSize: 20,
                        fontStyle: "revert",
                        maxWidth: '100%'
                      }}
                    >
                      {val.productCondition}
                    </p>
                  </div>

                  <div style={{ display: "flex", marginLeft: 10 }}>
                    <p
                      style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        fontStyle: "revert",
                        height: 30,
                        maxWidth: "40%",
                      }}
                    >
                      Description :
                    </p>
                    <p
                      style={{
                        marginLeft: 5,
                        fontSize: 20,
                        fontStyle: "revert",
                        maxWidth: "60%",
                        maxHeight: 200,
                      }}
                    >
                      {val.description}
                    </p>
                  </div>
                </div>
               {role === 'admin@gmail.com' ? null : <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    className="btn btn-primary"
                    style={{
                      boxShadow: "rgb(179 179 179) 0px 1px 20px 0px",
                    }}
                    onClick={(e) => addCarts(e, val)}
                  >
                    Add to Cart
                    <Icon.Cart4
                      style={{
                        marginBottom: 5,
                        padding: 0,
                        marginLeft: 10,
                        fontSize: 25,
                      }}
                    />
                  </button> 
                </div>}

                {role === 'admin@gmail.com' ? <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    className="btn btn-danger"
                    onClick={(e) => removeCart(e, index)}
                  >
                    Remove Cart
                    <Icon.CartX
                      style={{
                        marginBottom: 5,
                        padding: 0,
                        marginLeft: 10,
                        fontSize: 25,
                      }}
                    />
                  </button> 
                </div> : null}
              </div>
            </div>
              );
            }) : <p style={{textAlign: 'center', fontSize: 25}}>Admin No Carts Added</p>}
          </div>
    </div>
  );
};

export default Dashboard;
