'use strict';
const request = require(`request-promise`);
const config = require(`config`);
const MELI_API_ENDPOINT = config.get(`endpoints.api-meli.uri`);

const getShipment = async shipmentId => {
	const uri = `${MELI_API_ENDPOINT}/shipment/${shipmentId}`;
	try {
		const shipment = await request({ uri, json: true });
		return shipment;
	} catch (err) {
		throw err;
	}
};

module.exports = { getShipment };
