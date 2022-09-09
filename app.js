const path = require("path");
const express = require("express");
const csrf = require("csurf");
const expressSession = require("express-session");

const createSessionConfig = require("./config/session");
const db = require("./data/database");
const addCSRFToken = require("./middlewares/csrf-token");
const handleErrors=require("./middlewares/error-handler");
const authRoutes = require("./routes/auth.routes");
const errRoutes = require("./routes/error.routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));

app.use(expressSession(createSessionConfig()));
app.use(csrf());
app.use(addCSRFToken);

app.use(handleErrors);

app.use(authRoutes);
app.use(errRoutes);

db.connectToDatabase().then(function() {
  app.listen(3000);
}).catch(function(error) {
  console.log("Failed to connect to the DB!");
  console.log(error);
});
