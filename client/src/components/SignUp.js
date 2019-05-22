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
        this.setState({
          user:{
            name: "",
            email: "",
            password: "",
            confirmpassword: "",
          }
        })
      }
    ) 
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
      	<input type="text" name="name" placeholder="Username" value={this.state.user.name} onChange= {this.handleChange} required />
      	<input type="email" name="email" placeholder="Email address" value={this.state.user.email} onChange= {this.handleChange} required />
      	<input type="password" name="password" placeholder="Password" value={this.state.user.password} onChange= {this.handleChange} required />
        <input type="password" name="confirmpassword" placeholder="Confirm password" value={this.state.user.confirmpassword} onChange= {this.handleChange} required />
      	<input type="submit" value="Register" />
      </form>
    );
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
    state
  }
}


export default connect(mapStateToProps)(SignUp);