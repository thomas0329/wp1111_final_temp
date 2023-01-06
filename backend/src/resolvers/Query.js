import UserModel from '../models/user';

const Query = {
	image: async (parent, { name, email } ) => {
		// console.log(user)
		// const work = await UserModel.findOne({ name: name })
		const work = await UserModel.findOne({ email: email })
		// console.log('work', work)
		return work

	},

	
	user: async (parent, { id, name, email }) => {
		const user = await UserModel.findOne({ email: email })
		return user
	}

};
export default Query