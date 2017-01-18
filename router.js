const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// Note: passport uses cookies by default. {session:false} stops this since we are using a token instead
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
	// Example route that requires authentication before it can be accessed
	app.get('/hidden', requireAuth, function(req, res) {
		// This is the hidden content
		res.send({ message: "You're in!" });
	});
	app.post('/signup', Authentication.signup);
	app.post('/signin', requireSignin, Authentication.signin);
}
