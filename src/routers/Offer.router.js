const express = require("express");
const { GetOffers, CreateOffer } = require("../controllers/offer.controller");
const router = express.Router();

router.get("/", GetOffers);
router.post("/", CreateOffer);

module.exports = router;
