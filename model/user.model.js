"use strict";

/***********************
 * Module dependencies *
 ***********************/
const mongoose = require("mongoose"),
//  jwt = require("jsonwebtoken");

/********************************************
 *     MONGOOSE MODEL CONFIGURATION     *
 *******************************************/
const agentSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    phone_number: {
      type: String,
      // required: true,
      unique: true
    }, //indexed and unique
    email: {
      type: String,
      required: true,
      //unique: true,
      trim: true,
      lowercase: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    bank: String,
    bank_code: String,
    gender: { type: String, enum: ["male", "female"] },

    //STATE, LGA OF AGENT
    state: String,
    lga: String,

    avatar_url: {
      type: String,
      default: null
    },

    farmers: [Object],

    password_hash: String,
    verifyToken: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,

    created_at: {
      type: Date,
      default: Date.now
    },
    updated_at: Date,
    deleted_at: Date
  },
  {
    usePushEach: true
  }
);

// agentSchema.virtual("password").set(function(val) {
//   this.password_hash = w.HashPassword(val);
//   this.siloId = val;
// });

// agentSchema.index({ phone_number: 1, type: -1 });

// agentSchema.methods.generateAuthToken = function() {
//   const token = jwt.sign(
//     {
//       phone_number: this.phone_number,
//       _id: this._id
//     },
//     process.env.PRIVATE_JWT_SECRET
//   );
//   console.log({ tokenHere: token, JWT: process.env.PRIVATE_JWT_SECRET });
//   return token;
// };

/******************
 * Export schema  *
 ******************/
module.exports = mongoose.model("User", agentSchema);
