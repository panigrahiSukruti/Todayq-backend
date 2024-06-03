const express = require("express");
const router = express.Router();
const {
  getAllCards,
  UpsertCartItemsByUser,
} = require("../controllers/cart.controller");

router.get("/", getAllCards);
router.put("/", UpsertCartItemsByUser);

module.exports = router;
