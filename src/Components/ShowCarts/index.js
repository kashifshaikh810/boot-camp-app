/* eslint-disable no-unused-expressions */
/* eslint-disable no-const-assign */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import * as Icon from "react-bootstrap-icons";

const ShowCarts = () => {
  const [allItems, setAllItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let [productValue, setProductValue] = useState(1);
  const [keys, setkeys] = useState("");
  const [dataLength, setdataLength] = useState("");
  const [samData, setSamData] = useState("");
  let history = useHistory();
  const [uid, setUid] = useState("");

  useEffect(() => {
    setIsLoading(true);
    let uid = firebase.auth()?.currentUser?.uid;
    setUid(uid);
    firebase
      .database()
      .ref(`/addCarts/${uid}`)
      .on("value", (snapshot) => {
        let data = snapshot.val() ? Object.values(snapshot.val()) : [];
        let key = snapshot.val() ? Object.keys(snapshot.val()) : [];
        setkeys(key);
        setAllItems(data);
        setIsLoading(false);
      });
    firebase
      .database()
      .ref(`/buyItem/${uid}`)
      .on("value", (snapshot) => {
        let data = snapshot.val() ? Object.values(snapshot.val()) : [];
        let newData = data.length;
        setdataLength(newData);
      });

    firebase
      .database()
      .ref(`/buyCart/${uid}`)
      .on("value", (snapshot) => {
        let data = snapshot.val() ? Object.values(snapshot.val()) : [];
        data.forEach((item, i) => setSamData(item));
      });
  }, [isLoading]);

  const deletedCart = (e, i) => {
    e.preventDefault();
    firebase.database().ref(`/addCarts/${uid}/${keys[i]}`).remove();
    alert("Cart Deleted Successfully !");
  };

  const goToCheckOutForm = (e, items, i) => {
    e.preventDefault();
    let productPrice = items.productPrice;
    let productValue = items.productValue;
    let totalPrice = items.totalPrice;
    let productTitile = items.productTitile;
    let yourLocation = items.yourLocation;
    let productImage = items.productImage;
    let productCondition = items.productCondition;
    let description = items.description;
    let status = "Not delivered";
    let uid = firebase.auth()?.currentUser?.uid;
    let orderDate = new Date();
    let abc = orderDate.toISOString().split("t")[0];
    if (
      samData.productTitile === productTitile &&
      samData.productValue === productValue &&
      samData.totalPrice === totalPrice &&
      samData.yourLocation === yourLocation &&
      samData.description === description &&
      samData.productCondition === productCondition &&
      samData.productImage === productImage &&
      samData.productPrice === productPrice
    ) {
      null;
    } else {
      firebase.database().ref(`/buyCart/${uid}`).push({
        productPrice: productPrice,
        productValue: productValue,
        totalPrice: totalPrice,
        productTitile: productTitile,
        yourLocation: yourLocation,
        productImage: productImage,
        productCondition: productCondition,
        status: status,
        orderDate: abc,
        description: description,
      });
    }
    if (dataLength === 0) {
      history.push("/checkoutform");
    } else {
      history.push("/yourorders");
    }
  };

  const updateVal = (e, val, i) => {
    e.preventDefault();
    let productPrice = val.productPrice;
    let uid = firebase.auth()?.currentUser?.uid;
    if (productValue <= 4) {
      setProductValue(++productValue);
      let ans = productValue * productPrice;
      firebase
        .database()
        .ref(`/addCarts/${uid}`)
        .child(keys[i])
        .update({ totalPrice: ans });
      firebase
        .database()
        .ref(`/addCarts/${uid}`)
        .child(keys[i])
        .update({ productValue: productValue });
    }
  };

  const deleteVal = (e, val, i) => {
    e.preventDefault();
    let productPrice = val.productPrice;
    let uid = firebase.auth()?.currentUser?.uid;
    if (productValue >= 2) {
      setProductValue(--productValue);
      let ans = productValue * productPrice;
      firebase
        .database()
        .ref(`/addCarts/${uid}`)
        .child(keys[i])
        .update({ totalPrice: ans });
      firebase
        .database()
        .ref(`/addCarts/${uid}`)
        .child(keys[i])
        .update({ productValue: productValue });
    }
  };

  return (
    <>
      
        <div style={{ height: "223vw" }}>
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
                Show Carts
              </p>
            </div>
          </div>

          {allItems.length > 0 ?  isLoading ? (
            <div
              style={{
                height: "83vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                className="spinner-border text-success"
                style={{ width: "4rem", height: "4rem" }}
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            allItems.map((val, index) => {
              return (
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div
                    className="card"
                    style={{
                      width: "30%",
                      height: "99vh",
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
                        style={{
                          width: "100%",
                          height: "45vh",
                          borderRadius: 20,
                        }}
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
                      <div></div>
                      <div style={{ display: "flex" }}>
                        <p
                          style={{
                            marginLeft: 10,
                            fontSize: 35,
                            fontWeight: "bold",
                          }}
                        >
                          Quantity :{" "}
                        </p>
                        <div
                          onClick={(e) => updateVal(e, val, index)}
                          style={{
                            backgroundColor: "green",
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                            marginLeft: 20,
                          }}
                        >
                          <Icon.CartPlusFill
                            size={30}
                            style={{ color: "#f1f1f1" }}
                          />
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: 10,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginLeft: 15,
                              backgroundColor: "#f36e36",
                              width: 40,
                              height: 40,
                              borderRadius: 40,
                            }}
                          >
                            <span
                              style={{
                                fontSize: 30,
                                fontStyle: "revert",
                                color: "#f1f1f1",
                              }}
                            >
                              {val.productValue}
                            </span>
                          </div>
                        </div>

                        <div
                          onClick={(e) => deleteVal(e, val, index)}
                          style={{
                            backgroundColor: "red",
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                            marginLeft: 20,
                          }}
                        >
                          <Icon.CartDashFill
                            size={30}
                            style={{ color: "#f1f1f1" }}
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: 10,
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "#b3b3b3",
                            width: "85%",
                            height: 50,
                            borderRadius: 30,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <p
                            style={{
                              marginLeft: 15,
                              fontSize: 25,
                              paddingTop: 10,
                            }}
                          >
                            <b style={{ color: "#f3f3f3" }}>Total Amount :</b>{" "}
                            <span style={{ color: "blue" }}>
                              ${val.totalPrice}
                            </span>{" "}
                          </p>
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          marginRight: 40,
                        }}
                      >
                        <div
                          className="d-grid gap-2"
                          onClick={(e) => goToCheckOutForm(e, val, index)}
                        >
                          <button
                            style={{ borderRadius: 12 }}
                            className="btn btn-success"
                            type="button"
                          >
                            <Icon.Briefcase style={{ marginRight: 10 }} />
                            Proceed to Check Out
                          </button>
                        </div>

                        <div className="d-grid gap-2">
                          <button
                            style={{ borderRadius: 12 }}
                            className="btn btn-danger"
                            onClick={(e) => deletedCart(e, index)}
                          >
                            <Icon.Trash style={{ marginRight: 10 }} />
                            Remove Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
      ) : (
        <p style={{ textAlign: "center", fontSize: 30, fontWeight: "bold", marginTop: 50 }}>
          No Carts Added
        </p>
          )}
        </div>
      
    </>
  );
};

export default ShowCarts;
