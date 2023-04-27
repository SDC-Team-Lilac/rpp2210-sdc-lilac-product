const models = require('../models');

module.exports = {
  getAll: (req, res) => {
    models.product.getAll(req.query)
    .then((result) => {res.status(200).send(result)})
    .catch((err) => {res.status(500).send('ERROR getting all product data')})
  },
  getOne: (req, res) => {
    res.send('Getting one product in controllers')
  }
}