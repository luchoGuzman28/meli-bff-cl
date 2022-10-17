const logger = require(`../../../src/core/logger`);

describe(`Logger:`, () => {
	it(`Should has debug level configured`, () => {
		expect(logger.level).toEqual(`debug`);
	});
});
