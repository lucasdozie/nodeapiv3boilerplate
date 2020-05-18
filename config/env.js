"use strict";
const dotenv = require("dotenv");

dotenv.config();

const NODE_ENV = process.env.NODE_ENV;

const DBURL = process.env.DBURL;
const PORT = process.env.PORT;
const URI = process.env.URI;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_DB = process.env.MONGO_DB;
// const HOST_NAME = process.env.HOST_NAME;
const DIGITAL_OCEAN_KEY_ID = process.env.DIGITAL_OCEAN_KEY_ID;
const DIGITAL_OCEAN_SECRET = process.env.DIGITAL_OCEAN_SECRET;
const DIGITAL_OCEAN_BUCKET = process.env.DIGITTAL_OCEAN_BUCKET;

module.exports = {
  NODE_ENV,
  DBURL,
  PORT,
  URI,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_DB,
  DIGITAL_OCEAN_KEY_ID,
  DIGITAL_OCEAN_SECRET,
  DIGITAL_OCEAN_BUCKET
};
