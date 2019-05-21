import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import './stylesheets/index.scss';
import { BrowserRouter as Router, Route, NavLink, withRouter } from 'react-router-dom';
import {Switch} from 'react-router';
import Header from './components/Header';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';


export default class App extends Component {
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

ReactDOM.render(<App />,document.getElementById('root'))

