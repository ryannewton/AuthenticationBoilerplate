const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
	const timestamp = new Date().getTime();
	// Creates a token using the user's ID and our secret string
	// sub = the SUBject of the token (standard for JWTs)
	// iat = Issued At Time
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function(req, res, next) {
	const email = req.body.email;
	const password = req.body.password;
	// If no email or password was given, return an error
	if(!email || !password) {
		// Note: 422 error means unprocessible entity
		return res.status(422).send({ error: 'You must provide an email and password' });
	}

	// Checks if the email address is already registered
	User.findOne({ email: email }, function(err, existingUser) {
		// If there was an error checking the database
		if(err) { return next(err); }

		// If the email was found in the database
		if(existingUser) {
			return res.status(422).send({ error: 'Email is in use' });
		}

		// If email is not in the database, we can create a new account
		const user = new User({
			email: email,
			password: password
		});

		// Save profile to database
		user.save(function(err) {
			if(err) { return next(err); }
			res.json({ token: tokenForUser(user) });
		});
	});
}

// Function to be called once the user has already been authenticated
exports.signin = function(req, res, next) {
	res.send({ token: tokenForUser(req.user) });
}
