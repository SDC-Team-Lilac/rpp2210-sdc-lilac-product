const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost/sdc-product');
}

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
  features: [featureSchema]
})

const featureSchema = new mongoose.Schema({
  feature: String,
  value: String
})

const productStyleSchema = new mongoose.Schema({
  id: Number,
  product_id: Number,
  results: [styleResultSchema],
  skus: [skuSchema]
})

const styleResultSchema = new mongoose.Schema({
  style_id: Number,
  name: String,
  original_price: Number,
  default?: Boolean,
  photos: [
    {thumbnail_url: String, url: String}
  ]
})

const skuSchema = new mongoose.Schema ({
  sku_id: Number,
  quantity: String,
  size: String
})

const relatedProducts = new mongoose.Schema({
  product_id: Number,
  relatedProduct_ids: [Number]
})