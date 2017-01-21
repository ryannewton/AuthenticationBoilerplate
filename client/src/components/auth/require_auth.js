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

		componentWillUpdate(nextProps) {
			// If user signs out, route to home route
			if(!nextProps.authenticated) {
				this.context.router.push('/');
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
