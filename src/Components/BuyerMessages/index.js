/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import ReplyToUser from '../ReplyToUser/index';
import firebase from "firebase/app";
import './index.css'

const Messages = () => {
  const [getData, setGetData] = useState([]);
  const [key, setKey] = useState("");
  const [pushKey, setPushKey] = useState("");
  const [uid, setUid] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [didMount, setDidMount] = useState(false);

  const deleteCard = (e, i) => {
    e.preventDefault();
    setGetData("");
    firebase.database().ref(`/contactUs/${key.keys[i]}/${pushKey[i]}/`).remove();
    alert("Removed Successfully...");
    giveData();
  };

  const giveData = () => {
    firebase
      .database()
      .ref("contactUs")
      .on("value", (snapshot) => {
        let snap = snapshot.val() ? Object.values(snapshot.val()) : [];
        let key = snapshot.val() ? Object.keys(snapshot.val()) : [];
        let d = [...key];
        d.forEach((aa, i) => {
          setKey({keys: d});
        });
        let newData = [];
        let allKey = [];
        snap.forEach((items) => {
          let data = Object.values(items);
          let keys = Object.keys(items);
          let key = [...keys];
          key.forEach((k) => {
            allKey.push(k);
            setPushKey(allKey);
          });
          data.forEach((val) => {
            newData.push(val);
          });
          setGetData(newData);
        });
      });
  };

  useEffect(() => {
    setDidMount(true);
    giveData();
    firebase.auth().onAuthStateChanged((user) => {
      let uid = user?.uid;
      setUid(uid);
    });
    return () => setDidMount(false);
  }, []);

  return (
    <div style={{ height: "83vh", overflow: "scroll" }}>
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

      {uid ? (
        getData.length != 0 ? (
          getData.map((val, index) => {
            return (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div
                  className="card buyer-messages-card"
                >
                  <p>First Name : {val.firstName}</p>
                  <p>Last Name : {val.lastName}</p>
                  <p>Email : {val.email}</p>
                  <p>Message : {val.yourMessage}</p>
                  <ReplyToUser deleteCard={deleteCard} index={index} uid={key.keys} pushKey={pushKey} reply={val.adminReply} />

                 
                  </div>
                </div>
            );
          })
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            
            <p
              style={{ fontSize: 30, fontStyle: "revert", fontWeight: "bold",
              
            }}
            >
              No Buyer's Messages
            </p>
          </div>
        )
      ) : null}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <div
          className="card"
          style={{
            maxHeight: 570,
            padding: 20,
              maxWidth: '90%',
              minWidth: '40%',
              marginBottom: 40,
            backgroundColor: "#f3f3f3",
            boxShadow: "rgb(179 179 179) 0px 1px 20px 0px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: "20vh",
            }}
          >
            <div
              className="card"
              style={{
                paddingTop: 10,
                maxHeight: 100,
              maxWidth: '90%',
              minWidth: '65%',
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
              justifyContent: "space-around",
              alignItems: "flex-end",
              flexWrap: "wrap",
            }}
          >
            <div>
              <img
                src={"./apple.png"}
                style={{ borderRadius: 100, width: "70%", marginBottom: 10, }}
              />
            </div>
            <div>
              <img
                src={"./amazon.png"}
                style={{ borderRadius: 100, width: "70%", marginBottom: 10 }}
              />
            </div>
            <div style={{ paddingBottom: 30 }}>
              <img
                src={"./google.png"}
                style={{ borderRadius: 100, width: "70%", marginBottom: 10 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
