const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')



const app = express();

app.use(bodyParser.json());
app.use(cors())

app.post('/', (req, res) => {
  res.json(req.body);
});

app.listen(3000, () => console.log('server started'));