require("dotenv").config();

const Order = require("../models/order.model");
const User = require("../models/user.model");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function getOrders(req, res) {
	try {
		const orders = await Order.findAllForUser(req.session.uid);
		res.render("customer/orders/all-orders", { orders: orders });
	} catch (error) {
		return next(error);
	}
}

async function createOrder(req, res, next) {
	const cart = res.locals.cart;
	let userDocument;
	try {
		userDocument = await User.findById(req.session.uid);
	} catch (error) {
		return next(error);
	}
	const order = new Order(cart, userDocument);
	try {
		await order.save();
	} catch (error) {
		return next(error);
	}
	req.session.cart = null;

	const session = await stripe.checkout.sessions.create({
		line_items: cart.items.map(function (item) {
			return {
				price_data: {
					currency: "usd",
					product_data: {
						name: item.product.title,
					},
					unit_amount: +item.product.price.toFixed(2) * 100,
				},
				quantity: item.quantity,
			};
		}),
		mode: "payment",
		success_url: process.env.SUCCESS_URL,
		cancel_url: process.env.FAILURE_URL,
	});

	res.redirect(303, session.url);
}

function getSuccess(req, res) {
	res.render("customer/orders/success");
}

function getFailure(req, res) {
	res.render("customer/orders/failure");
}

module.exports = {
	createOrder: createOrder,
	getOrders: getOrders,
	getSuccess: getSuccess,
	getFailure: getFailure,
};
