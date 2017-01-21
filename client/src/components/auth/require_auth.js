import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
	class Authentication extends Component {
		// Gives access to this.context.router
		static contextTypes = {
			router: React.PropTypes.object
		}

		componentWillMount() {
			// If user is not authenticated, navigate to /signin
			if(!this.props.authenticated) {
				this.context.router.push('/signin');
			}
		}

		render() {
			return <ComposedComponent {...this.props} />
		}
	}

	function mapStateToProps(state) {
		return { authenticated: state.auth.authenticated };
	}

	return connect(mapStateToProps)(Authentication);
}
