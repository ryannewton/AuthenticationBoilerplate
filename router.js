const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// Note: passport uses cookies by default. {session:false} stops this since we are using a token instead
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
	app.post('/signup', Authentication.signup);
	app.post('/signin', requireSignin, Authentication.signin);
}
