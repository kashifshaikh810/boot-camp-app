/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import * as Icon from 'react-bootstrap-icons';

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
  const [isLoading, setIsLoading] = useState(false);
  const [buyCartData, setBuyCartData] = useState([]);

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
    setIsLoading(true)
    let uid = firebase.auth()?.currentUser?.uid;
    firebase
      .database()
      .ref(`/buyItem/${uid}`)
      .on("value", (snapshot) => {
        let snap = snapshot.val() ? snapshot.val() : [];
        setData(snap);
      });

      firebase
      .database()
      .ref(`/buyCart/${uid}`)
      .on("value", (snapshot) => {
        let snap = snapshot.val() ? Object.values(snapshot.val()) : [];
        setBuyCartData(snap);
        setIsLoading(false)
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
          <div style={{ display: "flex", justifyContent: "space-between", }}>
            <p style={{ fontSize: 20, fontStyle: "revert" }}>
              
              <b style={{ fontSize: 20, fontStyle: "revert",}}>
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

      {buyCartData.length > 0 ? isLoading ? 
      <div style={{height: '83vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div className="spinner-border text-success" style={{width: '4rem', height: '4rem'}} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
      </div>
     :
    <div style={{height: '223vw',}}>

      {buyCartData.map((item, index) => {
        return (
          <div style={{flexWrap: 'wrap'}}>
            <div
              className="card"
              style={{
                width: "40%",
                height: "107vh",
                backgroundColor: "#f2f2f2",
                borderRadius: 20,
                margin: 20,
                marginLeft: 40,
                boxShadow: 'rgb(179 179 179) 0px 1px 20px 0px'
              }}
            >
              <div>
                <img
                  src={item.productImage}
                  style={{ width: "100%", height: "45vh", borderRadius: 20 }}
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
                      {item.productTitile}
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
                     ${item.productPrice}
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
                      {item.yourLocation}
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
                      {item.productCondition}
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
                      {item.description}
                    </p>
                  </div>
                </div>
                <div>
                </div>
                <div style={{ display: "flex" }}>
                    <p style={{ marginLeft: 10, fontSize: 35, fontWeight: 'bold' }}>Product Quantity : </p>
                  
                  <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 15}}>
                  <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 15, backgroundColor: '#f36e36', width: 40, height: 40, borderRadius: 40}}>
                    <span style={{fontSize: 30, fontStyle: 'revert', color: '#f1f1f1'}}>{item.productValue}</span>
                  </div>
                  </div>

                </div>
                      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
                    <div style={{backgroundColor: '#b3b3b3', width: '85%', height: 50, borderRadius: 30, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <p style={{ marginLeft: 15, fontSize: 25, paddingTop: 10}}><b style={{color: '#f3f3f3'}}>Total Amount :</b>  <span style={{color: 'blue' }}>${item.totalPrice}</span> </p>
                    </div>
                      </div>

                      <div style={{display: 'flex', fontSize: 25}}>
                       <b style={{marginLeft: 10, marginRight: 5}}>Status</b> 
                     : <p style={{marginLeft: 5}}>{item.status}</p>
                      </div>

                    <div style={{display: 'flex', justifyContent: 'space-evenly', marginRight: 40}}>
                    {/* <div className="d-grid gap-2" >
                    <button style={{borderRadius: 12,}} className="btn btn-success" type="button">
                    <Icon.Briefcase style={{marginRight: 10}} />
                        Proceed to Check Out
                        </button>
                    </div> */}

                    <div className="d-grid gap-2">
                    <button style={{borderRadius: 12,}} className="btn btn-danger">
                        <Icon.X size={30} style={{marginBottom: 1}}/>
                        Cancel Order
                        </button>
                    </div>
                    </div>

              </div>
            </div>
          </div>
        );
      })}
    </div>
    : <p style={{textAlign: 'center', fontSize: 30, fontWeight: 'bold'}}>No Carts Added</p> }


    </div>
  );
};

export default YourOrders;
