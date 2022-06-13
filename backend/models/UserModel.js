// 4. CREATION DU MODEL USER
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 55,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		dropDups: true,
		lowercase: true,
		trim: true,
	},
	password: { type: String, required: true, minLength: 6, maxLength: 1024 },
	isAdmin: { type: Boolean, required: true, default: false },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
