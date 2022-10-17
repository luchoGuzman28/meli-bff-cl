#!/usr/bin/env node
'use strict';

const config = require(`config`);

const Server = require(`../src`);
const logger = require(`../src/core/logger`);
const { version } = require(`../package.json`);

const definitionPort = config.get(`server.port`);

const opts = {
	port: process.env.PORT || 3000,
	playground: process.env.PLAYGROUND
};

Server.start(opts, () => {
	logger.info(`Server start`, {
		data: {
			loggingLevel: config.get(`loggingLevel`),
			port: opts.port,
			version
		}
	});
});
