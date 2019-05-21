import React, { Component } from 'react';

class SignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
    }
  }

  handleSignup = (e) => {
    e.preventDefault()
    console.log('inside signup')
    if(this.state.password === this.state.confirmpassword) {
      fetch('/api/users/register', {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
        }), 
      }).then(res => console.log(res))
    }
  }

  handleChange = (e) => {
    const {name, value} = e.target
    this.setState(
      {[name]: value}
    )
  }

  componentDidMount() {

  }

  render() {
    return (
      <form onSubmit= {this.handleSignup} >
      	<input type="text" name="username" placeholder="Username" value={this.state.username} onChange= {this.handleChange} required />
      	<input type="email" name="email" placeholder="Email address" value={this.state.email} onChange= {this.handleChange} required />
      	<input type="password" name="password" placeholder="Password" value={this.state.password} onChange= {this.handleChange} required />
        <input type="password" name="confirmpassword" placeholder="Confirm password" value={this.state.confirmpassword} onChange= {this.handleChange} required />
        { /* <input type="file" name="photo" />*/ }
      	<input type="submit" value="login" />
      </form>
    );
  }
}

export default SignUp;
