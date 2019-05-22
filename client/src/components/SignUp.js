import React, { Component } from 'react';
// import {register} from '../actions/User';
import {connect} from 'react-redux';
import Header from './Header';
import Footer from './Footer';

const URL = "http://localhost:8000/api";

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
    if(this.state.password === this.state.confirmpassword) {
    fetch(URL + "/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        "authorization": `Token ${jwt}`
      },
      body: JSON.stringify(this.state.user)
    }).then((res) => res.json())
      .then((user) => {
        if(user.token){
          let jwt = user.token
          localStorage.setItem('jwt', jwt);
        }
        // console.log(this.props)
        this.props.dispatch(
        {
          type: "REGISTER",
          user: user
        })
        this.setState({
          user:{
            name: "",
            email: "",
            password: "",
            confirmpassword: "",
          }
        })
        this.props.history.push('/login')
      }
    ) 
  }
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
          <p>Sign Up for a user account</p>
          <form onSubmit= {this.handleSignup} className="signup-form" >
          	<input type="text" name="name" placeholder="Username" value={this.state.user.name} onChange= {this.handleChange} required />
          	<input type="email" name="email" placeholder="Email address" value={this.state.user.email} onChange= {this.handleChange} required />
          	<input type="password" name="password" placeholder="Password" value={this.state.user.password} onChange= {this.handleChange} required />
            <input type="password" name="confirmpassword" placeholder="Confirm password" value={this.state.user.confirmpassword} onChange= {this.handleChange} required />
          	<button type="submit" className="btn-standard">Register</button>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
    newuser: state.User
  }
}


export default connect(mapStateToProps)(SignUp);
