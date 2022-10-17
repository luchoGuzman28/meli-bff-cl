'use strict';

const {
	createLogger,
	format: { json },
	transports
} = require(`winston`);

const config = require(`config`);
const level = config.get(`loggingLevel`);

const { name } = require(`../../../package.json`);

const replaceError = ({ message, entity, action }) => ({ message, entity, action });

const replacer = (key, value) => (value instanceof Error ? replaceError(value) : value);

const options = {
	level,
	defaultMeta: { name, environment: config.util.getEnv(`NODE_ENV`) },
	format: json({ replacer }),
	transports: [
		new transports.Console(),
		new transports.File({
			filename: `/var/log/bff-meli.log`
		})
	]
};

module.exports = createLogger(options);
