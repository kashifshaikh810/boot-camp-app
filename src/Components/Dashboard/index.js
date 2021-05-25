/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import firebase from "firebase/app";

const Dashboard = () => {
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref(`/addItems/`)
      .on("value", (snapshot) => {
        let data = snapshot ? Object.values(snapshot.val()) : [];
        data.forEach((item) => {
          let newData = Object.values(item);
          setAllItems(newData);
        });
      });
  }, []);

  return (
    <div style={{ height: "auto" }}>
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

      {allItems.map((val) => {
        return (
          <div style={{boxSizing: 'border-box'}}>
            <div
              className="card"
              style={{
                width: "30%",
                height: "68vh",
                backgroundColor: "#f2f2f2",
                borderRadius: 20,
                margin: 20,
                boxShadow: 30
              }}
            >
              <div>
                <img
                  src={val.productImage}
                  style={{ width: "100%", height: "40vh", borderRadius: 20 }}
                />
                <div style={{marginTop: 20}}>
                <div style={{display: 'flex', marginLeft: 10}}>
                  <p>Product Titile : </p>
                  <p>{val.productTitile}</p>
                </div>
                <div style={{display: 'flex', marginLeft: 10}}>
                <p>Product Price : </p>
                    <p>${val.productPrice}</p>
                </div>
                <div style={{display: 'flex', marginLeft: 10}}>
                  <p>Product Condition : </p>
                  <p>{val.productCondition}</p>
                </div>

                <div style={{display: 'flex', marginLeft: 10}}>
                  <p>Description : </p>
                  <p>{val.description}</p>
                </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                <button className="btn btn-primary">Order Now</button>
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
