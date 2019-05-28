import React from 'react';

class SourcedForm extends React.Component{
	render(){
		return(
				<div>
				<h2 style={{textAlign:'center'}}>Below are the countries for which you have contributed</h2>
					<div className="main-card">
						<div class="wrapper">
							<div className="main-grid">
								<div className="big-box bg1">Malaysia</div>
								<div className="box bc2">Japan</div>
								<div className="box bg3">Korea</div>
							</div>
						</div>
					</div>
				</div>
					)
			}
}

export default SourcedForm;