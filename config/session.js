const expressSession = require('express-session');
const mongoDbStore = require('connect-mongodb-session');

let mongoUrl = "mongodb://127.0.0.1:27017/";
let response = "sessions saved in local directory";
let db = "online-shop";

if (process.env.MONGODB_URL) {
	mongoUrl = process.env.MONGODB_URL;
	response = "sessions saved in mongodb url";
	db = process.env.MONGO_DB;
}
if (process.env.MONGO_USER) {
	const user = process.env.MONGO_USER;
	const pwd = process.env.MONGO_PWD;
	const cluster = process.env.MONGO_CLUSTER;
	mongoUrl = `mongodb+srv://${user}:${pwd}@${cluster}.mongodb.net/?retryWrites=true&w=majority`;
	response = "sessions saved in mongodb cluster";
	db = process.env.MONGO_DB;
}

function createSessionStore() {
  const MongoDBStore = mongoDbStore(expressSession);

  const store = new MongoDBStore({
    uri: mongoUrl,
    databaseName: db,
    collection: 'sessions'
  });
  console.log(response);
	console.log(`session: ${db}`);
  return store;
}

function createSessionConfig() {
  return {
    secret: 'super-secret',
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000
    }
  };
}

module.exports = createSessionConfig;