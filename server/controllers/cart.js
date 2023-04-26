const models = require('../models');

module.exports = {
  get: function(req, res) {
    models.cart.get()
    .then((results) => {res.status(200).send(results.rows); console.log(results)})
    .catch((err) => {res.status(500).send('ERROR getting cart data')})

  },
  post: function(req, res) {
    res.send('Posting cart in controllers')
  }
}