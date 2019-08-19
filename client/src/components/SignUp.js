import React, { Component } from 'react';
import {connect} from 'react-redux';
import Footer from './Footer';
import { URL } from '../utils/static';
import UserDash from './UserDash';
import NavBar from './NavBar';
import { Link } from "react-router-dom";

class SignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
      }
    }
  }

  handleSignup = (e) => {
    e.preventDefault()
    if(this.state.user.password === this.state.user.confirmpassword) {
    fetch(URL + "/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.user),
    }).then((res) => res.json())
      .then((data) => {
        if(data.token && data.user){
          let jwt = data.token
          localStorage.setItem('jwt', jwt);
          this.props.dispatch(
          {
            type: "REGISTER",
            user: data
          }); 
          this.setState({
            user:{}
          })
        this.props.history.push('/');
        }else if(!data.user) {
           this.setState({
            registerError: "User already exist!",
            user:{}
          })
          this.props.history.push('/signup');
        }
      }) 
    }else if(this.state.user.password !== this.state.user.confirmpassword){
      this.setState({ passwordError: "Password did not match!"})
    }
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      user:{
        ...this.state.user,
        [name]: value,
      }
    })
  }

  render() {
    return (
      <div>
        <NavBar />
        <UserDash />
        <div className="signup">
          <p>Sign Up for a user account</p>
          <form onSubmit= {this.handleSignup} className="signup-form" id={ `encType="multipart/form-data"`}>
          	<input type="text" name="name" placeholder="Username" value={this.state.user.name} onChange= {this.handleChange} required />
            <label style={{textAlign: "left", color: "red"}}>{ this.state.registerError || "" }</label>
          	<input type="email" name="email" placeholder="Email address" value={this.state.user.email} onChange= {this.handleChange} required />
          	<input type="password" name="password" placeholder="Password" value={this.state.user.password} onChange= {this.handleChange} required />
            <label style={{textAlign: "left", color: "red"}}>{ this.state.passwordError || "" }</label>
            <input type="password" name="confirmpassword" placeholder="Confirm password" value={this.state.user.confirmpassword} onChange= {this.handleChange} required />
            <button style={{margin:"0"}} type="submit" className="btn-standard">Register</button>
          </form>
          <div style={{display:"flex", justifyContent:'space-between', padding:"20px 0"}}> 
            <span>Already have an account?</span>
            <Link to = "/login" >
              <strong > Log In </strong>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    newuser: state.User
  }
}


export default connect(mapStateToProps)(SignUp);
