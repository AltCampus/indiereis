import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

class UserDash extends Component {
  handleClick = () => {
    this.props.history.push('/user-profile');
  }

	render() {
		const user = this.props.loggeduser ? this.props.loggeduser.user :  '';

		return (
			<div style={{cursor: 'pointer'}} className="user-dash" onClick={this.handleClick}>
        {
          user ? 
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
              { 
                user.photo ? 
                  <img style={{width:"40px", height: '40px', borderRadius:'50%'}} src={user.photo} alt='profile-image' /> 
                :
                <div style={{height: "40px", width: "40px", borderRadius:'50%', background: "green", display:"grid", placeItems:"center"}}>
                  <span style={{color:"#fff"}}>{user.name.slice(0,1).toUpperCase()}</span>
                </div>
              }
						  <p className="user-info">Hello {user.name}</p>
            </div> 
          : null
        }
      </div>
		);
	}
}

function mapStateToProps(state) {
  return {
    loggeduser: state.User.user,
  };
}

export default withRouter(connect(mapStateToProps)(UserDash));

