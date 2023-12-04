const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  tag: {
    type: String,
  },
  description: {
    type: String,
  },
  checked: {
    type: Boolean,
  },
});

const Banner = mongoose.models.Banner || mongoose.model("Banner", bannerSchema);
module.exports = Banner;
