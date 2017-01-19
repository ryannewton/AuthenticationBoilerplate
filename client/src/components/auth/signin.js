import React, { Component } from 'react';
import reduxForm from 'redux-form';

class Signin extends Component {
	render() {
		<form>
		</form>
	}
}

export default reduxForm({
	form: 'signin',
	fields: ['email', 'password']
})(Signin);
