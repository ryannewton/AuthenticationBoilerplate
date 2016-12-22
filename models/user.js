const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defines our user model, with an email and password
const userSchema = new Schema({
	email: { type: String, unique: true, lowercse: true },
	password: String
});

// Compare entered password to saved password
userSchema.methods.comparePassword = function (candidatePassword, callback) {
	if(candidatePassword === this.password) {
		callback(null, true);
	}

	callback(null, false);
}

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
