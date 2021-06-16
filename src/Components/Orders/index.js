/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import * as Icon from "react-bootstrap-icons";

const BuyerOrders = () => {
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [didMount, setDidMount] = useState(false); 
  const [buyCartData, setBuyCartData] = useState([]);
  const [keys, setKeys] = useState("");
  const [pushKeys, setPushKeys] = useState("");

  const handleDelivered = (e, i) => {
    e.preventDefault();
    let status = "delivered";
    firebase
      .database()
      .ref(`/buyCart/${keys[i]}/${pushKeys[i]}`)
      .update({ status: status });
    alert("delivered Successfully...");
  };

  const handleRemoveOrder = (e, item, i) => {
    e.preventDefault();
    let status = item.status;
    if(status === 'delivered'){
      alert('Sorry Sir, You Are Not Cancel, This Order because Order is delivered...')
    }else{
      firebase.database().ref(`/buyCart/${keys[i]}/${pushKeys[i]}`).remove();
      alert("Cart Removed...");
      cartData();
    }
  };

  const cartData = () => {
    firebase
      .database()
      .ref(`/buyCart/`)
      .on("value", (snapshot) => {
        let snap = snapshot.val() ? Object.values(snapshot.val()) : [];
        let key = snapshot.val() ? Object.keys(snapshot.val()) : [];
        let sam = [];
        key.forEach((genKey) => {
          sam.push(genKey);
          setKeys(sam);
        });
        let data = [];
        let aa = [];
        snap.forEach((item) => {
          let itemVal = Object.values(item);
          let pushK = Object.keys(item);
          pushK.forEach((genPushK) => {
            aa.push(genPushK);
            setPushKeys(aa);
          });
          itemVal.forEach((newData) => {
            data.push(newData);
            setBuyCartData(data);
            setIsLoading(false);
          });
        });
      });
  };

  useEffect(() => {
    setDidMount(true)
    setIsLoading(true);
    cartData();
    return () => setDidMount(false);
  }, [isLoading]);

  return (
    <div>
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
            marginTop: 10,
            marginBottom: 10,
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
            Buyer Orders
          </p>
        </div>
      </div>

      {buyCartData.length > 0 ?  isLoading ? (
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
        <div style={{ height: "auto", marginBottom: 90, }}>
          {buyCartData.map((item, index) => {
            return (
              <div key={index} style={{ display: 'flex', justifyContent: 'center', }}>
                <div
                  className="card"
                  style={{
                    width: "60%",
                    maxWidth: "100%",
                    height: 'auto',
                    backgroundColor: "#f2f2f2",
                    borderRadius: 20,
                    margin: 20,
                    paddingBottom: 20,
                    boxShadow: "rgb(179 179 179) 0px 1px 20px 0px",
                    }}
                >
                  <div>
                    <img
                      src={item.productImage}
                      style={{
                        width: '100%',
                        maxWidth: "100%",
                        height: 400,
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
                            maxWidth: '40%',
                          }}
                        >
                          Product Titile :
                        </p>
                        <p
                          style={{
                            marginLeft: 5,
                            fontSize: 20,
                            fontStyle: "revert",
                            maxWidth: '50%',
                          }}
                        >
                          {item.productTitile}
                        </p>
                      </div>
                      <div style={{ display: "flex", marginLeft: 10 }}>
                        <p
                          style={{
                            fontWeight: "bold",
                            fontSize: 20,
                            fontStyle: "revert",
                            maxWidth: '45%',
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
                          ${item.productPrice}
                        </p>
                      </div>

                      <div style={{ display: "flex", marginLeft: 10 }}>
                        <p
                          style={{
                            fontWeight: "bold",
                            fontSize: 20,
                            fontStyle: "revert",
                            maxWidth: '100%',
                          }}
                        >
                          Location :
                        </p>
                        <p
                          style={{
                            marginLeft: 5,
                            fontSize: 20,
                            fontStyle: "revert",
                            maxWidth: '50%',
                          }}
                        >
                          {item.yourLocation}
                        </p>
                      </div>

                      <div style={{ display: "flex", marginLeft: 10 }}>
                        <p
                          style={{
                            fontWeight: "bold",
                            fontSize: 20,
                            fontStyle: "revert",
                            maxWidth: '50%',
                          }}
                        >
                          Product Condition :
                        </p>
                        <p
                          style={{
                            marginLeft: 5,
                            fontSize: 20,
                            fontStyle: "revert",
                            maxWidth: '50%',
                          }}
                        >
                          {item.productCondition}
                        </p>
                      </div>

                      <div style={{ display: "flex", marginLeft: 10 }}>
                        <p
                          style={{
                            fontWeight: "bold",
                            fontSize: 20,
                            fontStyle: "revert",
                            maxWidth: '100%',
                          }}
                        >
                          Description :
                        </p>
                        <p
                          style={{
                            marginLeft: 5,
                            fontSize: 20,
                            fontStyle: "revert",
                            maxWidth: '45%',
                          }}
                        >
                          {item.description}
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
                          maxWidth: '70%',
                        }}
                      >
                        Product Quantity :
                      </p>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: 15,
                          maxHeight: 200
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
                            {item.productValue}
                          </span>
                        </div>
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
                          maxWidth: "100%",
                          maxHeight: 150,
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
                          <b style={{ color: "#f3f3f3", 
                        }}>Total Amount : </b>
                          <span style={{ color: "blue",
                          }}>
                            ${item.totalPrice}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div style={{ display: "flex", fontSize: 25 }}>
                      <b style={{ marginLeft: 10, marginRight: 5 }}>Status</b>:
                      <p style={{ marginLeft: 5, maxWidth: '50%' }}>{item.status}</p>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <button
                        style={{
                          borderRadius: 12,
                          width: "40%",
                          cursor:
                            item.status === "delivered" && "not-allowed"
                              
                        }}
                        className="btn btn-success"
                        disabled={item.status === "delivered"}
                        onClick={(e) => handleDelivered(e, index)}
                      >
                        <Icon.CartCheck
                          size={25}
                          style={{ marginBottom: 5, marginRight: 7 }}
                        />
                        {item.status === "delivered"
                          ? "delivered Success"
                          : "Delivered"}
                      </button>

                      <button
                        style={{ borderRadius: 12 }}
                        className="btn btn-danger"
                        onClick={(e) => handleRemoveOrder(e, item, index)}
                      >
                        <Icon.X
                          size={30}
                          style={{ marginBottom: 1, width: 40 }}
                        />
                        Cancel Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : isLoading ? (
          null        
      ) : <p style={{ textAlign: "center", fontSize: 30, fontWeight: "bold" }}>
      No Carts Added
    </p>}
    </div>
  );
};

export default BuyerOrders;
