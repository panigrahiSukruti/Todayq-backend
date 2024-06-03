const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContentOfferingSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageToDisplay: { type: String },
  regions: { type: String, enum: ['USA', 'DUBAI', 'INDIA'], default: 'USA' },
  views: { type: Number, default: 0 },
  kpRating: { type: Number, default: 0.0 },
  pressReleaseLink: { type: String },
  listedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  listedDate: { type: Date, default: Date.now },
  category: {
    type: String,
    enum: [
      'Content Distribution', 'Ads', 'Youtube Influencer', 'Telegram Influencer',
      'Instagram Influencer', 'Twitter Influencer', 'ICO Listing', 'Exchange Listing'
    ],
    default: 'Content Distribution'
  }
});

const ContentOffering = mongoose.model('ContentOffering', ContentOfferingSchema);

module.exports = ContentOffering;
