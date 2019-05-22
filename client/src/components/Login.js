import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';

class Login extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="signup">
          <p>Login using your account</p>
          <form action="/users/login" method="post" className="signup-form">
          	<input type="text" name="name" placeholder="Username" required />
          	<input type="email" name="email" placeholder="Email" required />
          	<input type="password" name="password" placeholder="Password" required />
          	<button type="submit" className="btn-standard">Login</button>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Login;
