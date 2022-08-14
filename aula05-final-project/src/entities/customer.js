const Base = require("./base/base");

class Customer extends Base {
  constructor({ id, name, age }) {
    super({ id, name });
  }
}

module.exports = Customer;