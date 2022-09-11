const User = require("../models/user.model");
const authUtil = require("../util/authentication");

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

async function login(req, res) {
  const data = req.body;
  const user = new User(data.email, data.password);
  const existingUser = await user.getUser();

  if(!existingUser) {
    res.redirect("/login");
    return;
  }

  const passwordIsCorrect = await user.matchPWD(existingUser.password);

  if(!passwordIsCorrect) {
    res.redirect("/login");
    return;
  }

  authUtil.createUserSession(req, existingUser, function() {
    res.redirect("/");
  });
}

module.exports = {
  getSignUp: getSignUp,
  getLogIn: getLogIn,
  signup: signup,
};
