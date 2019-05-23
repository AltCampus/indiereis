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

import { store } from "./store";

const URL = "http://localhost:8000/api";

if (localStorage.jwt) {
  //	console.log('inside login...')
  const { jwt } = localStorage;
  fetch(URL + "/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: jwt
    }
  })
    .then(res => res.json())
    .then(data => {
      //	console.log('inside login...', data)

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
