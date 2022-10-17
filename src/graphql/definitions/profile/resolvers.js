const getUserInformation = async (parent, args, context) => {
	try {
		const { userId } = args;
		const userInformation = await context.services.profile.getUserInformation(userId);
		return userInformation;
	} catch (err) {
		throw { err };
	}
};

const getUserPurchases = async (parent, args, context) => {
	try {
		const { userId } = args;
		const userInformation = await context.services.profile.getUserPurchases(userId);
		return userInformation;
	} catch (err) {
		throw { err };
	}
};

module.exports = {
	Query: { getUserInformation, getUserPurchases }
};
