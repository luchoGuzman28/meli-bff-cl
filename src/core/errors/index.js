'use strict';
const { defaultErrorFormatter } = require(`graphql-yoga/dist/defaultErrorFormatter`);
const HttpStatus = require(`http-status-codes`);

const formatError = error => {
	let code = 500;
	const formattedError = defaultErrorFormatter(error);
	if (error && error.originalError && error.originalError.statusCode) {
		code = error.originalError.statusCode;
	}
	if (error && error.statusCode && error.error) {
		code = error.statusCode;
		formattedError.message = error.error.message;
	}
	formattedError.code = code;
	formattedError.status = HttpStatus.getStatusText(code);
	return formattedError;
};

module.exports = {
	formatError
};
