'use strict';
const request = require(`request-promise`);
const config = require(`config`);
const MELI_API_ENDPOINT = config.get(`endpoints.api-meli.uri`);

const getLevel = async levelId => {
	const uri = `${MELI_API_ENDPOINT}/level/${levelId}`;
	try {
		const level = await request({ uri, json: true });
		return level;
	} catch (err) {
		throw err;
	}
};

module.exports = { getLevel };
