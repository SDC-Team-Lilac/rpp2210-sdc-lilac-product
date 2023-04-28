const db = require('../db/pg.js');

module.exports = {
  get: (product_id) => {
    return db.query('SELECT ARRAY_AGG(related_product_id) as related_ids FROM sdc.related_products WHERE product_id=$1;',[product_id])
  }
}