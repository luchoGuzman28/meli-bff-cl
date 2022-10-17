const path = require(`path`);
const { getResolvers } = require(`../core/util`);
const { name, version, description } = require(`../../package.json`);
const DEFINITIONS_PATH = path.join(__dirname, `definitions`);
const resolvers = getResolvers(DEFINITIONS_PATH);
resolvers.Query = resolvers.Query || {};
resolvers.Query.info = function() {
	return `${name}:${version} -> ${description}`;
};
module.exports = resolvers;
