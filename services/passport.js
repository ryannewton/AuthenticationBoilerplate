const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('../config');

// Create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
	User.findOne({ email: email }, function(err, user) {
		// if there's an error searching the database
		if(err) { return done(err); }

		// if the user isn't found
		if(!user) { return done(null, false); }

		// check password
		user.comparePassword(password, function(err, isMatch) {
			// if the password does not match
			if(!isMatch) { return done(null, false); }

			// if the password does match, return the user
			if(isMatch) { return done(null, user); }
		});
	});
});

// Setup options for JWT Strategy
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
	User.findById(payload.sub, function(err, user) {
		if(err) { return done(err, false); }

		// If user was successfully found
		if(user) {
			done(null, user);
		} else {
			done(null, false);
		}
	});
});

// Connects strategies to passport
passport.use(jwtLogin);
passport.use(localLogin);
