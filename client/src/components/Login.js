import React, { Component } from "react";
import { connect } from "react-redux";
import Footer from "./Footer";
import GoogleLogin from './GoogleLogin'
import { URL } from '../utils/static';
import UserDash from './UserDash';
import NavBar from './NavBar';
import { Link } from "react-router-dom";

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
        console.log(data, "login....")
        if (data.token && data.user) {
          let jwt = data.token;
          localStorage.setItem("jwt", jwt);
          this.props.dispatch({
            type: "LOGIN",
            user: data
          });
          this.setState({
            user: {}
          });
          this.props.history.push("/dashboard");
        } else if (!data.user) {
          if(data.error === "user not found"){
            this.setState({ emailError: data.error.toUpperCase() });
          }else if(data.error === "incorrect password"){
            this.setState({ passwordError: data.error.toUpperCase() });
          }else if(data.error === "google user"){
            this.setState({ error: data.message.toUpperCase() });
          }
          // this.props.history.push("/login");
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

  handlePassword = () => {
    fetch(`${URL}/users/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.user.email)
    }).then(res => res.json()).then(data => {
      console.log(data, "forgot-password...");
    })
  }

  render() {
    return (
      <div>
        <NavBar />
        <UserDash />
        <div className="flex-dash">
          <div className="signup">
            <p> Login using your account </p>{" "}
            <form action="/users/login"method="post" className="signup-form" onSubmit={this.handleLogin}>
              <label style={{textAlign: "left", color: "red"}}>{ this.state.emailError || this.state.error || "" }</label>
              <input type="email" name="email" placeholder="Email" value={this.state.user.email} onChange={this.handleChange} required />
              <label style={{textAlign: "left", color: "red"}}>{ this.state.passwordError || "" }</label>
              <input type="password" name="password" placeholder="Password" value={this.state.user.password} onChange={this.handleChange} required />
              <button style={{margin:"0"}} type="submit" className="btn-standard"> Login</button>
            </form>
            <p style={{textAlign: "left", color:"dodgerblue", cursor: "pointer", padding:"10px 0"}} onClick={this.handlePassword}>Forgot password</p>
            <div style={{display:"flex", justifyContent:'space-between', padding:"20px 0"}}> 
              <span>Don't have an account</span>
              <Link to = "/signup">
                <strong > Sign up </strong>
              </Link>
            </div>
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
