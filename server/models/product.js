const db = require('../db/pg.js');

module.exports = {
  getAll: (query) => {
   const page = query.page || 1;
   const count = query.count || 5;
   const offset = (page - 1) * count;
   const params = [count, offset]
   return db.query('SELECT product_id AS id, product_name AS name, slogan, product_description AS description, sdc.category.category_name AS category, default_price FROM sdc.product JOIN sdc.category ON sdc.product.category_id = sdc.category.category_id WHERE product_id > $2 ORDER BY product_id ASC LIMIT $1;', params)
  },
  getOne: (product_id) => {
    return db.query("SELECT sdc.product.product_id AS id, product_name AS name, slogan, product_description AS description, sdc.category.category_name AS category, default_price, JSON_AGG(JSON_BUILD_OBJECT('feature', feature, 'value', feature_value)) AS features FROM sdc.product JOIN sdc.category ON sdc.product.category_id = sdc.category.category_id INNER JOIN sdc.product_features USING (product_id) WHERE sdc.product.product_id = $1 GROUP BY sdc.product.product_id, sdc.category.category_id;", [product_id])
  }
}

// test query 1
// EXPLAIN ANALYZE SELECT product_id AS id, product_name AS name, slogan, product_description AS description, sdc.category.category_name AS category, default_price FROM sdc.product JOIN sdc.category ON sdc.product.category_id = sdc.category.category_id ORDER BY product_id ASC LIMIT 5 OFFSET 180002;



// test query 2
// EXPLAIN ANALYZE SELECT sdc.product.product_id AS id, product_name AS name, slogan, product_description AS description, sdc.category.category_name AS category, default_price, JSON_AGG(JSON_BUILD_OBJECT('feature', feature, 'value', feature_value)) AS features FROM sdc.product JOIN sdc.category ON sdc.product.category_id = sdc.category.category_id INNER JOIN sdc.product_features USING (product_id) WHERE sdc.product.product_id = 9981254 GROUP BY sdc.product.product_id, sdc.category.category_id;


// SELECT
//   product_id AS id,
//   product_name AS name,
//   slogan,
//   product_description AS description,
//   sdc.category.category_name AS category,
//   default_price
// FROM
//   sdc.product
// JOIN
//   sdc.category ON sdc.product.category_id = sdc.category.category_id
// WHERE
//   product_id > 4
// ORDER BY
//   product_id ASC
// LIMIT
//   5;


// SELECT
//   p.product_id AS id,
//   p.product_name AS name,
//   p.slogan,
//   p.product_description AS description,
//   c.category_name AS category,
//   p.default_price
// FROM
//   sdc.product AS p
// JOIN
//   sdc.category AS c ON p.category_id = c.category_id
// WHERE
//   p.product_id > (
//     SELECT product_id
//     FROM sdc.product
//     ORDER BY product_id ASC
//     LIMIT 1 OFFSET 180002
//   )
// ORDER BY
//   p.product_id ASC
// LIMIT
//   5;