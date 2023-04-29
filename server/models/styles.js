const db = require('../db/pg.js');

module.exports = {
  get: (product_id) => {

    return db.query(`
    SELECT
  sdc.product_styles.product_id,
  JSON_AGG(
    JSON_BUILD_OBJECT(
      'style_id', sdc.product_styles.style_id,
      'name', sdc.product_styles.style_name,
      'original_price', sdc.product_styles.original_price,
      'sale_price', sdc.product_styles.sale_price,
      'default?', sdc.product_styles.style_default,
      'photos', (
        SELECT JSON_AGG(
          JSON_BUILD_OBJECT(
            'thumbnail_url', thumbnail_url,
            'url', url
          )
        )
        FROM sdc.photos
        WHERE sdc.photos.style_id = sdc.product_styles.style_id
      ),
      'skus', (
        SELECT JSON_OBJECT_AGG(sku_id, JSON_BUILD_OBJECT(
          'quantity', quantity, 'size', size
          ))
          FROM sdc.sku
          WHERE sdc.sku.style_id = sdc.product_styles.style_id
      )
    )
  ) AS results
  FROM sdc.product_styles
  WHERE sdc.product_styles.product_id = $1
  GROUP BY sdc.product_styles.product_id;
    `, [product_id])

  }
}
