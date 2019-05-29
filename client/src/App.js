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
import PrivateRoute from './components/PrivateRoute';
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
          <Route path="/contribute"  component={Contribute} />
          <PrivateRoute path="/form/page1" auth={this.props.isAuth} component={FormPage1} />
          <PrivateRoute path="/form/page2" auth={this.props.isAuth} component={FormPage2} />
          <PrivateRoute path="/form/page3" auth={this.props.isAuth} component={FormPage3} />
          <PrivateRoute path="/form/page4" auth={this.props.isAuth} component={FormPage4} />
          <PrivateRoute path="/form/page5" auth={this.props.isAuth} component={FormPage5} />
          <PrivateRoute path="/form/page6" auth={this.props.isAuth} component={FormPage6} />
          <PrivateRoute path="/user-profile" auth={this.props.isAuth} component={MainProfile} />
          <Route path="/submit" component={Home} />
          <Route path="/about" component={About} />
<<<<<<< HEAD
          <PrivateRoute path="/country-profile" auth={this.props.isAuth} component={CountryProfile} />
          <Route exact path="/login" component={Login} />
=======
          <Route path="/country-profile" component={CountryProfile} />
          <Route exact path="/login" component={Login} />{" "}
>>>>>>> f07f01714a06500f089099fe02bc9e64d963c4b2
        </Switch>{" "}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('inside mapState',state)
  return {
    loggeduser: state.User,
    isAuth:state.User.isAuthenticated
  };
}

export default withRouter(connect(mapStateToProps)(App));
