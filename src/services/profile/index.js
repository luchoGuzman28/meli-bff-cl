'use strict';
const request = require(`request-promise`);
const config = require(`config`);
const MELI_API_ENDPOINT = config.get(`endpoints.api-meli.uri`);

const getUserInformation = async userId => {
	const uri = `${MELI_API_ENDPOINT}/user/${userId}`;
	let orderInfo = {};
	try {
		const userProfile = await request({ uri, json: true });
        return userProfile;
	} catch (err) {
		throw err;
	}
};


const getUserPurchases = async userId => {
	const uri = `${MELI_API_ENDPOINT}/user/${userId}`;
	try {
		const userPurchases = await request({ uri, json: true });
        return userPurchases;
	} catch (err) {
		throw err;
};
}


module.exports = { getUserInformation, getUserPurchases };
