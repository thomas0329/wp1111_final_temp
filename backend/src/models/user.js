import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
	name: String,
	email: String,
	password: String,
	Image: [{
		name: String,
  	link: String,
  	img: String
	}]
});
const UserModel =
	mongoose.model('User',
	UserSchema);

export { UserModel as default };
