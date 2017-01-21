import React, { Component } from 'react';
import requireAuth from './auth/require_auth';

class Feature extends Component {
	render() {
		return (
			<div>Secret section! Congrats, you're authenticated!</div>
		);
	}
}

export default requireAuth(Feature);
