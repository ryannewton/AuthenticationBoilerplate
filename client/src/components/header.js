import React, { Component } from 'react';

class Header extends Component {

	renderLinks() {
		// If signed in - display 'Sign out' Link
		// If not signed in - display 'Sign up' and 'Sign in' Links
	}

	render() {
		return (
			<nav className="navbar navbar-light">
				<Link to="/" className="navbar-brand">Redux Auth</Link>
				<ul className="nav navbar-nav">
					{this.renderLinks()}
				</ul>
			</nav>
		);
	}
}

export default Header;
