import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {
	handleFormSubmit({ email, password }) {
		// Add logic to log user in
		this.props.signinUser({ email, password });
	}

	render() {
		const { handleSubmit, fields: { email, password }} = this.props;

		return (
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				<fieldset className="form-group">
					<label>Email:</label>
					<input {...email} className="form-control" />
				</fieldset>
				<fieldset className="form-group">
					<label>Password:</label>
					<input {...password} className="form-control" />
				</fieldset>
				<button action="submit" className="btn btn-primary">Sign in</button>
			</form>
		);
	}
}

// NOTE: reduxForm's API has change in the most recent version
//  This project uses version 5.3.2
export default reduxForm({
	form: 'signin',
	fields: ['email', 'password']
}, null, actions)(Signin);
