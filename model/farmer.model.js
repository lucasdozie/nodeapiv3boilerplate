"use strict";

/***********************
 * Module dependencies *
 ***********************/
let mongoose = require("mongoose");

/********************************************
 *     MONGOOSE MODEL CONFIGURATION     *
 *******************************************/
const farmerSchema = new mongoose.Schema(
  {
    ta_number: {
      type: String,
      required: true, //TA-000000002-02
      unique: true
    },
    first_name: {
      type: String
      //required: true
    },
    middle_name: {
      type: String
      // required: true
    },
    middle_name: { type: String },
    last_name: {
      type: String
      // required: true
    },
    email: {
      type: String,
      //  required: true,
      // unique: true,
      trim: true,
      lowercase: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    gender: {
      type: String
      // required: true
    },
    age: {
      type: String
    },
    state: {
      type: String
    },
    lga: {
      type: String
    },
    village: String,
    // type: String,
    district: {
      type: String
    },
    phone_number: {
      type: String
      // unique: true
    },

    //LEAD FARMER ID
    lead_farmer_id: String,

    //STATUS
    status: { type: String, enum: ["active", "inactive"], default: "active" },

    // BANK INFO
    bank_name: { type: String },
    bank_account_name: { type: String },
    bank_account_number: { type: String },
    bank_code: { type: String },
    bvn: { type: String },

    assesementFinalScore: String,

    phone_number_owner: {
      type: String,
      enum: ["owner", "relative"],
      default: "owner"
    },

    // GROUP INFORMATION
    group_id: { type: String }, //groupID should be unique id generated when a lead farmer is created
    group_name: { type: String },
    group_number: { type: String },
    group_level: { type: String },

    // STATUS
    role: {
      type: String,
      enum: ["lead_farmer", "farmer", "secretary"],
      default: "farmer"
    },
    avatar_url: {
      type: String,
      default: "null"
    },

    // BANK/FINANCIAL SIGNED UNDER
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    updated_at: { type: Date, default: Date.now },
    deleted_at: Date
  },
  {
    usePushEach: true
  }
);

farmerSchema.index({ phone_number: 1, type: -1 });
/******************
 * Export schema  *
 ******************/
module.exports = mongoose.model("Farmer", farmerSchema);