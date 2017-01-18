const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Defines our user model, with an email and password
const userSchema = new Schema({
	email: { type: String, unique: true, lowercse: true },
	password: String
});

userSchema.pre('save', function(next) {
	const user = this;

	// Generates a salt, then hashes and saves
	bcrypt.genSalt(10, function(err, salt) {
		if(err) { return next(err); }

		// Hash password using the salt
		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if(err) { return next(err); }

			// Overwrite plain text password with hashed password
			user.password = hash;
			next();
		})
	})
});

// Compare entered password to saved password
userSchema.methods.comparePassword = function (candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if(err) { return next(err); }

		// return the result to the callback
		callback(null, isMatch);
	});
}

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
