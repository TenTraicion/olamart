const Product = require("../models/product.model");

function getCart(req, res, next) {
  res.render('customer/cart/cart');
}

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

function updateCartItem(req, res, next) {
  const cart = res.locals.cart;
  const updatedItemData = cart.updateItem(req.body.id, req.body.quantity);
  req.session.cart = cart;
  res.status(200).json({
    message: "Cart updated successfully!",
    updatedCartData: {
      newTotalQuantity: cart.totalQuantity,
      newTotalPrice: cart.totalPrice,
      updatedItemPrice: updatedItemData.updatedItemPrice,
    }
  });
}

module.exports = {
  addCartItem: addCartItem,
  getCart: getCart,
  updateCartItem: updateCartItem,
};