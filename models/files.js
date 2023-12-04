const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    key: {
      type: String,
    },
    location: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  { timestamps: true },
);

const File = mongoose.models.File || mongoose.model("File", fileSchema);
module.exports = File;
