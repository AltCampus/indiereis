import React, { Component } from "react";
import "./stylesheets/index.scss";
import { URL } from './utils/static';
import { connect } from "react-redux";
import queryString from 'query-string';
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
import PrivateRoute from './components/PrivateRoute';
import CountryProfile from "./components/CountryProfile";
// import { store } from "./store";

// const query = queryString.parse(window.location.search);
// console.log(query, "app query....")
// const token = query.t || localStorage.getItem('jwt');

// if (token) {
//   localStorage.setItem("jwt", token);
//   fetch(`${URL}/users/verify`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "authorization": token
//     }
//   })
//     .then(res => res.json())
//     .then(data => {
//       store.dispatch({
//         type: "LOGIN",
//         user: data
//       });
//     });
// } else {
//    store.history.push('/login');
// }


class App extends Component {

  componentDidMount() {
    // google auth token save in localStorage
    const query = queryString.parse(this.props.location.search);
    const token = query.t || localStorage.getItem('jwt');
    if (token) {
      localStorage.setItem("jwt", token);
      fetch(`${URL}/users/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": token
        }
      }).then(res => res.json())
        .then(data => {
          this.props.dispatch({
            type: "LOGIN",
            user: data
          });
          this.props.history.push("/dashboard");
        });
    } else {
      this.props.history.push('/login');
    }
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />{" "}
          <Route path="/signup" component={SignUp} />{" "}
          <Route path="/map" component={Map} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/contribute"  component={Contribute} />
          <PrivateRoute path="/form" auth={this.props.isAuth} component={FormPage1} />
          <PrivateRoute path="/user-profile" auth={this.props.isAuth} component={MainProfile} />
          <Route path="/submit" component={Home} />
          <Route path="/about" component={About} />
          <PrivateRoute path="/country-profile" auth={this.props.isAuth} component={CountryProfile} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggeduser: state.User,
    isAuth:state.User.isAuthenticated
  };
}

export default withRouter(connect(mapStateToProps)(App));
