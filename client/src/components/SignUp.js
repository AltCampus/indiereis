import React, { Component } from 'react';
import {register} from '../actions/User';
import {connect} from 'react-redux';
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
        },
        body: JSON.stringify(this.state.user)
      }).then((response) => response.json())
        .then((user) => {
          console.log(this.props)
          this.props.dispatch(
          {
            type: "REGISTER",
            user: user
          })
        }
      ) this.setState({
          user: {
            name: "",
            email: "",
            password: "",
          }
        })  
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
      <form onSubmit= {this.handleSignup} >
      	<input type="text" name="name" placeholder="Username" value={this.state.name} onChange= {this.handleChange} required />
      	<input type="email" name="email" placeholder="Email address" value={this.state.email} onChange= {this.handleChange} required />
      	<input type="password" name="password" placeholder="Password" value={this.state.password} onChange= {this.handleChange} required />
        <input type="password" name="confirmpassword" placeholder="Confirm password" value={this.state.confirmpassword} onChange= {this.handleChange} required />
      	<input type="submit" value="Register" />
      </form>
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
