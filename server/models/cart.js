const db = require('../db/pg.js');

module.exports = {
  get: () => {
   return db.query('SELECT * FROM sdc.cart;')
  }
}