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
    expect(response.body[0]).toHaveProperty('id')
    expect(response.body[0]).toHaveProperty('name')

  })
})


// //router.get('/products/:product_id', controllers.product.getOne);
// describe('GET /products/:product_id', () => {
//   test('succesfully return a 200 response', async() => {
//     const response = await request(baseURL).get("/products/1");
//     expect(response.statusCode).toBe(200);
//   })
//   test('return the data in the expected format', () => {
//     expect(sum(1,2)).toBe(3);
//   })
// })
// //router.get('/products/:product_id/styles', controllers.styles.get);
// describe('GET /products/:product_id/styles', () => {
//   test('succesfully return a 200 response', async() => {
//     const response = await request(baseURL).get("/products/12/styles");
//     expect(response.statusCode).toBe(200);
//   })
//   test('return the data in the expected format', () => {
//     expect(sum(1,2)).toBe(3);
//   })
// })

// //router.get('/products/:product_id/related', controllers.related.get);
// describe('GET /products/:product_id/related', () => {
//   test('succesfully return a 200 response', async() => {
//     const response = await request(baseURL).get("/products/4/related");
//     expect(response.statusCode).toBe(200);
//   })
//   test('return the data in the expected format', () => {
//     expect(sum(1,2)).toBe(3);
//   })
// })

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
