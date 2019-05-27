import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, User, ...rest }) => (
  <Route {...rest} render={(props) => (
    User.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

const mapStateToProps = (state) => {
  return { User: state.User }
}

export default connect(mapStateToProps)(PrivateRoute)