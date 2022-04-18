const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
	{
        name: { type: String, required: true },
        email: { type: String, required: true , unique : true},
		user_type: { type: String ,required : true}, // 0 is for client 1 is for admin
        password: { type: String, required: true,minlength:6 },

	},
)


const User = mongoose.model("User", UserSchema);
module.exports = User;
