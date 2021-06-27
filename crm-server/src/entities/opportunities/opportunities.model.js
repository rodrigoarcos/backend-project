const mongoose = require("mongoose");
const opportunitySchema = new mongoose.Schema(
  {
    externalId: {
      type: String,
      required: true,
      maxlength: 15,
    },
    accountId: {
      type: String,
      required: true,
      maxlength: 15,
    },
    ownerId: {
      type: String,
      required: true,
      maxlength: 15,
    },
    amount: Number,
    closeDate: Date,
    contactId: {
      type: String,
      required: true,
      maxlength: 15,
    },
    stageName: {
      type: String,
      required: true,
      trim: true, // cuts extra spaces in name
      maxlength: 50,
    },
    probability: Number,
    isWon: Boolean,
    leadSource: String,
  },
  { timestamps: true }
);

const Opportunity = mongoose.model("opportunity", opportunitySchema);

module.exports = Opportunity;