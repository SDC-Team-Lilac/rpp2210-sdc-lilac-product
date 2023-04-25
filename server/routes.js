const express = require("express");
const router = express.Router();
var controller = require('./controllers');



router.get('/products', (req, res) => {
  res.send('Accessing /products')
})

router.get('/products/:product_id', (req, res) => {
  res.send('Accessing /products with ID')
})

router.get('/products/:product_id/styles', (req, res) => {
  res.send('Accessing /product styles')
})

router.get('/products/:product_id/related', (req, res) => {
  res.send('Accessing /product related')
})

router.get('/cart', (req, res) => {
  res.send('getting  /cart')
})


router.post('/cart', (req, res) => {
  res.send('posting /cart')
})

module.exports = router;