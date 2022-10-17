const getLevel = async (parent, args, context) => {
	try {
		const { levelId } = args;
		const level = await context.services.level.getLevel(levelId);
		return level;
	} catch (err) {
		throw { err };
	}
};

module.exports = {
	Query: { getLevel }
};
