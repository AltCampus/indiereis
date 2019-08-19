export const handleSubmit = () => {
	if(this.state){
		this.props.dispatch({
      type:"ADD_USER_DATA",
      data: this.state
    })
    this.setState({});
	}else {console.log("state is empty")}
}

