/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import * as Icon from 'react-bootstrap-icons';

const ShowCarts = () => {
  const [allItems, setAllItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [keys, setkeys] = useState('');
  const [uid, setUid] = useState('');

  useEffect(() => {
      setIsLoading(true)
    let uid = firebase.auth()?.currentUser?.uid;
    setUid(uid)
    firebase
      .database()
      .ref(`/addCarts/${uid}`)
      .on("value", (snapshot) => {
        let data = snapshot.val() ? Object.values(snapshot.val()) : [];
        let key = snapshot.val() ? Object.keys(snapshot.val()) : [];
        setkeys(key)
        setAllItems(data);
        setIsLoading(false)
      });
  }, [isLoading]);

    const deletedCart = (e, i) => {
        e.preventDefault()
        firebase.database().ref(`/addCarts/${uid}/${keys[i]}`).remove()
        alert('Congratulations... Cart Deleted Successfully !')
    }

  return (
      <>
      {allItems.length > 0 ? isLoading ? 
      <div style={{height: '83vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div className="spinner-border text-success" style={{width: '4rem', height: '4rem'}} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
      </div>
     :
    <div style={{height: 'auto'}}>
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
            Show Carts
          </p>
        </div>
      </div>

      {allItems.map((val, index) => {
        return (
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <div
              className="card"
              style={{
                width: "30%",
                height: "99vh",
                backgroundColor: "#f2f2f2",
                borderRadius: 20,
                margin: 20,
                marginLeft: 40,
              }}
            >
              <div>
                <img
                  src={val.productImage}
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
                      {val.productTitile}
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
                     ${val.productPrice}
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
                      {val.yourLocation}
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
                      {val.productCondition}
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
                      {val.description}
                    </p>
                  </div>
                </div>
                <div>
                </div>
                <div style={{ display: "flex" }}>
                    <p style={{ marginLeft: 10, fontSize: 35, fontWeight: 'bold' }}>Quantity : </p>
                  <div style={{backgroundColor: 'green', width: 60, height: 60, borderRadius: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', marginLeft: 20}}>
                    <Icon.CartPlusFill size={30} style={{ color: '#f1f1f1'}} />
                  </div>

                  <div style={{backgroundColor: 'red', width: 60, height: 60, borderRadius: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', marginLeft: 20}}>
                  <Icon.CartDashFill size={30} style={{color: '#f1f1f1'}} />
                  </div>

                </div>
                    <div>
                    <p style={{ marginLeft: 15, fontSize: 25, }}><b>Rs</b> : ${val.productPrice}</p>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'space-evenly', marginRight: 40}}>
                    <div className="d-grid gap-2">
                    <button style={{borderRadius: 12, width: '120%'}} className="btn btn-success" type="button">
                    <Icon.Briefcase style={{marginRight: 10}} />
                        Check Out Cart
                        </button>
                    </div>

                    <div className="d-grid gap-2">
                    <button style={{borderRadius: 12, width: '130%'}} className="btn btn-danger" onClick={(e) => deletedCart(e, index)}>
                        <Icon.Trash style={{marginRight: 10}} />
                        Delete Cart
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
    </>
  );
};

export default ShowCarts;
