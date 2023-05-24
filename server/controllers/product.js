const models = require('../models');

module.exports = {
  getAll: (req, res) => {
    models.product.getAll(req.query)
    .then((result) => {res.status(200).send(result.rows)})
    .catch((err) => {res.status(500).send('ERROR getting all product data'); console.log(err)})
  },
  getOne: (req, res) => {
   models.product.getOne(req.params.product_id)
   .then((result) => {res.status(200).send(result.rows[0])})
   .catch((err) => {res.status(500).send('ERROR getting one product\'s data ')})
  }
}