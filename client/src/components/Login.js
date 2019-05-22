import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import Footer from './Footer';

const URL = "http://localhost:8000/api";

class Login extends Component {
  constructor(){
    super()
    this.state = {
      user: {
        email: "",
        password: ""
      }
    }
  }

  handleLogin = (e) => {
    e.preventDefault()
    const {jwt} = localStorage;
    fetch(URL + '/users/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": jwt
      },
      body: JSON.stringify(this.state.user)
    }).then(res => res.json()).then(user => {
      console.log(user, "user fetch")
        this.props.dispatch(
          { type: 'LOGIN', 
            payload: user
          }
        );
        this.setState({
          user:{
            email: "",
            password: "",
          }
        })
      this.props.history.push('/')
    })
  }

  handleChange = (e) => {
    const {name, value} = e.target
    this.setState({
      user:{
        ...this.state.user,
        [name]: value
      }
    })
  }

  render() {
    return (
      <div>
        <Header />
        <div className="signup">
          <p>Login using your account</p>
          <form action="/users/login" method="post" className="signup-form" onSubmit={this.handleLogin}>
          	<input type="email" name="email" placeholder="Email" value={this.state.user.email} onChange= {this.handleChange} required />
          	<input type="password" name="password" placeholder="Password" value={this.state.user.password} onChange= {this.handleChange} required />
          	<button type="submit" className="btn-standard">Login</button>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggeduser: state.User
  }
}

export default connect(mapStateToProps)(Login);
