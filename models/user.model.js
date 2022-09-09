const bcrypt = require("bcryptjs");
const db = require("../data/database");

class User{
  constructor(username, email, password, fullname, street, postal, city) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.name = fullname;
    this.address = {
      street: street,
      postalCode: postal,
      city: city,
    };
  }

  async signup() {
    const pwd = await bcrypt.hash(this.password, 16);
    await db.getDb().collection("users").insertOne({
      username: this.username,
      email: this.email,
      password: pwd,
      name: this.name,
      address: this.address,
    });
  }
}

module.exports = User;