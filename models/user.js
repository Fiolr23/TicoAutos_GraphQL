const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    cedula: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
      trim: true,
    },
    twoFactorCode: {
      type: String,
      default: null,
    },
    twoFactorCodeExpires: {
      type: Date,
      default: null,
    },
    accountStatus: {
      type: String,
      enum: ["Pendiente", "Activa"],
      default: "Activa",
      trim: true,
    },
    emailVerificationToken: {
      type: String,
      default: null,
    },
    emailVerificationExpiresAt: {
      type: Date,
      default: null,
    },
    emailVerifiedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
