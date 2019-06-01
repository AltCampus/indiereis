import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import UserProfile from './UserProfile';
import SourcedForm from './SourcedForm';


class Dashboard extends React.Component {
  render() 
	{
		const user = this.props.loggeduser ? this.props.loggeduser.user :  '';
    return (
      <div>
        <Header />
        <div className="user-dash">
          {user ? 
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
              { user.photo ? 
                <img style={{width:"40px", height: '40px', borderRadius:'50%'}} src={user.photo} alt='profile-image' /> 
                :<div style={{height: "40px", width: "40px", borderRadius:'50%', background: "green", display:"grid", placeItems:"center"}}>
                  <span>{user.name.slice(0,1).toUpperCase()}</span>
                </div>
              }
						  <div className="user-info">Hello {user.name}</div>
            </div> 
              : ''
          }
        </div>
        <SourcedForm />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggeduser: state.User.user,
    crowdsourced: state
  };
}

export default withRouter(connect(mapStateToProps)(Dashboard));
