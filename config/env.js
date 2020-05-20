"use strict";
const dotenv = require("dotenv");

dotenv.config();

const NODE_ENV = process.env.NODE_ENV;

const DBURL = process.env.DBURL;
const PORT = process.env.PORT;
const BASE_URI = process.env.BASE_URI;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_DB = process.env.MONGO_DB;
// const HOST_NAME = process.env.HOST_NAME;
const DIGITAL_OCEAN_KEY_ID = process.env.DIGITAL_OCEAN_KEY_ID;
const DIGITAL_OCEAN_SECRET = process.env.DIGITAL_OCEAN_SECRET;
const DIGITAL_OCEAN_BUCKET = process.env.DIGITTAL_OCEAN_BUCKET;
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_PASS = process.env.REDIS_PASS;


module.exports = {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASS,
  NODE_ENV,
  DBURL,
  PORT,
  BASE_URI,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_DB,
  DIGITAL_OCEAN_KEY_ID,
  DIGITAL_OCEAN_SECRET,
  DIGITAL_OCEAN_BUCKET
};
