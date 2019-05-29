import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  return(
    <Route {...rest} render={(props) => (
      auth
      ? <Component {...props} />
      : <Redirect to={{pathname:'/login'}} />
      )} />
    )
  }

const mapStateToProps = (state) => {
  return { User: state.User }
}

export default connect(mapStateToProps)(PrivateRoute)