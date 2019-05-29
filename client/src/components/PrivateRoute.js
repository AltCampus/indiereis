import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, auth, user, ...rest }) => {
  console.log(auth, user);

  return(
    <div>
    {!user.isAuthInProgress ?
      <Route {...rest} render={(props) => (
        auth
        ? <Component {...props} />
        : <Redirect to={{pathname:'/login'}} />
        )} />
    : null }
    </div>
    )
  }

const mapStateToProps = (state) => {
  return { user: state.User }
}

export default connect(mapStateToProps)(PrivateRoute)