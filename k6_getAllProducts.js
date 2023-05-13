import http from 'k6/http';
import { check, sleep } from 'k6';

// const generateRandomProductId = () => {

// }
const apiEndpoint = 'http://127.0.0.1:3001/products/'
export const options = {
  stages: [
    { duration: '30s', target: 100 },
    { duration: '1m', target: 100 },
    { duration: '30s', target: 0 },
  ],
};

export default function () {
  let response = http.get(apiEndpoint);
  check(response, {
    'Recieved a 200 Response': (r) => r.status === 200,
  });
  sleep(1);
}
