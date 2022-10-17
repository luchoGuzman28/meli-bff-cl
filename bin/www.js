#!/usr/bin/env node
'use strict';

const config = require(`config`);

const Server = require(`../src`);
const logger = require(`../src/core/logger`);
const { version } = require(`../package.json`);

const ENTITY = `www`;
const ACTION = `start`;

const opts = {
	port: config.get(`server.port`),
	debug: process.env.NODE_ENV !== `production`,
	tracing: process.env.NODE_ENV !== `production` ? `enabled` : `disabled`,
	playground: process.env.PLAYGROUND
};

Server.start(opts, () => {
	logger.info(`Server start`, {
		entity: ENTITY,
		action: ACTION,
		data: {
			loggingLevel: config.get(`loggingLevel`),
			port: opts.port,
			version
		}
	});
});
