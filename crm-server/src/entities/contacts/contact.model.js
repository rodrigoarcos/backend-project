
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
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
    mobile: Number,
    firstname: {
      type: String,
      required: true,
      trim: true, // cuts extra spaces in name
      maxlength: 50,
    },
    lastname: {
      type: String,
      required: true,
      trim: true, // cuts extra spaces in name
      maxlength: 50,
    },
    birthdate: Date,
    email: String,
  },
  { timestamps: true }
);

contactSchema.virtual("name").get(function () {
  return this.firstname + " " + this.lastname;
});

const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact;