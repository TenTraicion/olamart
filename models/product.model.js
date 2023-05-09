const mongodb = require("mongodb");
const db = require("../data/database");

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.summary = productData.summary;
    this.price = +productData.price;
    this.description = productData.description;
    this.image = productData.image;
    this.updateImageData();
    if (productData._id) {
      this.id = productData._id.toString();
    }
  }

  static async findById(productId) {
    let prodID;
    try {
      prodID = new mongodb.ObjectId(productId);
    } catch (error) {
      error.code = 404;
      throw error;
    }
    const product = await db.getDb().collection('products').findOne({_id: prodID});
    if (!product) {
      const error = new Error('Product not found');
      error.code = 404;
      throw error;
    }
    return new Product(product);
  }

  static async findAll() {
    const products = await db.getDb().collection('products').find().toArray();

    return products.map(function(productDocument) {
      return new Product(productDocument);
    });
  }

  updateImageData() {
    this.imagePath = `product-data/images/${this.image}`;
		this.imageUrl = `/products/assets/images/${this.image}`;
  }

  async save() {
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
    };

    if (this.id) {
      productData._id = new mongodb.ObjectId(this.id);
      if (!this.image) {
        delete productData.image;
      }
      await db.getDb().collection('products').updateOne({_id: productData._id}, {$set: productData});
      return;
    } else {
      await db.getDb().collection('products').insertOne(productData);
    }
  }

  async replaceImage(newImage) {
    this.image = newImage;
    this.updateImageData();
  }

  remove() {
    return db.getDb().collection('products').deleteOne({_id: new mongodb.ObjectId(this.id)});
  }
}

module.exports = Product;