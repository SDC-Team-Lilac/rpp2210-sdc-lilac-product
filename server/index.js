require('newrelic');
const express = require('express');
const app = express();
const port = 8080;
const host = '0.0.0.0'
const routes = require('./routes.js')


app.get("/loaderio-d7707dbf4e02fc611d07cf18e6a94ff9", (req, res) => {
  res.send('loaderio-d7707dbf4e02fc611d07cf18e6a94ff9')
})

app.use("/", routes);

app.listen(port, host, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;