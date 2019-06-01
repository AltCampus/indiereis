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
//	console.log(this.props.loggeduser)
		const user = this.props.loggeduser ? this.props.loggeduser.user :  '';
    return (
      <div>
        <Header />
        <div className="user-dash">
          {user ? 
						<div className="user-info">Hello {user.name}</div> : ''}
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
