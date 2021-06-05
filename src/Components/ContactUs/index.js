/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import firebase from "firebase/app";

const ContactUs = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [yourMessage, setYourMessage] = useState("");
  const [err, setErr] = useState("");

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
        "Your Message, Successfully Sent, Please Wait For Admin Reply, Your Email."
      );
    } else {
      setErr("Please Fill the All Fields. Then Submit Your Data.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
            <div class="form-floating">
              <textarea
                class="form-control"
                placeholder="Leave a comment here"
                value={yourMessage}
                required
                onChange={(e) => handleYourMessage(e)}
                id="floatingTextarea2"
                style={{ height: 100 }}
              ></textarea>
              <label for="floatingTextarea2">Your Message</label>
            </div>

            <div>
              <p style={{ marginTop: 10, color: "red" }}>{err}</p>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
