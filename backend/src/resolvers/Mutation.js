import bcrypt from 'bcrypt';
import Image from '../models/image';
import fs from 'fs';

const Mutation = {
	// for image upload
	singleUpload: async (parent, { link, file, userEmail }, { UserModel }) => {
		console.log('userupload called');
		const name = file.name;
		// console.log(name)
		// link = Buffer.from(link).toString('base64'); //base64 string without 開頭
		// link = Buffer.from(link.split(",")[1].toString("base64"));
		file = Buffer.from(file.toString('base64'));
		// const img = new Image({name: name, link: link, img: file});

		// console.log('useremail: ', userEmail);
		const user = await UserModel.findOne({ email: userEmail });
		// console.log(user)
		// console.log(user.Image)
		user.Image.push({name: name, link: link, img: file});
		// const img = new Image({filename: name, link: link, img: file});

		// console.log('user: ', user);
		try{
			await user.save();
			console.log("image saved successfully");
		}
		catch(err) {
			console.log(`Error in Saving User: ${err}`);
		}
	},

	// for login system
	signup: async (parent, { email, password, name }, { UserModel }, info) => {
		const passwd = await bcrypt.hash(password, 10);
		// const user = await context.prisma.user.create({
		// 	data: {...args, passwd}
		// });
		console.log(passwd);
		const existing = await UserModel.findOne({ email });
		if (existing){
			throw new Error('User exists! Login instead.');
		}
		// store hashed password
		const user = await new UserModel({ name, email, password: passwd }).save();
		console.log('new user created');
		console.log(user);
		return user;
	},


	login: async (parent, { email, password }, { UserModel }, info) => {
		console.log('login resolver called');
		const user = await UserModel.findOne({ email });
		if (!user) {
			throw new Error('No such user found');
		}
		const valid = await bcrypt.compare(
			password,
			user.password
		);
		if (!valid) {
			throw new Error('Invalid password');
		}
		console.log('successfully logged in');
		return user;
	}
};
  
export { Mutation as default };