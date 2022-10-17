'use strict';
const { GraphQLServer } = require(`graphql-yoga`);

const config = require(`config`);
const bodyParser = require(`body-parser`);
const resolvers = require(`./graphql/resolvers`);
const services = require(`./services`);
const { name, version } = require(`../package.json`);
const { toHHMMSS } = require(`./core/util`);

const Server = new GraphQLServer({
	typeDefs: `${__dirname}/graphql/schema.graphql`,
	resolvers,
	context: req => ({ ...req, services }),
	tracing: true
});

Server.express.use(bodyParser.json());

Server.express.get(`/health`, function(req, res) {
	res.send({
		status: `UP`,
		up_time: toHHMMSS(process.uptime()),
		info: {
			profile: config.util.getEnv(`NODE_ENV`),
			name,
			version,
			logging: {
				level: config.get(`loggingLevel`)
			}
		}
	});
});

Server.express.use((err, req, res, next) => {
	res.status(200).send({ data: null, err });
});

module.exports = Server;
