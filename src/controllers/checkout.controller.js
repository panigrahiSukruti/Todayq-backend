const { default: mongoose } = require("mongoose");
const { collectionNames } = require("../constants");
const {
  CheckoutSchema,
  CheckoutSchemaModel,
} = require("../schemas/Checkout.schema");

const CHECKOUT_MODEL = mongoose.model(
  collectionNames.CHECKOUT,
  CheckoutSchemaModel
);

module.exports = {
  CreateCheckout: async (req, res) => {
    try {
      let { body } = req;
      let temp = {
        userId: "665a990dfd9d482504f3e5b0",
        items: [
          {
            offer: {
              _id: "6659f53f42f1a9f7ec58d416",
            },
            quantity: 9,
          },
        ],
        total: 100,
        address: {
          line1: "line 1",
          zipCode: "zip",
          state: "Tel",
          country: "IN",
        },
        paymentDetails: {
          cc: "3333",
          name: "Aks",
        },
      };

      await CHECKOUT_MODEL.create(temp);

      res.json({ data: true });
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
