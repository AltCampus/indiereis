import React, { Component } from 'react';

export default class File extends Component {
	render() {
		return (
			<form action="api/v1/users/upload" method="post" enctype="multipart/form-data">
				<input type="file" name="photo" />
				<input type="submit" value="Add image" />
			</form>
		);
	}
}
