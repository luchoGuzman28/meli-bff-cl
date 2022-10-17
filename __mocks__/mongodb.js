'use strict';

const mongodb = jest.genMockFromModule(`mongodb`);
const sinon = require(`sinon`);

const cursor = {
	find: sinon.stub(),
	sort: sinon.stub(),
	skip: sinon.stub(),
	limit: sinon.stub(),
	findOneAndUpdate: sinon.stub(),
	findOne: sinon.stub(),
	updateOne: sinon.stub(),
	insertOne: sinon.stub(),
	toArray: sinon.stub()
};

const database = {
	collection: sinon.stub()
};

const client = {
	db: sinon.stub()
};

mongodb.connect = sinon.stub();

const setDefaultBehavior = () => {
	mongodb.connect.resolves(client);

	client.db.resolves(database);

	database.collection.returns(cursor);

	cursor.find.returns(cursor);
	cursor.sort.returns(cursor);
	cursor.skip.returns(cursor);
	cursor.limit.returns(cursor);
	cursor.findOneAndUpdate.resolves({});
	cursor.insertOne.resolves({});
	cursor.findOne.resolves({});
	cursor.updateOne.resolves({});
	cursor.toArray.resolves([]);
};

const reset = () => {
	mongodb.connect.reset();
	client.db.reset();
	database.collection.reset();
	cursor.find.reset();
	cursor.sort.reset();
	cursor.skip.reset();
	cursor.limit.reset();
	cursor.findOneAndUpdate.reset();
	cursor.insertOne.reset();
	cursor.findOne.reset();
	cursor.updateOne.reset();
	cursor.toArray.reset();
	setDefaultBehavior();
};

mongodb.__conf = {
	clientRef: client,
	databaseRef: database,
	cursorRef: cursor,
	reset
};

setDefaultBehavior();

module.exports = mongodb;
