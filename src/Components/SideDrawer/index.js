/* eslint-disable no-unused-vars */
import React,{useState, useEffect} from 'react'
import './index.css'
import { useHistory } from "react-router-dom";
import firebase from 'firebase/app';
import * as Icon from 'react-bootstrap-icons';

const SideDrawer = (props) => {
    let history = useHistory();
  const [uid, setUid] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [didMount, setDidMount] = useState(false); 
  const [msgLength, setMsgLength] = useState('')
  const [allItems, setAllItems] = useState([]);
  const [currUser, setCurrUser] = useState('')

  const goHome = () => {
    history.push("/");
    props.setIsShow(false)
  };

  const goLogin = () => {
    history.push("/login");
    props.setIsShow(false)
  };

  const goSignup = () => {
    history.push("/signup");
    props.setIsShow(false)
  };

  const goAboutus = () => {
    history.push("/aboutus");
    props.setIsShow(false)
  };

  const goAddItems = () => {
    history.push("/additems");
    props.setIsShow(false)
  };

  const goOrders = () => {
    history.push("/orders");
    props.setIsShow(false)
  };

  const goContactus = () => {
    history.push("/contactus");
    props.setIsShow(false)
  };

  const goMessage = () => {
    history.push("/message");
    props.setIsShow(false)
  };

  const logBtn = () => {
    firebase.auth().signOut();
    history.push('/login')
    props.setIsShow(false)
  };

  const goYourOrder = () => {
    history.push('/yourorders')
    props.setIsShow(false)
  };

  const goShowCarts = () => {
    history.push('/showcarts')
    props.setIsShow(false)
  }

    useEffect(() => {
      setDidMount(true)
      firebase.auth().onAuthStateChanged((user) => {
        let uid = user?.uid;
        setUid(uid);
        firebase
          .database()
          .ref(`/addCarts/${uid}`)
          .on("value", (snapshot) => {
            let data = snapshot.val() ? Object.values(snapshot.val()) : [];
            setAllItems(data);
          });

          firebase
          .database()
          .ref(`/contactUs/`)
          .on("value", (snapshot) => {
            let data = snapshot.val() ? Object.values(snapshot.val()) : [];
            let ka = []
            data.forEach((item) => {
             let as = Object.keys(item)
             as.forEach((val) => {
              ka.push(val)
              setMsgLength(ka.length);
            })
            })
          });
                firebase
                .database()
                .ref(`/newUser/${uid}`)
                .on("value", (snapshot) => {
                  let data = snapshot.val() ? snapshot.val() : [];
                  setCurrUser(data)
                });
      });
    return () => setDidMount(false);
    },[])


    let drawerClasses = 'side-drawer';
    if(props.isShow){
        drawerClasses = 'side-drawer open';
    }
    return(
        <nav className={drawerClasses} >
            <div style={{display: 'flex', justifyContent: 'flex-end', margin: 10}}>

            
            { uid ? <li className="">
              <p 
                className=""
                style={{fontSize: 20, color: 'green', 
                paddingTop: 20,
            }}><b style={{color: 'black', marginRight: 5}}> Hello Dear, </b> {currUser.firstName}</p>
            </li> : null }

            <Icon.Arrow90degLeft  size="25" style={{cursor: 'pointer'}} onClick={()=> props.setIsShow(false)}/>
            
            </div>
                <ul>
                    <li className="" onClick={goHome}>
              <p
                className=""
                style={{
                  cursor: "pointer",
                  fontSize: 20,
                  paddingTop: 20,
                }}
              >
                Home
              </p>
            </li>
            
            { uid === undefined ? <li className="" onClick={goLogin}>
              <p
                className=""
                style={{
                  cursor: "pointer",
                  fontSize: 20,
                  paddingTop: 20,
                }}
              >
                Login
              </p>
            </li> : null}
           
           { uid === undefined ? <li className="" onClick={goSignup}>
              <p
                className=""
                style={{
                  cursor: "pointer",
                  fontSize: 20,
                  paddingTop: 20,
                }}
              >
                SignUp
              </p>
            </li> : null}

           {currUser.email === 'admin@gmail.com' ? <li className="" onClick={goAddItems}>
              <p
                className=""
                style={{
                  cursor: "pointer",
                  fontSize: 20,
                  paddingTop: 20,
                }}
              >
                Add Items
              </p>
            </li> : null}

           { uid ? currUser.email === 'admin@gmail.com' ?  null : <li className="" onClick={goContactus}>
              <p
                className=""
                style={{
                  cursor: "pointer",
                  fontSize: 20,
                  paddingTop: 20,
                }}
              >
                Contact Us
              </p>
            </li> : null}

           {currUser.email === 'admin@gmail.com' ? <li className="" onClick={goOrders}>
              <p
                className=""
                style={{
                  cursor: "pointer",
                  fontSize: 20,
                  paddingTop: 20,
                }}
              >
               Buyer Orders
              </p>
            </li> : null }

          { currUser.email === 'admin@gmail.com' ? <li className="" onClick={goMessage}>
              <p
                className=""
                style={{
                  cursor: "pointer",
                  fontSize: 20,
                  paddingTop: 20,
                }}
              >
               {uid ? msgLength === '' ? null :  <div style={{position: 'absolute', left: '26%', top: '32vh', width: 30, height: 30, backgroundColor: 'red', borderRadius: 15}}>
                <p style={{color: '#f1f1f1', textAlign: 'center'}}>{msgLength}</p>
                </div> : null}
                Messages
              </p>
            </li> : null}

            <li className="" onClick={goAboutus}>
              <p
                className=""
                style={{
                  cursor: "pointer",
                  fontSize: 20,
                  paddingTop: 20,
                }}
              >
                About Us
              </p>
            </li>

         { uid ? currUser.email === 'admin@gmail.com' ?  null : <li className="" onClick={goShowCarts}>
          <p
                className=""
                style={{
                  fontSize: 20,
                  paddingTop: 20,
                  color: '#f1f1f1'
                }}
              >
                {allItems.length > 0 ? <p style={{position: 'absolute', zIndex: 1, top: '33vh', right: '17vh', backgroundColor: '#f36e36', width: 30, height: 30, borderRadius: 15, color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer',}}>{allItems.length}</p> : null}
                <Icon.Cart4 style={{marginBottom: 6, marginLeft: 10, color: 'black', fontSize: 45, cursor: 'pointer', }} />
              </p>
          </li> : null }

        {uid ? currUser.email === 'admin@gmail.com' ?  null : <li className="" onClick={goYourOrder}>
          <p
                className=""
                style={{
                  cursor: "pointer",
                  paddingTop: 20,
                  fontSize: 20,
                }}
              >
                Your Orders
              </p>
          </li> : null}

         {uid ? <button style={{
             marginTop: 20
         }} type="button" className="btn btn-outline-success" onClick={logBtn}>Log Out</button> : null}
          </ul>

        </nav>
        )
    }

export default SideDrawer
