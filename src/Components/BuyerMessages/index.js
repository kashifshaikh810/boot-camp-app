/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import firebase from "firebase/app";

const Messages = () => {
  const [getData, setGetData] = useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref("contactUs")
      .on("value", (snapshot) => {
        let snap = snapshot.val() ? Object.values(snapshot.val()) : [];
        snap.forEach((items) => {
          let data = Object.values(items);
          setGetData(data);
        });
      });
  }, []);

  return (
    <div style={{ height: "83vh", overflow: 'scroll' }}>
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
            width: "62%",
          }}
        >
          <p
            style={{
              textAlign: "center",
              fontSize: 25,
              fontWeight: "bold",
              color: "white",
              fontStyle: "revert",
            }}
          >
            Buyer Messages
          </p>
        </div>
      </div>

      {getData.map((val) => {
        return (
          <div style={{ display: "flex", justifyContent: "center", }}>
            <div
              className="card"
              style={{
                width: "30%",
                backgroundColor: "#f2f2f2",
                margin: 20,
                padding: 10,
              }}
            >
              <p>First Name : {val.firstName}</p>
              <p>Last Name : {val.lastName }</p>
              <p>Email : {val.email}</p>
              <p>Message : {val.yourMessage}</p>

              <div style={{display: 'flex', justifyContent: 'space-around', }}>
            <button
                    className="btn btn-success"
                    style={{
                    }}
                    >
                    Reply
                  </button>

                  <button
                    className="btn btn-danger"
                    style={{
                    }}
                    >
                    Delete
                  </button>
              </div>
            </div>
            </div>
        );
      })}
                      {/* boxShadow: "rgb(179 179 179) 0px 1px 20px 0px", */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <div
          className="card"
          style={{ width: "62%", height: "50vh", backgroundColor: "#f3f3f3" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              height: "20vh",
            }}
          >
            <div
              className="card"
              style={{
                paddingTop: 10,
                width: "35%",
                backgroundColor: "#b3b3b3",
                borderRadius: 20,
              }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                <p
                  style={{
                    color: "white",
                    fontStyle: "revert",
                    fontWeight: "bold",
                    fontSize: 30,
                  }}
                >
                  Our Trested Partners
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "flex-end",
              flexWrap: "wrap",
            }}
          >
            <div>
              <img
                src={"./apple.png"}
                style={{ borderRadius: 100, width: "70%" }}
              />
            </div>
            <div>
              <img
                src={"./amazon.png"}
                style={{ borderRadius: 100, width: "70%" }}
              />
            </div>
            <div style={{ paddingBottom: 30 }}>
              <img
                src={"./google.png"}
                style={{ borderRadius: 100, width: "70%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
