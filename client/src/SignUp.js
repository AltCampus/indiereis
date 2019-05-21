import React, { Component } from 'react';

class SignUp extends Component {
  render() {
    return (
      <form action="" method="post" >
      	<input type="text" name="name" placeholder="Username" required />
      	<input type="email" name="email" placeholder="Email address" required />
      	<input type="password" name="password" placeholder="Password" required />
        <input type="password" name="password" placeholder="Confirm password" required />
        { /* <input type="file" name="photo" />*/ }
      	<input type="submit" value="login" />
      </form>
    );
  }
}

export default SignUp;
