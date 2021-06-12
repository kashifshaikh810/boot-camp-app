import React,{useState, useEffect} from "react";
import { useHistory, Redirect } from 'react-router-dom';
import firebase from 'firebase/app';

const Login = () => {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showErr, setShowErr] = useState('')
  const [showPassErr, setShowPassErr] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value)
    setShowErr('')
    setShowPassErr('')
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
    setShowErr('')
    setShowPassErr('')
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
        setIsLoading(true)
        await firebase.auth().signInWithEmailAndPassword(email, password)
        history.push('/')
        setIsLoading(false)
        setEmail('')
        setPassword('')
    }catch(err){
      console.log(err);
      if(err?.code === "auth/user-not-found"){
        setShowErr('There is no user Record')
      }
      if(err?.code === "auth/wrong-password"){
        setShowPassErr('invalid password.')
      }
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setEmail('')
    setPassword('')
  },[])

if(firebase.auth()?.currentUser?.uid){
  <Redirect to="/" />
}  
  return (
    <div className="login" style={{display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
      <div className="card text-white bg-secondary mb-3" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "40rem", height: "40rem", borderRadius: 20 }}>
          <form className="row g-3 needs-validation" noValidate  onSubmit={(e) => handleSubmit(e)}>
        <div className="card-body">
          <h1 style={{textAlign: 'center', fontWeight: 'bold', fontStyle: 'revert'}}>Login</h1>
        <div className="mb-3"> 
            <label style={{color: showErr ? 'red' : '#f1f1f1'}} 
              id="validationCustom01"
              className="form-label">Email</label>
            <input
              type="email"
              id="validationCustom01"
              className="form-control danger"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => handleEmail(e)}
              required
            />
            
          </div>

          <div className="mb-3">
            <label className="form-label"  
              id="validationCustom02"
              style={{color: showPassErr ? 'red' : '#f1f1f1' }}>Password</label>
            <input
              type="password"
              id="validationCustom02"
              className="form-control" 
              placeholder="password"
              value={password}
              onChange={(e) => handlePassword(e)}
              required
            />
          
          </div>

            <p style={{color: 'red', textAlign: 'center'}}>{showErr}</p>
            <p style={{color: 'red', textAlign: 'center'}}>{showPassErr}</p>

              <div className="d-grid gap-2">
              <button className="btn btn-outline-danger" type="submit">{isLoading ? (
                    <div class="spinner-border" role="status" style={{width: '1rem', height: '1rem'}}>
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    "Login"
                  )}</button>
              </div>

              <div style={{display: 'flex', justifyContent: 'space-evenly', paddingTop: 10}}>
                <div>
                <p style={{fontStyle: 'revert'}} >dont have an account?</p>
                </div>
 
                <div onClick={() => history.push('/signup')}>
                <p style={{fontWeight: 'bold', fontStyle: 'revert', cursor: 'pointer'}}>SignUp</p>
                </div>
              </div>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
