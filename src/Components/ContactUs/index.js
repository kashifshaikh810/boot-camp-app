/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import * as Icon from 'react-bootstrap-icons'

const ContactUs = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [yourMessage, setYourMessage] = useState("");
  const [err, setErr] = useState("");
  const [pushKey, setPushKey] = useState("");
  const [getData, setGetData] = useState([]);

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setErr("");
  };

  const handleLastName = (e) => {
    setlastName(e.target.value);
    setErr("");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErr("");
  };

  const handleYourMessage = (e) => {
    setYourMessage(e.target.value);
    setErr("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let uid = firebase.auth()?.currentUser?.uid;
    if (firstName && lastName && email && yourMessage) {
      firebase.database().ref(`/contactUs/${uid}`).push({
        firstName: firstName,
        lastName: lastName,
        email: email,
        yourMessage: yourMessage,
      });
      setFirstName("");
      setlastName("");
      setEmail("");
      setYourMessage("");
      alert(
        "Your Message, Successfully Sent, Please Wait For Admin Reply."
      );
    } else {
      setErr("Please Fill the All Fields. Then Submit Your Data.");
    }
  };

  const handleDelete = (e, i) => {
    e.preventDefault()
    let uid = firebase.auth()?.currentUser?.uid;
    firebase.database().ref(`/contactUs/${uid}/${pushKey[i]}/`).remove()
    alert('Removed successfully...');
  }

  useEffect(() => {
    let uid = firebase.auth()?.currentUser?.uid;
      firebase
        .database()
        .ref(`/contactUs/${uid}`)
        .on("value", (snapshot) => {
          let snap = snapshot.val() ? Object.values(snapshot.val()) : [];
          let key = snapshot.val() ? Object.keys(snapshot.val()) : [];
          setPushKey(key);
            setGetData(snap);
        });
  },[])

  return (
    <>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 100
      }}
    >
      <div
        className="card"
        style={{
          width: "50%",
          height: "80vh",
          borderRadius: "4%",
          boxShadow: "rgb(179 179 179) 0px 1px 20px 0px",
        }}
      >
        <div
          style={{
            backgroundColor: "#b3b3b3",
            display: "flex",
            justifyContent: "center",
            paddingTop: 10,
            borderRadius: 10,
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
            Contact Us
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 10,
          }}
        >
          <div
            className="card"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 10,
              width: "40%",
              borderRadius: 10,
              backgroundColor: "#b3b3b3",
            }}
          >
            <p
              style={{
                fontWeight: "bold",
                fontStyle: "revert",
                fontSize: 30,
                color: "white",
              }}
            >
              Contact With Admin
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 20,
          }}
        >
          <form style={{ width: "60%" }} onClick={(e) => handleSubmit(e)}>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Your First Name"
                value={firstName}
                onChange={(e) => handleFirstName(e)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Your Last Name"
                value={lastName}
                onChange={(e) => handleLastName(e)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Your Email"
                value={email}
                onChange={(e) => handleEmail(e)}
                required
              />
            </div>

            <p style={{ margin: 0, padding: 0, paddingBottom: 8 }}>
              Your Message
            </p>
            <div className="form-floating">
              <textarea
                className="form-control"
                placeholder="Leave a comment here"
                value={yourMessage}
                required
                onChange={(e) => handleYourMessage(e)}
                id="floatingTextarea2"
                style={{ height: 100 }}
              ></textarea>
              <label htmlFor="floatingTextarea2">Your Message</label>
            </div>

            <div>
              <p style={{ marginTop: 10, color: "red", textAlign: 'center' }}>{err}</p>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
              <div className="card container" style={{padding: 50, boxShadow: "rgb(179 179 179) 0px 1px 20px 0px", marginBottom: 100, paddingBottom: 0}}>
                <div
          style={{
            backgroundColor: "#b3b3b3",
            display: "flex",
            justifyContent: "center",
            paddingTop: 10,
            marginBottom: 15,
            borderRadius: 10,
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
          Your Messages
          </p>
        </div>
           {getData.length === 0 ? <p>No Messages</p> :
             getData.map((data, index) => {
               return (
              <div className="card row" style={{borderRadius: 20, boxShadow: "rgb(179 179 179) 0px 1px 20px 0px", paddingTop: 20, marginBottom: 100,
                }}>
                    <div className="row col-12 col-md-12 col-sm-12">
                      <p style={{fontSize: 20}}><b> First Name </b> : {data.firstName}</p>
                      <p style={{fontSize: 20}}><b> Last Name </b> : {data.lastName}</p>
                      <p style={{fontSize: 20}}><b> Email </b> : {data.email}</p>
                      <p style={{fontSize: 20}}><b> Your Message </b> : {data.yourMessage}</p>
                      <p style={{fontSize: 25}}> <b style={{color: 'red'}}> Admin Reply : </b> { data.adminReply || 'Please Waiting for admin reply...'}   </p>
                      </div>
                    <button className="btn btn-danger" onClick={(e) => handleDelete(e, index)} style={{borderRadius: 20,}}> 
                    <Icon.XSquareFill style={{marginRight: 15}} />
                    Delete your message
                    </button>
                  </div>
                )
              })
            }

            </div>
    </>
  );
};

export default ContactUs;
