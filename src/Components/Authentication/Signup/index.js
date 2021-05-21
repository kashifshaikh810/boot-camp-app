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
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      await firebase.auth()?.createUserWithEmailAndPassword(email, password);
      let uid = firebase.auth()?.currentUser?.uid;
      firebase.database().ref(`/newUser/${uid}`).set({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });
      
      setShow(true);
      setIsLoading(false)
      //  history.push('/login')
    } catch (err) {
      console.log(err);
      setIsLoading(false)
      if (
        err.message ===
        "The email address is already in use by another account."
      ) {
        setshowErr("This Email Already use by Another Account");
      }
    }
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
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
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="password"
                  value={password}
                  onChange={(e) => handlePassword(e)}
                  required
                />
              </div>
              <p style={{ color: "red", fontWeight: "bold" }}>{showErr}</p>

              {show === true ? (
                <div
                  class="alert alert-success d-flex align-items-center"
                  role="alert"
                >
                  Congratulations ! SignUp Successfully. 
                </div>
              ) : null}

              <div className="d-grid gap-2">
                <button className="btn btn-outline-danger" type="submit">
                  {isLoading ? (
                    <div class="spinner-border" role="status">
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
