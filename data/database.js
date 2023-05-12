const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;
let mongoUrl = 'mongodb://127.0.0.1:27017/';
const db = process.env.MONGO_DB;

if (process.env.MONGODB_URL) {
  mongoUrl = process.env.MONGODB_URL;
}
if (process.env.MONGO_USER) {
  const user = process.env.MONGO_USER;
  const pwd = process.env.MONGO_PWD;
  const cluster = process.env.MONGO_CLUSTER;
  mongoUrl = `mongodb+srv://${user}:${pwd}@${cluster}.mongodb.net/`;
}

async function connectToDatabase() {
  const client = await MongoClient.connect(mongoUrl);
  database = client.db(db);
}

function getDb() {
  if (!database) {
    throw new Error('You must connect first!');
  }

  return database;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb
};