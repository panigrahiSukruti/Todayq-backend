const { default: mongoose, Schema } = require("mongoose");
const { collectionNames } = require("../constants");

const OfferSchemaModel = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 25,
    },
    description: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      max: 999999,
    },
  },
  {
    timestamps: true,
  }
);

const OfferModel = mongoose.model(collectionNames.OFFERS, OfferSchemaModel);

module.exports = {
  OfferModel,
  OfferSchemaModel,
};
