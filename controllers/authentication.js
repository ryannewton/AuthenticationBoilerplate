const User = require('../models/user');

exports.signup = function(req, res, next) {
	const email = req.body.email;
	const password = req.body.password;

	const user = new User({
		email: email,
		password: password
	});

	// Save profile to database
	user.save(function(err) {
		res.json({ message: "Profile created" });
	});
}
