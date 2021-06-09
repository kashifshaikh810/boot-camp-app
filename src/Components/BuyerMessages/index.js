/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import firebase from "firebase/app";

const Messages = () => {
  const [getData, setGetData] = useState([]);
  const [key, setKey] = useState("");
  const [pushKey, setPushKey] = useState("");
  const [uid, setUid] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [didMount, setDidMount] = useState(false); 

  const deleteCard = (e, i) => {
    e.preventDefault();
    setGetData('')
    firebase.database().ref(`/contactUs/${key}/${pushKey[i]}/`).remove();
    alert('Removed Successfully...')
    giveData()
  };

  const giveData = () => {
    firebase
      .database()
      .ref('contactUs')
      .on("value", (snapshot) => {
        let snap = snapshot.val() ? Object.values(snapshot.val()) : [];
        let key = snapshot.val() ? Object.keys(snapshot.val()) : [];
        let d = [...key];
        d.forEach((aa) => {
          setKey(aa);
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
  }

  useEffect(() => {
    setDidMount(true)
    giveData()
      firebase.auth().onAuthStateChanged((user) => {
        let uid = user?.uid;
        setUid(uid);
      })
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

      {uid ? getData.length != 0 ? getData.map((val, index) => {
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              className="card"
              style={{
                width: "30%",
                backgroundColor: "#f2f2f2",
                margin: 20,
                padding: 10,
                boxShadow: "rgb(179 179 179) 0px 1px 20px 0px",
              }}
            >
              <p>First Name : {val.firstName}</p>
              <p>Last Name : {val.lastName}</p>
              <p>Email : {val.email}</p>
              <p>Message : {val.yourMessage}</p>

              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <button className="btn btn-success" style={{}}>
                  Reply
                </button>

                <button
                  onClick={(e) => deleteCard(e, index)}
                  className="btn btn-danger"
                  style={{}}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })
    : <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh'}}> <p style={{fontSize: 30, fontStyle: 'revert', fontWeight: 'bold'}}>No Buyer's Messages</p> </div>
    : null
  }

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
            width: "62%",
            height: "50vh",
            backgroundColor: "#f3f3f3",
            boxShadow: "rgb(179 179 179) 0px 1px 20px 0px",
          }}
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
