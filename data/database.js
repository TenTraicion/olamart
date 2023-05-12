require("dotenv").config();

const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let database;
let mongoUrl = "mongodb://127.0.0.1:27017/";
let response = "connected to local directory";
let db = "online-shop";

if (process.env.MONGODB_URL) {
	mongoUrl = process.env.MONGODB_URL;
	response = "connected to mongodb url";
	db = process.env.MONGO_DB;
}
if (process.env.MONGO_USER) {
	const user = process.env.MONGO_USER;
	const pwd = process.env.MONGO_PWD;
	const cluster = process.env.MONGO_CLUSTER;
	mongoUrl = `mongodb+srv://${user}:${pwd}@${cluster}.mongodb.net/?retryWrites=true&w=majority`;
	response = "connected to mongodb cluster";
	db = process.env.MONGO_DB;
}

async function connectToDatabase() {
	const client = await MongoClient.connect(mongoUrl);
	database = client.db(db);
	console.log(response);
	console.log(`server: ${db}`);
}

function getDb() {
	if (!database) {
		throw new Error("You must connect first!");
	}

	return database;
}

module.exports = {
	connectToDatabase: connectToDatabase,
	getDb: getDb,
};
