const express = require('express');
const app = express();
const port = 8080;
const host = '0.0.0.0'
const routes = require('./routes.js')

app.use("/", routes);

app.listen(port, host, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;