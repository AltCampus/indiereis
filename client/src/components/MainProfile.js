import { connect } from 'react-redux';
import React from 'react';
import Header from './Header';
const { jwt } = localStorage;
const URL = "http://localhost:8000/api/v1";

class MainProfile extends React.Component{
	state = {
    firstName : "",
    lastName:"",
    name:"",
    email: "",
    dob:"",
    phoneNumber:"",
    photo: ""
  }

  componentDidMount(){
    var { user } = this.props;
    if(!user) setTimeout(this.getUser, 1000);
  }

  getUser = () => {
    var { user } = this.props;
    if(user){
      this.setState({
        firstName: user.user.firstName,
        lastName: user.user.lastName,
        name: user.user.name,
        email: user.user.email,
        dob: user.user.dob,
        phoneNumber: user.user.phoneNumber,
      })
    }
    else if(!user){
      setTimeout(this.getUser, 2000);
    }
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({ [name]: value });
  }

	handleFile = (e) => {
    const photo = event.target.files[0];
    this.previewFile(photo);
  };

  previewFile = (data) => {
    var file = data;
    const sendImg = (url) => {
      url ? this.setState({ photo: url }) : null;
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
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cloudData),
          }).then((res) => res.json())
          .then(data => {
            sendImg(data.secure_url);
          });
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${URL}/users/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": jwt
      },
      body: JSON.stringify(this.state),
      }).then(res => res.json())
      .then(data => {
        console.log(data, "profile updated...");
        this.setState({})
    })
  }

	render(){
		return( 
      <div>
				<Header />
				<form className="profile-flex onclick-display-main" onSubmit={this.handleSubmit}>
					<div className="profile-name">
						<input type="text" placeholder="First name" onChange={ this.handleChange } value={this.state.firstName} name="firstName" />
						<input type="text" placeholder="Last name" name="lastName" onChange={ this.handleChange } value={this.state.lastName} />
					</div>
					<input type="text" placeholder="Username" name="name" onChange={ this.handleChange } value={this.state.name}/>
					<input type="email" placeholder="Email" name="email" onChange={ this.handleChange } value={this.state.email} readOnly />

					<input type="number" placeholder="Phone Number" name="phoneNumber" onChange={ this.handleChange } value={this.state.phoneNumber} />

					<input type="date" placeholder="Date of Birth" name="dob" onChange={ this.handleChange } value={this.state.dob} />
					<input type="file" placeholder="Upload new profile image" name="photo" onChange={ this.handleFile } />		
					<button type="submit" className="btn-standard">Save</button>
				</form>
  		</div> 
    )
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.User.user,
	}
}

export default connect(mapStateToProps)(MainProfile);