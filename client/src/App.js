import React, { Component } from "react";
import "./stylesheets/index.scss";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Map from "./components/Map";
import Dashboard from "./components/Dashboard";
import About from "./components/About";
import MainProfile from './components/MainProfile';
import Contribute from "./components/Contribute";
import FormPage1 from "./components/FormPage1";
import FormPage2 from "./components/FormPage2";
import FormPage3 from "./components/FormPage3";
import FormPage4 from "./components/FormPage4";
import FormPage5 from "./components/FormPage5";
import FormPage6 from "./components/FormPage6";
import { store } from "./store";
import CountryProfile from "./components/CountryProfile";

const URL = "http://localhost:8000/api/v1";

//Keeping user logged in

if (localStorage.jwt) {
  const { jwt } = localStorage;
  fetch(`${URL}/users/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authorization": jwt
    }
  })
    .then(res => res.json())
    .then(data => {
      store.dispatch({
        type: "LOGIN",
        user: data
      });
    });
} else {
  //	store.history.push('/login');
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />{" "}
          <Route path="/signup" component={SignUp} />{" "}
          <Route path="/map" component={Map} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/contribute" component={Contribute} />
          <Route path="/form/page1" component={FormPage1} />
          <Route path="/form/page2" component={FormPage2} />
          <Route path="/form/page3" component={FormPage3} />
          <Route path="/form/page4" component={FormPage4} />
          <Route path="/form/page5" component={FormPage5} />
          <Route path="/form/page6" component={FormPage6} />
          <Route path="/user-profile" component={MainProfile} />
          <Route path="/submit" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/country-profile" component={CountryProfile} />
          <Route exact path="/login" component={Login} />{" "}
        </Switch>{" "}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggeduser: state.User
  };
}

export default withRouter(connect(mapStateToProps)(App));
