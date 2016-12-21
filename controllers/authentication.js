const User = require('../models/user');

exports.signup = function(req, res, next) {
	const email = req.body.email;
	const password = req.body.password;

	// If no email or password was given, return an error
	if(!email || !password) {
		// Note: 422 error means unprocessible entity
		return res.status(422).send({ error: 'You must provide an email and password' });
	}

	const user = new User({
		email: email,
		password: password
	});

	// Save profile to database
	user.save(function(err) {
		res.json({ message: "Profile created" });
	});
}
