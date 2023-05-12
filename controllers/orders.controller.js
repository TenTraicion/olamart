const Order = require("../models/order.model");
const User = require("../models/user.model");
const stripe = require("stripe")(
	"sk_test_51MmdmTJGB6rAWGzrgSXN9TfeUQUE7xo1L3VPYNvWROKrJNkE2xa7AzAvjFVTE10wN7JJYKI1JYQ867W1zEj0SJ3K00n05JbUYh"
);

async function getOrders(req, res) {
  try {
    const orders = await Order.findAllForUser(req.session.uid);
    res.render('customer/orders/all-orders', { orders: orders });
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
  const order = new Order( cart, userDocument);
  try {
    await order.save();
  } catch (error) {
    return next(error);
  }
  req.session.cart = null;

  const session = await stripe.checkout.sessions.create({
			line_items: [
				{
					// Provide the exact Price ID (for example, pr_1234) of the product you want to sell
					price_data: {
						currency: "usd",
						product_data: {
							name: "T-shirt",
						},
						unit_amount_decimal: 2000,
					},
					quantity: 1,
				},
			],
			mode: "payment",
			success_url: `localhost:3000/orders/success`,
			cancel_url: `localhost:3000/orders/failure`,
		});

		res.redirect(303, session.url);
}

function getSuccess(req, res) {
  res.render('customer/orders/success');
}

function getFailure(req, res) {
  res.render('customer/orders/failure');
}

module.exports = {
  createOrder: createOrder,
  getOrders: getOrders,
  getSuccess: getSuccess,
  getFailure: getFailure
};