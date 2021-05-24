/* eslint-disable jsx-a11y/alt-text */
import React from "react";

const Messages = () => {
  return (
    <div style={{ height: "83vh" }}>
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

      <div style={{display: 'flex', justifyContent: 'center'}}>
      <div
        className="card"
        style={{
          width: "30%",
          backgroundColor: "#f2f2f2",
          margin: 20,
          padding: 10,
        }}
      >
        <p>First Name :</p>
        <p>Last Name :</p>
        <p>Email :</p>
        <p>Message :</p>
      </div>

      <div
        className="card"
        style={{
          width: "30%",
          backgroundColor: "#f2f2f2",
          margin: 20,
          padding: 10,
        }}
      >
        <p>First Name :</p>
        <p>Last Name :</p>
        <p>Email :</p>
        <p>Message :</p>
      </div>
      </div>

      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-end', }}>
      <div className="card" style={{width: '62%', height: '50vh', backgroundColor: '#f3f3f3'}}>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
          height: '20vh',
        }}>
          <div className="card" style={{paddingTop: 10, width: '35%', backgroundColor: '#b3b3b3', borderRadius: 20}}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <p style={{color: 'white', fontStyle: 'revert', fontWeight: 'bold', fontSize: 30}}>Our Trested Partners</p>
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
          <img src={"./apple.png"} style={{borderRadius: 100, width: '70%'}} />
        </div>
        <div>
          <img src={"./amazon.png"} style={{borderRadius: 100, width: '70%'}} />
        </div>
        <div style={{ paddingBottom: 30, }}>
          <img src={"./google.png"}  style={{borderRadius: 100, width: '70%'}}/>
        </div>
      </div>
      </div>
      </div>

    </div>
  );
};

export default Messages;
