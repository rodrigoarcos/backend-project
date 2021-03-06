const mongoose = require("mongoose");

const billingAddressSchema = new mongoose.Schema({
  billingStreet: {
    type: String,
    required: true,
    maxlength: 50,
    uppercase: true,
    trim: true,
  },
  billingCity: {
    type: String,
    required: true,
    maxlength: 25,
    uppercase: true,
    trim: true,
  },
  billingState: {
    type: String,
    required: false,
    maxlength: 15,
    uppercase: true,
    trim: true,
  },
  billingPostalCode: {
    type: Number,
    required: false,
    maxlength: 7,
  },
  billingCountry: {
    type: String,
    required: true,
    maxlength: 30,
    uppercase: true,
    trim: true,
  },
});

const shippingAddressSchema = new mongoose.Schema({
    shippingStreet: {
      type: String,
      required: true,
      maxlength: 50,
      uppercase: true,
      trim: true,
    },
    shippingCity: {
      type: String,
      required: true,
      maxlength: 25,
      uppercase: true,
      trim: true,
    },
    shippingState: {
      type: String,
      required: false,
      maxlength: 15,
      uppercase: true,
      trim: true,
    },
    shippingPostalCode: {
      type: Number,
      required: false,
      maxlength: 7,
    },
    shippingCountry: {
      type: String,
      required: true,
      maxlength: 30,
      uppercase: true,
      trim: true,
    },
  });
  

const accountSchema = new mongoose.Schema(
  {
    externalId: {
      type: String,
      required: true,
      maxlength: 15,
    },
    name: {
      type: String,
      required: true,
      trim: true, // cuts extra spaces in name
      maxlength: 50,
    },
    isPersonAccount: {
      type: Boolean,
      required: false,
      default: false,
    },
    address: billingAddressSchema,
    shippingAddress: shippingAddressSchema,
    parentId: String,
    ownerId: {
      type: String,
      required: true,
      maxlength: 15,
    },
    phone: String,
    recordTypeId: {
      type: String,
      required: true,
      maxlength: 15,
    },
    type: String,
    website: String,
  },
  { timestamps: true }
);

const Account = mongoose.model("account", accountSchema);

module.exports = Account;