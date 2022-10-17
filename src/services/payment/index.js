'use strict';
const request = require(`request-promise`);
const config = require(`config`);
const MELI_API_ENDPOINT = config.get(`endpoints.api-meli.uri`);

const getPayment = async paymentId => {
	const uri = `${MELI_API_ENDPOINT}/payment/${paymentId}`;
	try {
		const payment = await request({ uri, json: true });
		return payment;
	} catch (err) {
		throw err;
	}
};

module.exports = { getPayment };
