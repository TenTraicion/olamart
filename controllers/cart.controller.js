const Product = require("../models/product.model");

async function addCartItem(req, res, next) {
  let product
  try {
    product = await Product.findById(req.body.id);
  } catch (error) {
    return next(error);
  }
  const cart = res.locals.cart;
  cart.addItem(product);
  req.session.cart = cart;
  res.status(201).json({
    message: "Product added to cart successfully!",
    newTotalItems: cart.totalQuantity,
  });
}

module.exports = {
  addCartItem: addCartItem,
};