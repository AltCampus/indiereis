import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import './stylesheets/index.scss';
import { connect} from 'react-redux';
import { BrowserRouter as Router, Route, NavLink, withRouter } from 'react-router-dom';
import {Switch} from 'react-router';
import Header from './components/Header';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import { store } from './store';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </Router>
      </div>
    );
  }
}


// ReactDOM.render(<App />,document.getElementById('root'))

export default withRouter(connect()(App));
