import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/feature';
import Landing from './components/landing';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');

if (token) {
	// If they have a token, set client state to authenticated before page loads
	// Note: If a malicious user sets a fake token, the client will allow
	//  them to navigate to protected routes, but the server will not send protected data
	store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<IndexRoute component = {Landing} />
				<Route path="signin" component={Signin} />
				<Route path="signout" component={Signout} />
				<Route path="signup" component={Signup} />
				<Route path="feature" component={Feature} />
			</Route>
		</Router>
	</Provider>
	, document.querySelector('.container'));
