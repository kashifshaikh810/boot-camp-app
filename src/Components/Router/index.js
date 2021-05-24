import React,{useState, useEffect} from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom'
import Login from '../Authentication/Login';
import Signup from '../Authentication/Signup';
import Dashboard from '../Dashboard/index';
import AboutUs from '../AboutUs/index';
import AddItems from '../AddItems/index';
import Orders from '../Orders/index';
import ContactUs from '../ContactUs/index';
import Message from '../BuyerMessages/index';
import Header from '../Header/index';
import Footer from '../Footer/index';
import YourOrders from '../Your Orders/index';
import firebase from 'firebase/app';

const Routing = () => {
  const [uid, setUid] = useState('')

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      let uid = user?.uid;
      setUid(uid);
    });
  },[uid])

  return (
    <Router>
        <Header />
    <Switch>
        <Route exact path="/" component={Dashboard} />
        {uid === undefined ? <Route path="/login" component={Login} /> : null}
        {uid === undefined ? <Route path="/signup" component={Signup} /> : null}
        <Route path="/aboutus" component={AboutUs} />
        <Route path="/additems" component={AddItems} />
        <Route path="/orders" component={Orders} />
        <Route path="/contactus" component={ContactUs} />
        <Route path="/message" component={Message} />
        <Route path="/yourorders" component={YourOrders} />
    </Switch>
      <Footer />
    </Router>
  );
}

export default Routing;