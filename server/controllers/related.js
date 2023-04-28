const models = require('../models');

module.exports = {
  get: (req, res) => {
    models.related.get(req.params.product_id)
    .then((result) => {res.status(200).send(result.rows[0].related_ids)})
    .catch((err) => {res.status(500).send('ERROR getting related product data')})
  }
}