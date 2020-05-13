"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs")
const morgan = require("morgan")
const cors = require('cors')


const app = express();

app.use(cors())

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
 
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

app.use(bodyParser.json());

app.post('/', (req, res) => {
  res.json(req.body);
});

app.listen(3000, () => console.log('server started'));