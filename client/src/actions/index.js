import axios from 'axios';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
	return function(dispatch) {
	// Submit email/password to the server
	axios.post(`${ROOT_URL}/signin`, { email, password });

	// If request is good...
	// 1. Update stateto indicate user is authenticated
	// 2. Save the JWT token
	// 3. Redirect to the route '/feature'

	// If request is bad...
	// - Show an error to the user
	}
}
