'use strict';
const { lstatSync, readdirSync } = require(`fs`);
const { join } = require(`path`);
const _ = require(`lodash`);

const isDirectorySync = source => lstatSync(source).isDirectory();
const getDirectoriesSync = source =>
	readdirSync(source)
		.map(name => join(source, name))
		.filter(isDirectorySync);

const getResolvers = (source, onLoadResolver, name = `resolvers`) => {
	const resolvers = getDirectoriesSync(source).map(dir => {
		const module = join(dir, name);
		const resolver = require(module);
		if (_.isFunction(onLoadResolver)) {
			onLoadResolver(module, resolver);
		}
		return resolver;
	});
	return _.merge({}, ...resolvers);
};

function toHHMMSS(uptime) {
	var secNum = parseInt(uptime, 10);
	var hours = Math.floor(secNum / 3600);
	var minutes = Math.floor((secNum - hours * 3600) / 60);
	var seconds = secNum - hours * 3600 - minutes * 60;

	if (hours < 10) {
		hours = `0` + hours;
	}
	if (minutes < 10) {
		minutes = `0` + minutes;
	}
	if (seconds < 10) {
		seconds = `0` + seconds;
	}
	var time = hours + `:` + minutes + `:` + seconds;
	return time;
}

/**
 *
 * @param {Number} sku
 * @param {String} imageSize small(35x35), thumb(49x49), medium(150x150), carousel(300x300),
 * lightbox-medium(429x429), large(500x500)
 * @param {String} index a,b,c,...
 */

module.exports = {
	isDirectorySync,
	getDirectoriesSync,
	getResolvers,
	toHHMMSS
};
