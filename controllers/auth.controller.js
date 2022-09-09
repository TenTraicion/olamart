const User = require("../models/user.model")

function getSignUp(req, res) {
  res.render("customer/auth/signup");
}

async function signup(req, res) {
  const data = req.body;
  const user = new User(data.username, data.email, data.password, data.fullname, data.street, data.postal, data.city);

  await user.signup();

  res.redirect("/login");
}

function getLogIn(req, res) {
  res.render("customer/auth/login");
}

module.exports = {
  getSignUp: getSignUp,
  getLogIn: getLogIn,
  signup: signup,
};
