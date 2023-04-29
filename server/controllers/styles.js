const models = require('../models');

module.exports = {
  get: (req, res) => {
    models.styles.get(req.params.product_id)
    .then((result) => {res.status(200).send(result.rows)})
    .catch((err) => {res.status(500).send('ERROR getting product style data')})
  }
}