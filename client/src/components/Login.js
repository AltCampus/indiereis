import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <form action="/users/login" method="post">
      	<input type="text" name="name" placeholder="Username" required />
      	<input type="email" name="email" placeholder="Email" required />
      	<input type="password" name="password" placeholder="Password" required />
      	<input type="submit" value="login" />
      </form>
    );
  }
}

export default Login;
