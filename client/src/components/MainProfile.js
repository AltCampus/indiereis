import { connect } from 'react-redux';
import React from 'react';
import Header from './Header';
const { jwt } = localStorage;
// authorization: jwt

class MainProfile extends React.Component{
	state = {
    firstName : "",
    lastName:"",
    name:"",
    email: "",
    phoneNumber:"",
    password: "",
    confirmpassword: "",
    photo: ""
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({ [name]: value });
  }

	handleFile = (e) => {
    const photo = event.target.files[0];
    console.log(photo, "photo....");
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
            console.log(data, "res data...");
            sendImg(data.secure_url);
          });
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
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
					<input type="email" placeholder="Email" name="email" onChange={ this.handleChange } readOnly />

					<input type="number" placeholder="Phone Number" name="phoneNumber" onChange={ this.handleChange } value={this.state.phoneNumber} />

					<input type="date" placeholder="Date of Birth" name="dob" onChange={ this.handleChange } value={this.state.dob} />
					<input type="file" placeholder="Upload new profile image" name="photo" onChange={ this.handleFile } />		
					<button type="submit" className="btn-standard">Save</button>
				</form>
			</div>
		)
	}
}

function mapStateToProps(state){
	console.log(state);
	return {
		user: state
	}
}

export default connect(mapStateToProps)(MainProfile);