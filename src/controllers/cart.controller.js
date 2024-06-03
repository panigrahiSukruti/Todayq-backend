const { default: mongoose, Types } = require("mongoose");
const { collectionNames } = require("../constants");
const { cartSchema, cartModel } = require("../schemas/cart.schema");

const CART_MODEL = mongoose.model(collectionNames.CART, cartSchema);

module.exports = {

  UpsertCartItemsByUser: async (req, res) => {
    try {
      let { body } = req;
      body.items = body.items.map((item) => ({
        ...item,
        offer: new Types.ObjectId(item.offer),
      }));
      console.log(body);
      let cart = await CART_MODEL.findOneAndUpdate(
        body,
        { upsert: true }
      );
      res.json({ data: true });
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getAllCards:async(req,res)=>{
    let cart=await CART_MODEL.find({

    }).populate("items.offer");
    res.json({p1:cart})
  }
};
