import React,{useState, useEffect} from "react";
import { useHistory } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import firebase from 'firebase/app';

const CheckOutForm = () => {
  const history = useHistory()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [yourLocation, setYourLocation] = useState('')
  const [email, setEmail] = useState('')
  const [cartNo, setCartNo] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleCartNo = (e) => {
    setCartNo(e.target.value)
  }
  
  const handleFirstName = (e) => {
    setFirstName(e.target.value)
  }

  const handleLastName = (e) => {
    setLastName(e.target.value)
  }

  const handleLocation = (e) => {
    setYourLocation(e.target.value)
  }

  const handleSubmit = async (e) => {
      e.preventDefault()
      setIsLoading(true)
    let uid = firebase.auth()?.currentUser?.uid;
    firebase.database().ref(`/buyItem/${uid}`).push({
        firstName: firstName,
        lastName: lastName,
        yourLocation: yourLocation,
        email: email,
        cartNo: cartNo,
    });
    setIsLoading(false)
    setFirstName('')
    setLastName('')
    setEmail('')
    setYourLocation('')
    setCartNo('')
    alert('Successfully... Order')
  }

  useEffect(() => {
    setFirstName('')
    setLastName('')
    setEmail('')
    setYourLocation('')
    setCartNo('')
  },[])

  return (
      <>
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
            Check Out Form
          </p>
        </div>
      </div>

    <div className="CheckOutForm" style={{display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
      <div className="card text-white bg-secondary mb-3" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "40rem", height: "40rem", borderRadius: 20 }}>
          <form className="row g-3 needs-validation" onSubmit={(e) => handleSubmit(e)}>
        <div className="card-body">
          <h1 style={{textAlign: 'center', fontWeight: 'bold', fontStyle: 'revert',}}>Give Your Credit Cart Details</h1>
        <div className="mb-3"> 
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
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
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => handleLastName(e)}
              required
            />
          </div>

          <div className="mb-3"> 
            <label className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              placeholder="Location"
              value={yourLocation}
              onChange={(e) => handleLocation(e)}
              required
            />
          </div>

          <div className="mb-3"> 
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => handleEmail(e)}
              required
            />
          </div>

          <div className="mb-3"> 
            <label className="form-label">Credit Cart No</label>
            <input
              type="number"
              className="form-control"
              placeholder="Credit Cart"
              value={cartNo}
              onChange={(e) => handleCartNo(e)}
              required
            />
          </div>

              <div className="d-grid gap-2">
              <button className="btn btn-outline-danger" type="submit">{ isLoading ? (
                    <div class="spinner-border" role="status" style={{width: '1.4rem', height: '1.4rem'}}>
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    "Submit"
                  )}</button>
              </div>

              <div style={{display: 'flex',}}>
                  <p style={{fontSize: 25, cursor: 'pointer', marginTop: 20, color: '#f36e36'}} onClick={() => history.push('/showcarts')}>
                <span style={{marginRight: 10, marginBottom: 12, color: 'white'}}>
                   <Icon.ArrowLeft size={30} />
                </span>
                      Go Back
                      </p>
              </div>

        </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default CheckOutForm;
