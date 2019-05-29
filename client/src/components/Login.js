import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import Footer from "./Footer";
import GoogleLogin from './GoogleLogin'
import { URL } from '../utils/static';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        email: "",
        password: ""
      }
    };
  }

  handleLogin = e => {
    e.preventDefault();
    fetch(`${URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.user)
    })
      .then(res => res.json())
      .then(data => {
        if (data.token && data.user) {
          let jwt = data.token;
          localStorage.setItem("jwt", jwt);
          this.props.dispatch({
            type: "LOGIN",
            user: data
          });
          this.setState({
            user: {
              email: "",
              password: ""
            }
          });
          this.props.history.push("/dashboard");
        } else if (!data.user) {
          this.props.history.push("/login");
        }
      });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      }
    });
  };

  render() {
    // console.log(this.props)
    return (
      <div>
        <Header />
        <div className="flex-dash">
          <div className="signup">
            <p> Login using your account </p>{" "}
            <form action="/users/login"method="post" className="signup-form" onSubmit={this.handleLogin}>
              <input type="email" name="email" placeholder="Email" value={this.state.user.email} onChange={this.handleChange} required />
              <input type="password" name="password" placeholder="Password" value={this.state.user.password} onChange={this.handleChange} required />
              <button type="submit" className="btn-standard"> Login</button>
            </form>
          </div>
          <div className="">
            <GoogleLogin />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggeduser: state.User
  };
}

export default connect(mapStateToProps)(Login);
