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
import Discover from "./components/Discover";
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

    fetch(`${URL}/public-data`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem('jwt')
        },
      }).then(res => res.json()).then(data => {
        // console.log(data, 'inside fetch')
        this.props.dispatch({
          type: 'SHOW_FORM_DATA',
          formData: data
        });
      })      
  }

  render() {
    const data = this.props.crowdsourced ? this.props.crowdsourced.data : null;
    const countryList = this.props.scrappedCountries ? this.props.scrappedCountries.data : null

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
          <Route path="/discover" component={Discover} />
          <Route path="/about" component={About} />
           { this.props.crowdsourced ? data.map((d, i) => 
          <PrivateRoute path={'/'+d.country} auth={this.props.isAuth} component={CountryProfile} />
          ) : null
         }
         {/*
          this.props.scrappedCountries ? countryList
         */}
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state, "app")
  return {
    loggeduser: state.User,
    isAuth:state.User.isAuthenticated,
    crowdsourced: state.Crowdsourced.data,
    // scrappedCountries: state.Country.data
  };
}

export default withRouter(connect(mapStateToProps)(App));
