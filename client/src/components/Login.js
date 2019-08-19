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
      },
      changePass: false
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

  handleForgotPass = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handlePassword = () => {
    this.setState({ changePass: true });

    fetch(`${URL}/users/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email : this.state.user.email }),
    })
      .then( res => res.json() )
      .then( data => {
        console.log(data, "forgot-password");
      });
  }

  handleWindow = () => {
    this.setState({ changePass: false });
  }

  otpConfirmPostReq = (data) => {
    console.log(data, "otp");
    fetch(`${URL}/users/confirm-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify( data ),
    }).then(res => res.json()).then(data => {
      if(data.otp){
        this.setState({ changePass: false, addNewPass: true });
      }
      console.log(data, "forgot-password...");
    })
  }

  confirmOTP = (e) => {
    console.log(e.key,e.target.innerText, "onKeyPress...");
    if(e.key === "Enter" && e.target.value.trim()){
      this.otpConfirmPostReq({otp: e.target.value});
    }else if(e.target.innerText === "Submit") {
      console.log(e.target, e.target.innerText, "btn click");
      this.otpConfirmPostReq({ otp: this.state.recoverycode });
    }
  }

  changePassword = () => {
    if(this.state.newPassword === this.state.confirmNewPassword){
      fetch(`${URL}/users/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: this.state.user.email, password: this.state.newPassword }),
      }).then(res => res.json()).then(data => {
        console.log(data, "change-password data...");
        this.setState({ changePass: false, addNewPass: false });
      })
    }else {
      this.setStayte({ err: `password did't match`});
      console.log(this.state.err);
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <UserDash />
          {
            this.state.changePass ?
            <div className="handle-pass-recovery">
              <p style={{ display:'flex', justifyContent:'flex-end', cursor: "pointer" }} onClick={ this.handleWindow }>X</p>
              <label style={{ fontSize: '20px', padding:'20px 0'  }}>Enter the password which is sent to you by mail</label>
              <input style={{ display:'block', padding:'4px 10px', fontSize: '18px', border: "1px solid rgba(0,0,0,0.07)" }} type="text" name="recoverycode" onChange={ this.handleForgotPass } value={ this.state.recoverycode } placeholder="Enter OTP" onKeyPress={ this.confirmOTP } />
              <button style={{ background:'#111', fontSize:'16px', padding:'8px 18px', borderRadius:'4px', marginTop:'10px', color: "#fff" }} onClick={ this.confirmOTP } >Submit</button>
            </div>
            : 
            this.state.addNewPass ?
            <div className="handle-pass-recovery">
              <p style={{ display:'flex', justifyContent:'flex-end', cursor: "pointer" }} onClick={ this.handleWindow }>X</p>
              <label style={{ fontSize: '18px', padding:'20px 0', color: 'red'  }}>{this.state.err ? this.state.err.toUpperCase() : "" }</label>
              <label style={{ fontSize: '18px', padding:'20px 0' }}>Enter your email address</label>
              <input style={{ display:'block', padding:'4px 10px', fontSize: '18px', border: "0.5px solid rgba(0,0,0,0.07)" }} type="text" name="email" value={ this.state.user.email } disabled="true" />
              <label style={{ fontSize: '18px', padding:'20px 0'  }}>Enter new password</label>
              <input style={{ display:'block', padding:'4px 10px', fontSize: '18px', border: "0.5px solid rgba(0,0,0,0.07)" }} type="text" name="newPassword" onChange={ this.handleForgotPass } value={ this.state.newPassword } />
              <label style={{ fontSize: '18px', padding:'20px 0'  }}>Confirm password</label>
              <input style={{ display:'block', padding:'4px 10px', fontSize: '18px', border: "0.5px solid rgba(0,0,0,0.07)" }} type="text" name="confirmNewPassword" onChange={ this.handleForgotPass } value={ this.state.confirmNewPassword } />
              <button style={{ background:'#111', fontSize:'16px', padding:'8px 18px', borderRadius:'4px', marginTop:'10px', color: "#fff" }} onClick={ this.changePassword } >Submit</button>
            </div>
            :
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
                <p style={{textAlign: "left", color:"dodgerblue", cursor: "pointer", padding:"10px 0"}} onClick={ this.handlePassword }>Forgot password</p>
                <div style={{display:"flex", justifyContent:'space-between', padding:"20px 0"}}> 
                  <span>Don't have an account?</span>
                  <Link to = "/signup">
                    <strong > Sign up </strong>
                  </Link>
                </div>
              </div>
              <div className="">
                <GoogleLogin />
              </div>
            </div>
          }
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
