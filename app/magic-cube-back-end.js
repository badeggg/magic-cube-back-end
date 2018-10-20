const express = require('express');
const app = express();
const port = 8083;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res)=>{
  res.send('Hello there.\n     -- from magic-cube-back-end\n');
});

app.use(require('./routes'));

app.listen(port, ()=>{
  console.log(`magic-cube-back-end listening on port ${port}`);
});
