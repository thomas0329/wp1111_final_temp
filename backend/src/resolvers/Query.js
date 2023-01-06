import UserModel from '../models/user';

const Query = {
	image: async (parent, { user } ) => {
		// console.log(user)
		const work = await UserModel.findOne({ user: user })
		// console.log(work)
		return work

	},

	user: async (parent, { id, name, email }) => {
		const user = await UserModel.findOne({ name: name })
		return user
	}

};
export default Query