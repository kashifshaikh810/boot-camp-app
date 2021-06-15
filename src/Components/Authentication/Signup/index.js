import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";

const SignUp = () => {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErr, setshowErr] = useState("");
  const [showEmailErr, setshowEmailErr] = useState("");
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setshowEmailErr('')
    setshowErr('')
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
    setshowEmailErr('')
    setshowErr('')
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setshowEmailErr('')
    setshowErr('')
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setshowEmailErr('')
    setshowErr('')
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      await firebase.auth()?.createUserWithEmailAndPassword(email, password);
      firebase.auth().signOut()
      let uid = firebase.auth()?.currentUser?.uid;
      firebase.database().ref(`/newUser/${uid}`).set({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });
      setShow(true);
      setIsLoading(false)
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
       history.push('/login')
    } catch (err) {
      console.log(err);
      setIsLoading(false)
      if (err?.code === "auth/weak-password"){
        setshowErr('Password at least 6 characters.')
      }
      if(err?.code === "auth/invalid-email"){
        setshowEmailErr("email address is badly formatted.")
      }
      if(err?.code === "auth/email-already-in-use"){
        setshowEmailErr('This email is already exist.')
      }
    }
  };

  useEffect(() => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setshowErr("");
  }, []);

  return (
      <div
        className="SignUp"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="card text-white bg-secondary mb-3"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "40rem",
            height: "40rem",
            borderRadius: 20,
          }}
        >
          <form
            className="row g-3 needs-validation"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="card-body">
              <h1
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontStyle: "revert",
                }}
              >
                Sign Up
              </h1>
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
                <label className="form-label" style={{color: showEmailErr ? 'red' : '#f1f1f1'}}>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => handleEmail(e)}
                  required
                />
              </div>
              <p style={{ color: "red", textAlign: 'center' }}>{showEmailErr}</p>

              <div className="mb-3">
                <label className="form-label" style={{color: showErr ? 'red' : '#f1f1f1'}}>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="password"
                  value={password}
                  onChange={(e) => handlePassword(e)}
                  required
                />
              </div>
              <p style={{ color: "red", textAlign: 'center' }}>{showErr}</p>

              <svg xmlns="http://www.w3.org/2000/svg" style={{display: 'none'}}>
              <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
              </symbol>
              </svg>

              {show === true ? (
                <div class="alert alert-success d-flex align-items-center" role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink href="#check-circle-fill"/></svg>
              <div>
              Congratulations ! SignUp Successfully. 
             </div>
              </div>
              ) : null}

              <div className="d-grid gap-2">
                <button className="btn btn-outline-danger" type="submit">
                  {isLoading ? (
                    <div class="spinner-border" role="status" style={{width: '1rem', height: '1rem'}}>
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>
                  
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  paddingTop: 10,
                }}
              >
                <div>
                  <p style={{ fontStyle: "revert" }}>
                    Already have an account?
                  </p>
                </div>

                <div onClick={() => history.push("/login")}>
                  <p
                    style={{
                      fontWeight: "bold",
                      fontStyle: "revert",
                      cursor: "pointer",
                    }}
                  >
                    Login
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
  );
};

export default SignUp;
