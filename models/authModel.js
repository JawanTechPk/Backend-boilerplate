const mongoose = require("mongoose");

const authSchema = mongoose.Schema({
	user_name: {
		type: String,
		require: true,
	},
	wing: {
		type: String,
		require: true,
	},
	designation: {
		type: String,
		require: true,
	},
	office_number: {
		type: String,
		require: true,
	},

	icom_Number: {
		type: String,
		require: true,
	},
	password: {
		type: String,
		require: true,
	},
	online: {
		type: Boolean,
		default: false,
	},
	status: {
		type: String,
		default: "pending",
	},
});

const AuthModel = mongoose.model("user", authSchema);

module.exports = AuthModel;
