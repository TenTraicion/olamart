function getSignUp(req, res) {
  res.render("customer/auth/signup");
}

function signup(req, res) {}

function getLogIn(req, res) {
  //...
}

module.exports = {
  getSignUp: getSignUp,
  getLogIn: getLogIn,
  signup: signup,
};
