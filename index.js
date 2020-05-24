"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs")
const jwt = require("jsonwebtoken")
const path = require("path")
const morgan = require("morgan")
require('dotenv').config()

const cors = require('cors')
const database = require("./config/database")

let { useBearerToken } = require("./helpers/auth")
const app = express();

const router = express.Router();
//const route = app.route()

app.use(cors())

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
 
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
database()


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Accept");
  res.header("Content-Type", "application/json");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  } else {
    next();
  }
});

//Note I'm using bearer token
app.use(useBearerToken)

router.get('/', function (req, res, next) {
  res.status(200).json({
    "statusCode": 200,
    "message": "Welcome to Thrive Bank Api"
  })
  next();
});
app.use(router);
require("./routes")(router)

app.post('/', (req, res) => {
  res.json(req.body);
});

app.listen(3000, () => console.log('server started'));