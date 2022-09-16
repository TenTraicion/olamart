const User = require("../models/user.model");
const authUtil = require("../util/authentication");
const validation = require("../util/validation");
const sessionFlash = require("../util/session-flash");

function getSignup(req, res) {
	res.render("customer/auth/signup");
}

async function signup(req, res, next) {
	const enteredData = {
		email: req.body.email,
		password: req.body.password,
		fullname: req.body.fullname,
		street: req.body.street,
		postal: req.body.postal,
		city: req.body.city
	}
	if (
		!validation.userDetailsAreValid(
			req.body.email,
			req.body.password,
			req.body.fullname,
			req.body.street,
			req.body.postal,
			req.body.city
		) || !validation.emailisConfirmed(req.body.email, req.body["confirm-email"])
	) {
		sessionFlash.flashDataToSession(req, {
			errorMessage: "Input Invalid",
			...enteredData
		}, function() {
			res.redirect("/signup");
		});
		return;
	}

  const user = new User(
		req.body.email,
		req.body.password,
		req.body.fullname,
		req.body.street,
		req.body.postal,
		req.body.city
	);

	try {
    const existAlready = await user.existAlready();

    if(existAlready) {
			sessionFlash.flashDataToSession(req, {
				errorMessage: "User Exist!",
				...enteredData
			}, function() {
				res.redirect("/login");
			});
    return;
  }
		await user.signup();
	} catch (error) {
		return next(error);
	}

	res.redirect("/login");
}

function getLogin(req, res) {
	res.render("customer/auth/login");
}

async function login(req, res, next) {
	const user = new User(req.body.email, req.body.password);
	let existingUser;
	try {
		existingUser = await user.getUserWithSameEmail();
	} catch (error) {
		return next(error);
	}

	const sessionErrorData = {
		errorMessage: "Invalid credentials!",
		email: user.email,
		password: user.password
	};

	if (!existingUser) {
		sessionFlash.flashDataToSession(req, sessionErrorData, function() {
			res.redirect("/login");
		});
		return;
	}

	const passwordIsCorrect = await user.hasMatchingPassword(
		existingUser.password
	);

	if (!passwordIsCorrect) {
		sessionFlash.flashDataToSession(req, sessionErrorData, function() {
			res.redirect("/login");
		});
		return;
	}

	authUtil.createUserSession(req, existingUser, function () {
		res.redirect("/");
	});
}

function logout(req, res) {
	authUtil.destroyUserAuthSession(req);
	res.redirect("/login");
}

module.exports = {
	getSignup: getSignup,
	getLogin: getLogin,
	signup: signup,
	login: login,
	logout: logout,
};
