const mongoose = require("mongoose");
const { collectionNames } = require("../constants");

const cartSchema = new mongoose.Schema({
  items: [
    {
      offer: {
        type: mongoose.Types.ObjectId,
        ref: collectionNames.OFFERS,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});
const cartModel = mongoose.model(collectionNames.CART, cartSchema);
module.exports = { cartModel, cartSchema };
