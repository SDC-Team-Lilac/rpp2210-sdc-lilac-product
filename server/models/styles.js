const db = require('../db/pg.js');

module.exports = {
  get: (product_id) => {
    // return db.query(`SELECT sdc.product_styles.product_id, sdc.product_styles.style_id, original_price, sale_price, style_default AS "default?", JSON_AGG(JSON_BUILD_OBJECT('thumbnail_url', thumbnail_url, 'url', url)) AS photos, JSON_OBJECT_AGG(sku_id, JSON_BUILD_OBJECT('quantity', quantity, 'size', size)) as skus FROM sdc.product_styles JOIN sdc.photos ON sdc.product_styles.style_id = sdc.photos.style_id JOIN sdc.sku ON sdc.product_styles.style_id = sdc.sku.style_id WHERE sdc.product_styles.product_id = $1 GROUP BY sdc.product_styles.product_id, sdc.product_styles.style_id;`, [product_id])

    // return db.query('SELECT sdc.product_styles.product_id, ARRAY_AGG(sdc.product_styles.style_id) FROM sdc.product_styles WHERE sdc.product_styles.product_id = 1 GROUP BY sdc.product_styles.product_id;')

    // return db.query(`SELECT sdc.product_styles.product_id, JSON_AGG(JSON_BUILD_OBJECT('thumbnail_url', thumbnail_url, 'url', url)) AS photos FROM sdc.product_styles JOIN sdc.photos ON sdc.product_styles.style_id = sdc.photos.style_id WHERE sdc.product_styles.product_id = 1 GROUP BY sdc.product_styles.product_id;`)

    // return db.query(`SELECT sdc.photos.style_id, ARRAY_AGG(JSON_BUILD_OBJECT('thumbnail_url', thumbnail_url, 'url', url)) AS photos FROM sdc.photos WHERE style_id = 1 GROUP BY sdc.photos.style_id;`)

    // return db.query(`SELECT sdc.sku.style_id, JSON_OBJECT_AGG(sku_id, JSON_BUILD_OBJECT('quantity', quantity, 'size', size)) AS skus FROM sdc.sku WHERE style_id = 1 GROUP BY sdc.sku.style_id;`)

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
  WHERE sdc.product_styles.product_id = 1
  GROUP BY sdc.product_styles.product_id;
    `)

  }
}

// SELECT sdc.product_styles.product_id, sdc.product_styles.style_id, original_price, sale_price, style_default AS "default?", JSON_AGG(JSON_BUILD_OBJECT('thumbnail_url', thumbnail_url, 'url', url)) AS photos, sku_id, quantity, size FROM sdc.product_styles JOIN sdc.photos ON sdc.product_styles.style_id = sdc.photos.style_id JOIN sdc.sku ON sdc.product_styles.style_id = sdc.sku.style_id WHERE sdc.product_styles.product_id = 1 GROUP BY sdc.product_styles.product_id, sdc.product_styles.style_id, sku_id;

// SELECT sdc.product_styles.product_id, JSON_OBJECT_AGG(sdc.product_styles.style_id, original_price, sale_price, style_default, JSON_AGG(JSON_BUILD_OBJECT('thumbnail_url', thumbnail_url, 'url', url)), JSON_OBJECT_AGG(sku_id, JSON_BUILD_OBJECT('quantity', quantity, 'size', size))) FROM sdc.product_styles JOIN sdc.photos ON sdc.product_styles.style_id = sdc.photos.style_id JOIN sdc.sku ON sdc.product_styles.style_id = sdc.sku.style_id WHERE sdc.product_styles.product_id = 1 GROUP BY sdc.product_styles.product_id;

//SELECT sdc.product_styles.product_id, ARRAY_AGG(sdc.product_styles.style_id) FROM sdc.product_styles WHERE sdc.product_styles.product_id = 1 GROUP BY sdc.product_styles.product_id;



//SELECT sdc.product_styles.product_id, JSON_AGG(JSON_BUILD_OBJECT('style_id',sdc.product_styles.style_id, 'original_price', original_price, 'sale_price', sale_price, 'default?', style_default, 'photos', JSON_AGG(JSON_BUILD_OBJECT('thumbnail_url', thumbnail_url, 'url', url)), 'skus', JSON_OBJECT_AGG(sku_id, JSON_BUILD_OBJECT('quantity', quantity, 'size', size)))) FROM sdc.product_styles JOIN sdc.photos ON sdc.product_styles.style_id = sdc.photos.style_id JOIN sdc.sku ON sdc.product_styles.style_id = sdc.sku.style_id WHERE sdc.product_styles.product_id = 1 GROUP BY sdc.product_styles.product_id, sdc.product_styles.style_id;

//1 aggregate product styles
//SELECT sdc.product_styles.product_id, JSON_OBJECT_AGG('style_id',sdc.product_styles.style_id) FROM sdc.product_styles WHERE sdc.product_styles.product_id = 1 GROUP BY sdc.product_styles.product_id;

//2 get the photos
//SELECT sdc.photos.style_id, JSON_AGG(JSON_BUILD_OBJECT('thumbnail_url', thumbnail_url, 'url', url)) AS photos FROM sdc.photos WHERE style_id = 1 GROUP BY sdc.photos.style_id;

//3 get the skus

//SELECT sdc.sku.style_id, JSON_OBJECT_AGG(sku_id, JSON_BUILD_OBJECT('quantity', quantity, 'size', size)) AS skus FROM sdc.sku WHERE style_id = 1 GROUP BY sdc.sku.style_id;






//SELECT sdc.product_styles.product_id, sdc.product_styles.style_id, original_price, sale_price, style_default AS "default?", JSON_AGG(JSON_BUILD_OBJECT('thumbnail_url', thumbnail_url, 'url', url) AS photos, JSON_OBJECT(sku_id, JSON_BUILD_OBJECT('quantity', quantity, 'size', size)) as skus FROM sdc.product_styles JOIN sdc.photos ON sdc.product_styles.style_id = sdc.photos.style_id JOIN sdc.sku ON sdc.product_styles.style_id = sdc.sku.style_id WHERE sdc.product_styles.product_id = $1 GROUP BY sdc.product_styles.product_id, sdc.product_styles.style_id;

// `
// SELECT
//   sdc.product_styles.product_id,
//   JSON_AGG(
//     JSON_BUILD_OBJECT(
//       'style_id', sdc.product_styles.style_id,
//       'name', sdc.product_styles.style_name,
//       'original_price', sdc.product_styles.original_price,
//       'sale_price', sdc.product_styles.sale_price,
//       'default?', sdc.product_styles.style_default,
//       'photos', (
//         SELECT JSON_AGG(
//           JSON_BUILD_OBJECT(
//             'thumbnail_url', thumbnail_url,
//             'url', url
//           )
//         )
//         FROM sdc.photos
//         WHERE sdc.photos.style_id = sdc.product_styles.style_id
//       ),
//       'skus', (
//         SELECT JSON_OBJECT_AGG(sku_id, JSON_BUILD_OBJECT(
//           'quantity', quantity, 'size', size
//           ))
//           FROM sdc.sku
//           WHERE sdc.sku.style_id = sdc.product_styles.style_id
//       )
//     )
//   )
//   FROM sdc.product_styles
//   WHERE sdc.product_styles.product_id = 1
//   GROUP BY sdc.product_styles.product_id;
// `
