const { default: mongoose } = require("mongoose");
const { collectionNames } = require("../constants");
const { OfferSchemaModel } = require("../schemas/Offer.schema");
const HTTP_STATUS_CODE = require("http-status");
const OFFER_MODEL = mongoose.model(collectionNames.OFFERS, OfferSchemaModel);

async function GetOffers(req, res) {
  try {
    let { query } = req;
    console.log("query: ", query);
    let aggregationPipeline = [];
    let matchQuery = {};

    if (query.name) {
      matchQuery.name = { $regex: req.query.name, $options: "i" };
    }

    if (req.query.priceMin || req.query.priceMax) {
      matchStage.price = {};
      if (query.priceMin) {
        matchQuery.price.$gte = parseInt(req.query.priceMin);
      }

      if (req.query.priceMax) {
        matchQuery.price.$lte = parseInt(req.query.priceMax);
      }

      if (Object.keys(matchQuery).length > 0) {
        aggregationPipeline.push({ $match: matchQuery });
      }
    }

    // Sorting stage
    let sortStage = {};
    if (req.query.price) {
      sortStage.price = parseInt(req.query.price);
    }
    if (req.query.date) {
      sortStage.createdAt = parseInt(req.query.date);
    }
    console.log("sortStage: ", sortStage);

    if (Object.keys(sortStage).length > 0) {
      aggregationPipeline.push({ $sort: sortStage });
    }

    console.log("aggregationPipeline: ", aggregationPipeline);
    let offers = await OFFER_MODEL.aggregate(aggregationPipeline);
    res.json({ data: offers });
  } catch (error) {
    throw new Error(error.message);
  }
}

async function CreateOffer(req, res) {
  try {
    const body = req.body;
    const newOffer = await OFFER_MODEL.create({ ...body });
    res.json({ data: newOffer });
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  GetOffers,
  CreateOffer,
};
