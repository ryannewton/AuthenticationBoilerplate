import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions to '../../actions';

class Signout extends Component {
	render() {
		return <div>Sorry to see you go...</div>;
	}
}

export default connect(null, actions)(Signout);
