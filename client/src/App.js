import React, { Component } from 'react';
import './stylesheets/index.scss';
import Login from './Login';
import SignUp from './SignUp';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Hello from React!</h2>
      	<Login />
    		<SignUp />
      </div>
    );
  }
}

export default App;
