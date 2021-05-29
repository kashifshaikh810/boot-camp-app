import React, { useState, useEffect } from "react";
import firebase from "firebase/app";

const YourOrders = () => {
  const [data, setData] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [yourLocation, setYourLocation] = useState("");
  const [cartNo, setCartNo] = useState("");
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(true);
  const [showEmail, setShowEmail] = useState(true);
  const [showLocation, setShowLocation] = useState(true);
  const [showLastName, setShowLastName] = useState(true);
  const [showCart, setShowCart] = useState(true);

    const handleUpdateFirstName = (e) => {
        setfirstName(e.target.value)
    }

    const handleUpdateLastName = (e) => {
        setLastName(e.target.value)
    }

    const handleUpdateLocation = (e) => {
        setYourLocation(e.target.value)
    }

    const handleUpdateEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleUpdateCartNo = (e) => {
        setCartNo(e.target.value)
    }

    const updatedFirstName = (e) => {
        e.preventDefault()
        if(firstName){
            let uid = firebase.auth()?.currentUser?.uid;
            firebase.database().ref(`/buyItem`).child(uid).update({firstName: firstName})
            setfirstName('')
            setShow(true)
        }
    }

    const handleCancel = (e) => { 
        e.preventDefault()
        setShow(true)
        setfirstName('')
    }

    const updatedLastName = (e) => {
        e.preventDefault()
        if(lastName){
            let uid = firebase.auth()?.currentUser?.uid;
            firebase.database().ref(`/buyItem`).child(uid).update({lastName: lastName})
            setLastName('')
            setShowLastName(true)
        }
    }

    const handleLastNameCancel = (e) => { 
        e.preventDefault()
        setShowLastName(true)
        setLastName('')
    }
 
    const updatedLocation = (e) => {
        e.preventDefault()
        if(yourLocation){
            let uid = firebase.auth()?.currentUser?.uid;
            firebase.database().ref(`/buyItem`).child(uid).update({yourLocation: yourLocation})
            setShowLocation(true)
            setYourLocation('')
        }
    }

    const handleLocationCancel = (e) => { 
        e.preventDefault()
        setShowLocation(true)
        setYourLocation('')
    }

    const updatedEmail = (e) => {
        e.preventDefault()
        if(email){
            let uid = firebase.auth()?.currentUser?.uid;
            firebase.database().ref(`/buyItem`).child(uid).update({email: email})
            setShowEmail(true)
            setEmail('')
        }
    }

    const handleEmailCancel = (e) => { 
        e.preventDefault()
        setShowEmail(true)
        setEmail('')
    }

    const updatedCartNo = (e) => {
        e.preventDefault()
        if(cartNo){
            let uid = firebase.auth()?.currentUser?.uid;
            firebase.database().ref(`/buyItem`).child(uid).update({cartNo: cartNo})
            setShowCart(true)
            setCartNo('')
        }
    }

    const handleCartNoCancel = (e) => { 
        e.preventDefault()
        setShowCart(true)
        setCartNo('')
    }

  useEffect(() => {
    let uid = firebase.auth()?.currentUser?.uid;
    firebase
      .database()
      .ref(`/buyItem/${uid}`)
      .on("value", (snapshot) => {
        let snap = snapshot.val() ? snapshot.val() : [];
        setData(snap);
      });
  }, []);

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
            Your Orders
          </p>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          className="card"
          style={{
            width: "60%",
            padding: 20,
            marginTop: 10,
            height: "30vh",
            boxShadow: "rgb(179 179 179) 0px 1px 20px 0px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ fontSize: 20, fontStyle: "revert" }}>
              
              <b style={{ fontSize: 20, fontStyle: "revert" }}>
                First Name 
              </b> : {data.firstName}
            </p>
            { show ? (
              <button
                className="btn btn-light"
                onClick={() => setShow(false)}
                style={{ color: '#1a9cb7' }}
              >
                EDIT
              </button>
            ) : (
              <>
              <form onSubmit={(e) => updatedFirstName(e)}>
                <div>
                <input placeholder={data.firstName} value={firstName} onChange={(e) => handleUpdateFirstName(e)} type="text" style={{width: 130, height: 35, marginRight: 10, paddingLeft: 10}} />
                <button className="btn btn-light" type="submit" style={{ color: 'green' }}>
                  Update
                </button>
                <button className="btn btn-light" onClick={(e) => handleCancel(e)} style={{ color: 'red' }}>
                  Cancel
                </button>
                </div>
                </form>
              </>
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ fontSize: 20, fontStyle: "revert" }}>
            
            <b style={{ fontSize: 20, fontStyle: "revert" }}>
              Last Name
            </b> : {data.lastName}
          </p>
          { showLastName ? (
              <button
                className="btn btn-light"
                onClick={() => setShowLastName(false)}
                style={{ color: '#1a9cb7' }}
              >
                EDIT
              </button>
            ) : (
              <>
              <form onSubmit={(e) => updatedLastName(e)}>
                <div>
                <input placeholder={data.lastName} value={lastName} onChange={(e) => handleUpdateLastName(e)} type="text" style={{width: 130, height: 35, marginRight: 10, paddingLeft: 10}} />
                <button className="btn btn-light" type="submit" style={{ color: 'green' }}>
                  Update
                </button>
                <button className="btn btn-light" onClick={(e) => handleLastNameCancel(e)} style={{ color: 'red' }}>
                  Cancel
                </button>
                </div>
                </form>
              </>
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>

          <p style={{ fontSize: 20, fontStyle: "revert" }}>
            <b style={{ fontSize: 20, fontStyle: "revert" }}>
              
              Location
            </b> : {data.yourLocation}
          </p>

          { showLocation ? (
              <button
                className="btn btn-light"
                onClick={() => setShowLocation(false)}
                style={{ color: '#1a9cb7' }}
              >
                EDIT
              </button>
            ) : (
              <>
              <form onSubmit={(e) => updatedLocation(e)}>
                <div>
                <input placeholder={data.yourLocation} value={yourLocation} onChange={(e) => handleUpdateLocation(e)} type="text" style={{width: 150, height: 35, marginRight: 10, paddingLeft: 10}} />
                <button className="btn btn-light" type="submit" style={{ color: 'green' }}>
                  Update
                </button>
                <button className="btn btn-light" onClick={(e) => handleLocationCancel(e)} style={{ color: 'red' }}>
                  Cancel
                </button>
                </div>
                </form>
              </>
            )}
                
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>

          <p style={{ fontSize: 20, fontStyle: "revert" }}>
            
            <b style={{ fontSize: 20, fontStyle: "revert" }}> Email </b> 
            : {data.email}
          </p>

          { showEmail ? (
              <button
                className="btn btn-light"
                onClick={() => setShowEmail(false)}
                style={{ color: '#1a9cb7' }}
              >
                EDIT
              </button>
            ) : (
              <>
              <form onSubmit={(e) => updatedEmail(e)}>
                <div>
                <input placeholder={data.email} value={email} onChange={(e) => handleUpdateEmail(e)} type="email" style={{width: 150, height: 35, marginRight: 10, paddingLeft: 10}} />
                <button className="btn btn-light" type="submit" style={{ color: 'green' }}>
                  Update
                </button>
                <button className="btn btn-light" onClick={(e) => handleEmailCancel(e)} style={{ color: 'red' }}>
                  Cancel
                </button>
                </div>
                </form>
              </>
            )}

          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
        
          <p style={{ fontSize: 20, fontStyle: "revert" }}>
            
            <b style={{ fontSize: 20, fontStyle: "revert" }}>
              Cart No
            </b> : {data.cartNo}
          </p>

          { showCart ? (
              <button
                className="btn btn-light"
                onClick={() => setShowCart(false)}
                style={{ color: '#1a9cb7', }}
              >
                EDIT
              </button>
            ) : (
              <>
              <form onSubmit={(e) => updatedCartNo(e)}>
                <div>
                <input placeholder={data.cartNo} value={cartNo} onChange={(e) => handleUpdateCartNo(e)} type="number" style={{width: 150, height: 35, marginRight: 10, paddingLeft: 10}} />
                <button className="btn btn-light" type="submit" style={{ color: 'green' }}>
                  Update
                </button>
                <button className="btn btn-light" onClick={(e) => handleCartNoCancel(e)} style={{ color: 'red', }}>
                  Cancel
                </button>
                </div>
                </form>
              </>
            )}

          </div>
          
        </div>
      </div>
    </div>
  );
};

export default YourOrders;
