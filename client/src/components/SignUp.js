import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import Footer from './Footer';
// import File from './File';
import { URL } from '../utils/static';

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
    console.log("inside submit...")
    if(this.state.password === this.state.confirmpassword) {
    fetch(URL + "/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.user),
    }).then((res) => res.json())
      .then((data) => {
        // console.log(data)  
        if(data.token && data.user){
          let jwt = data.token
          localStorage.setItem('jwt', jwt);
          this.props.dispatch(
          {
            type: "REGISTER",
            user: data
          }); 
          this.setState({
            user:{
              name: "",
              email: "",
              password: "",
              confirmpassword: "",
            }
          })
        this.props.history.push('/');
        }else if(!data.user) {
           this.setState({
            user:{
              name: "",
              email: "",
              password: "",
              confirmpassword: "",
            }
          })
          this.props.history.push('/signup');
        }
      }) 
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
        <Header />
        <div className="signup">
          <p>Sign Up for a user account</p>
          <form onSubmit= {this.handleSignup} className="signup-form" id={ `encType="multipart/form-data"`}>
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
  return {
    newuser: state.User
  }
}


export default connect(mapStateToProps)(SignUp);
