/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import * as Icon from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const [allItems, setAllItems] = useState([]);
  let history = useHistory();
  const [uid, setUid] = useState("");

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

  useEffect(() => {
    firebase
      .database()
      .ref(`/addItems/`)
      .on("value", (snapshot) => {
        let data = snapshot.val() ? Object.values(snapshot.val()) : [];
        data.forEach((item) => {
          let newData = Object.values(item);
          setAllItems(newData);
        });
      });

    firebase.auth().onAuthStateChanged((user) => {
      let uid = user?.uid;
      setUid(uid);
    });
  }, []);

  return (
    <div style={{ height: "auto", marginBottom: 60 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "#b3b3b3",
            display: "flex",
            justifyContent: "center",
            paddingTop: 10,
            borderRadius: 10,
            width: "70%",
            boxShadow: "rgb(179 179 179) 0px 1px 20px 0px",
          }}
        >
          <p
            style={{
              fontSize: 25,
              fontWeight: "bold",
              color: "white",
              fontStyle: "revert",
            }}
          >
            Home Page
          </p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <div
          className="card"
          style={{
            width: "95%",
            height: "50vh",
            paddingTop: 10,
            backgroundColor: "#f2f2f2",
            borderRadius: 20,
            boxShadow: "rgb(179 179 179) 0px 1px 20px 0px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginLeft: 20,
            }}
          >
            <div>
              <img
                src={"./off.jpg"}
                style={{ width: "140%", height: "45vh", borderRadius: 20 }}
              />
            </div>
            <div>
              <img
                src={"./offTwo.jpg"}
                style={{
                  width: "95%",
                  height: "45vh",
                  marginLeft: 7,
                  borderRadius: 20,
                }}
              />
            </div>
          </div>
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
          style={{
            backgroundColor: "#b3b3b3",
            display: "flex",
            justifyContent: "center",
            paddingTop: 10,
            borderRadius: 10,
            width: "30%",
            marginTop: 10,
            boxShadow: "rgb(179 179 179) 0px 1px 20px 0px",
          }}
        >
          <p
            style={{
              fontSize: 25,
              fontWeight: "bold",
              color: "white",
              fontStyle: "revert",
            }}
          >
            Available Items You Can Buy Now
          </p>
        </div>
      </div>

      {allItems.map((val) => {
        return (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              className="card"
              style={{
                width: "30%",
                height: "90vh",
                backgroundColor: "#f2f2f2",
                borderRadius: 20,
                margin: 20,
                marginLeft: 40,
                boxShadow: "rgb(179 179 179) 0px 1px 20px 0px",
              }}
            >
              <div>
                <img
                  src={val.productImage}
                  style={{ width: "100%", height: "45vh", borderRadius: 20 }}
                />
                <div style={{ marginTop: 20 }}>
                  <div style={{ display: "flex", marginLeft: 10 }}>
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
                  <div style={{ display: "flex", marginLeft: 10 }}>
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
                      }}
                    >
                      Location :
                    </p>
                    <p
                      style={{
                        marginLeft: 5,
                        fontSize: 20,
                        fontStyle: "revert",
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
                        width: "25%",
                      }}
                    >
                      Description :
                    </p>
                    <p
                      style={{
                        marginLeft: 5,
                        fontSize: 20,
                        fontStyle: "revert",
                        width: "60%",
                      }}
                    >
                      {val.description}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
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
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
