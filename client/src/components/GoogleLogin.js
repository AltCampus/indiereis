import React from 'react';

class GoogleLogin extends React.Component{
	render(){
		return(
			<div>
				<a href="/auth/google">
					<div className='g-sign-in-button'>
					  <div className="content-wrapper">
						  <div className='logo-wrapper'>  
						    <img src='https://developers.google.com/identity/images/g-logo.png' />
						  </div>  
					    <span className='text-container'> 
					      <span>Sign in with Google</span>
					    </span>
					  </div>  
					</div>
				</a>
			</div>
		)
	}
}

export default GoogleLogin;