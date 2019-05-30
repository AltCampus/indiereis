// import React, { Component } from 'react';
// import Contribute from "./Contribute";
// import { connect } from 'react-redux';
// import FormPage1 from "./FormPage1";
// import FormPage2 from "./FormPage2";
// import FormPage3 from "./FormPage3";
// import FormPage4 from "./FormPage4";
// import FormPage5 from "./FormPage5";
// import FormPage6 from "./FormPage6";

// class Form extends Component {
// 	state = {
// 		page: 0
// 	}

// 	incPage = () => {
// 		console.log("inside inc...")
// 		this.setState({ page: this.page + 1 })
// 	}

// 	render() {
// 		var form = this.state.page;
// 		return (
// 			<>
// 			<p>form</p>
// 			{ 
// 				<>
// 					form === 0 ? 
// 					<Contribute />
// 					:form === 1 ?
// 					<FormPage1 incPage={this.state.incPage} />:
// 					form === 2 ?
// 					<FormPage2 incPage={this.state.incPage} />:
// 					form === 3
// 					<FormPage3 incPage={this.state.incPage} />:
// 					form === 4
// 					<FormPage4 incPage={this.state.incPage} />:
// 					form === 5 
// 					<FormPage5 incPage={this.state.incPage} />:
// 					form === 6 
// 					<FormPage6 incPage={this.state.incPage} />:
// 					null
// 				</>
// 			}
// 			</>
// 		)
// 	}
// }

// const mapStateToProps = (state) => {
// 	return {
// 		data: state
// 	}
// }

// export default connect(mapStateToProps)(Form);
