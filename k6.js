import http from 'k6/http';
import { check, sleep } from 'k6';

// const generateRandomProductId = () => {

// }


export const options = {
  stages: [
    { duration: '30s', target: 100 },
    { duration: '1m', target: 100 },
    { duration: '30s', target: 0 },
  ],
};

export default function () {

  // const minProduct = 900010;
  // const maxProduct = 1000011;
  // const randomProductID = Math.floor(Math.random() * (maxProduct - minProduct + 1) + minProduct)

  const minPage = 180002;
  const maxPage = 200001;
  const randomPage = Math.floor(Math.random() * (maxPage - minPage + 1) + minPage)

  const getAllProducts = `http://127.0.0.1:3001/products/?page=${randomPage}`
  // const getOneProduct = `http://127.0.0.1:3001/products/${randomProductID}`
  // const getStyles = `http://127.0.0.1:3001/products/${randomProductID}/styles`
  // const getRelated = `http://127.0.0.1:3001/products/${randomProductID}/related`

  let response = http.get(getAllProducts);
  check(response, {
    'Recieved a 200 Response': (r) => r.status === 200,
  });
  sleep(1);
}
