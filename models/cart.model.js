const Product = require("./product.model");

class Cart {
	constructor(items = [], totalPrice = 0, totalQuantity = 0) {
		this.items = items;
		this.totalPrice = totalPrice;
		this.totalQuantity = totalQuantity;
	}

	async updatePrices() {
		const productIds = this.items.map(function (item) {
			return item.product.id;
		});
		const products = await Product.findMultiple(productIds);
		const deletableCartItemProductIds = [];

		for (const cartItem of this.items) {
			const product = products.find(function (prod) {
				return prod.id === cartItem.product.id;
			});
			if (!product) {
				// product was deleted
				// "scheduled for deletion"
				deletableCartItemProductIds.push(cartItem.product.id);
				continue;
			}
			// product still exists
			// update cartItem price
			cartItem.product = product;
			cartItem.totalPrice = cartItem.product.price * cartItem.quantity;
		}
		if (deletableCartItemProductIds.length > 0) {
			this.items = this.items.filter(function (item) {
				return deletableCartItemProductIds.indexOf(item.product.id) < 0;
			});
		}
		// update cart total price
		this.totalQuantity = 0;
		this.totalPrice = 0;

		for (const item of this.items) {
			this.totalQuantity += item.quantity;
			this.totalPrice += item.totalPrice;
		}
	}

	addItem(product) {
		const cartItem = {
			product: product,
			quantity: 1,
			totalPrice: product.price,
		};

		for (let i = 0; i < this.items.length; i++) {
			const item = this.items[i];
			if (item.product.id === product.id) {
				cartItem.quantity = +item.quantity + 1;
				cartItem.totalPrice = item.totalPrice + product.price;
				this.items[i] = cartItem;

				this.totalQuantity++;
				this.totalPrice += product.price;
				return;
			}
		}
		this.items.push(cartItem);
		this.totalQuantity++;
		this.totalPrice += product.price;
	}

	updateItem(productId, newQuantity) {
		for (let i = 0; i < this.items.length; i++) {
			const item = this.items[i];
			if (item.product.id === productId && newQuantity > 0) {
				const cartItem = { ...item };
				const quantityChange = newQuantity - item.quantity;
				cartItem.quantity = newQuantity;
				cartItem.totalPrice = newQuantity * item.product.price;
				this.items[i] = cartItem;

				this.totalQuantity += quantityChange;
				this.totalPrice += quantityChange * item.product.price;
				return {updatedItemPrice: cartItem.totalPrice};
			} else if (item.product.id === productId && newQuantity <= 0) {
				this.items.splice(i, 1);
        this.totalQuantity -= item.quantity;
				this.totalPrice -= item.totalPrice;
        return { updatedItemPrice: 0 };
			}
		}
	}
}

module.exports = Cart;
