import React from 'react';

class Form extends React.Component{
	render(){
		return(
			<React.Fragment>
					<div className= "form-wrapper">
						<div className="field">
						  <label className="label">Name</label>
						  <div className="control">
						    <input className="input" type="text" />
						  </div>
						</div>

						<div className="field">
						  <label className="label">Subject</label>
						  <div className="control">
						    <div className="select">
						      <select>
						        <option>Pick Country</option>
						        <option>With options</option>
						      </select>
						    </div>
						  </div>
						</div>

						<div className="field">
						  <label className="label">Message</label>
						  <div className="control">
						    <textarea className="textarea" placeholder="Textarea"></textarea>
						  </div>
						</div>

						<div className="field">
						  <div className="control">
						    <label className="checkbox">
						      <input type="checkbox" />
						      I agree to the <a href="#">terms and conditions</a>
						    </label>
						  </div>
						</div>

						<div className="field">
						  <div className="control">
						    <label className="radio">
						      <input type="radio" name="question" />
						      Yes
						    </label>
						    <label className="radio">
						      <input type="radio" name="question" />
						      No
						    </label>
						  </div>
						</div>

						<div className="field is-grouped">
						  <div className="control">
						    <button className="button is-link">Submit</button>
						  </div>
						  <div className="control">
						    <button className="button is-text">Cancel</button>
						  </div>
						</div>
					</div>
				</React.Fragment>
			)
	}
}

export default Form;																														