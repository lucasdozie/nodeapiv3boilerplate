const { MONGO_DB, MONGO_PASSWORD, MONGO_USER } = require("./env");

const mongoose = require("mongoose");

// const URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-zckfc.gcp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

// const FALLBACK_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@cluster0-shard-00-00-zckfc.gcp.mongodb.net:27017,cluster0-shard-00-01-zckfc.gcp.mongodb.net:27017,cluster0-shard-00-02-zckfc.gcp.mongodb.net:27017/${MONGO_DB}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`;
const DBURL = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@thriveaos-z7pvl.gcp.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`;

var options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  socketTimeoutMS: 0,
  keepAlive: true,
  reconnectTries: 30,
  useFindAndModify: false
};
const database = () => {
  mongoose
    .connect(DBURL, options)
    .then(res => {
      console.log("Database connected!");
    })
    .catch(err => {
      // console.log("Your URL is here:...", FALLBACK_URL);
      console.error("connection error:", err);
    });
};

module.exports = database;
