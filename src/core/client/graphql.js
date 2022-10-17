const fetch = require(`node-fetch`);
const { createHttpLink } = require(`apollo-link-http`);
const { InMemoryCache } = require(`apollo-cache-inmemory`);
const { setContext } = require(`apollo-link-context`);
const { ApolloClient } = require(`apollo-client`);

let clientInstance;

const httpLink = uri =>
	createHttpLink({
		uri,
		fetch
	});

const authLink = token =>
	setContext((_, { headers }) => {
		return {
			headers: {
				...headers,
				authorization: token ? `Bearer ${token}` : ``
			}
		};
	});

const createLink = (uri, auth) => authLink(auth).concat(httpLink(uri));

exports.create = ({ uri, auth }) => {
	clientInstance = new ApolloClient({
		link: createLink(uri, auth),
		cache: new InMemoryCache()
	});
};

exports.getInstance = () => clientInstance;
