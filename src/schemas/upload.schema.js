const mongoose = require("mongoose");
const { collectionNames } = require("../constants");

const uploadSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },

  checkout_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

const uploadModel = mongoose.model(collectionNames.UPLOAD, uploadSchema);

module.exports = {
  uploadModel,
  uploadSchema,
};
