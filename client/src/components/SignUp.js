import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import Footer from './Footer';
// import File from './File';
const URL = "http://localhost:8000/api/v1";

class SignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
        photo: ""
      },
      file:""
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
      // file: JSON.stringify(this.state.user.photo),

    }).then((res) => res.json())
      .then((data) => {
        console.log(data)
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
              // photo: ""
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
              // photo: ""
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

  handleFile =(e) => {
    const photo = event.target.files[0];
    console.log(photo, "photo....");
    this.previewFile(photo);
  };

  previewFile = (data) => {
    var file = data;
    const sendImg = (url) => {
      url ? this.setState({ user:{ photo: url } }) : null;
    }

    var reader = new FileReader();
    let cloud = null;

    reader.addEventListener("load", function () {
      cloud = reader.result;
      var cloudData = {
       file : cloud,
       upload_preset: "zxwgo29d"
      };
      fetch("https://api.cloudinary.com/v1_1/ashutosh-sajan/image/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(cloudData),
          }).then((res) => res.json())
          .then(data => {
            console.log(data, "res data...");
            sendImg(data.secure_url);
          });
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  };

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
          	<input type='file' name='photo' onChange={this.handleFile} />
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
