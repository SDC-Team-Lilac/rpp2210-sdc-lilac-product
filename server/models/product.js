const db = require('../db/pg.js');

module.exports = {
  getAll: (query) => {
   const page = query.page || 1;
   const count = query.count || 5;
   const offset = (page - 1) * count;
   const params = [count, offset]
   return db.query('SELECT product_id AS id, product_name AS name, slogan, product_description AS description, sdc.category.category_name AS category, default_price FROM sdc.product JOIN sdc.category ON sdc.product.category_id = sdc.category.category_id ORDER BY product_id ASC LIMIT $1 OFFSET $2;', params)
  },
  getOne: (product_id) => {
    console.log('THIS IS THE ID', product_id)
    return db.query('SELECT sdc.product.product_id AS id, product_name AS name, slogan, product_description AS description, sdc.category.category_name AS category, default_price, feature, feature_value AS value FROM sdc.product JOIN sdc.category ON sdc.product.category_id = sdc.category.category_id JOIN sdc.product_features ON sdc.product.product_id = sdc.product_features.product_id WHERE sdc.product.product_id = $1;',[product_id])
  }
}
