const request = require("supertest");
require('dotenv').config();
const baseURL = process.env.BASEURL

//router.get('/products', controllers.product.getAll);
describe('GET /products', () => {
  test('succesfully return a 200 response', async() => {
    const response = await request(baseURL).get("/products");
    expect(response.statusCode).toBe(200);
  })
  test('return all products with the expected properties', async() => {
    const response = await request(baseURL).get("/products");
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0]).toHaveProperty('slogan');
    expect(response.body[0]).toHaveProperty('description');
    expect(response.body[0]).toHaveProperty('category');
    expect(response.body[0]).toHaveProperty('default_price');
  })
})


//router.get('/products/:product_id', controllers.product.getOne);
describe('GET /products/:product_id', () => {
  test('succesfully return a 200 response', async() => {
    const response = await request(baseURL).get("/products/1");
    expect(response.statusCode).toBe(200);
  })
  test('return single product with the expected properties', async() => {
    const response = await request(baseURL).get("/products/1");
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0]).toHaveProperty('slogan');
    expect(response.body[0]).toHaveProperty('description');
    expect(response.body[0]).toHaveProperty('category');
    expect(response.body[0]).toHaveProperty('default_price');
    expect(response.body[0]).toHaveProperty('features');
    expect(Array.isArray(response.body[0].features)).toBe(true);
    expect(response.body[0].features[0]).toHaveProperty('feature');
    expect(response.body[0].features[0]).toHaveProperty('value');
    expect(response.body[0].features[1]).toHaveProperty('feature');
    expect(response.body[0].features[1]).toHaveProperty('value');
  })
})
// //router.get('/products/:product_id/styles', controllers.styles.get);
describe('GET /products/:product_id/styles', () => {
  test('succesfully return a 200 response', async() => {
    const response = await request(baseURL).get("/products/12/styles");
    expect(response.statusCode).toBe(200);
  })
  test('return the styles with the expected properties', async () => {
    const response = await request(baseURL).get("/products/12/styles");
    expect(response.body).toHaveProperty('product_id');
    expect(response.body).toHaveProperty('results');
    expect(Array.isArray(response.body.results)).toBe(true);
    expect(response.body.results[0]).toHaveProperty('style_id');
    expect(response.body.results[0]).toHaveProperty('name');
    expect(response.body.results[0]).toHaveProperty('original_price');
    expect(response.body.results[0]).toHaveProperty('sale_price');
    expect(response.body.results[0]).toHaveProperty('default?');
    expect(response.body.results[0]).toHaveProperty('photos');
    expect(Array.isArray(response.body.results[0].photos)).toBe(true);
    expect(response.body.results[0].photos[0]).toHaveProperty('thumbnail_url');
    expect(response.body.results[0].photos[0]).toHaveProperty('url');
    expect(typeof response.body.results[0].skus).toBe('object');
    //TODO: Add tests for SKU objects
  })
})

// //router.get('/products/:product_id/related', controllers.related.get);
describe('GET /products/:product_id/related', () => {
  test('succesfully return a 200 response', async () => {
    const response = await request(baseURL).get("/products/4/related");
    expect(response.statusCode).toBe(200);
  })
  test('return the related products with the expected properties', async () => {
    const response = await request(baseURL).get("/products/4/related");
    expect(Array.isArray(response.body)).toBe(true);
  })
})

// //router.get('/cart', controllers.cart.get);
// describe('GET /cart', () => {
//   test('succesfully return a 200 response', async() => {
//     const response = await request(baseURL).get("/cart");
//     expect(response.statusCode).toBe(200);
//   })
//   test('return the data in the expected format', () => {
//     expect(sum(1,2)).toBe(3);
//   })
// })
