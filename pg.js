const { Pool } = require('pg');

console.log('POOL!')
const pool = new Pool ({
  user: 'christian',
  host: 'localhost',
  database: 'sdc',
  password: '123mystery',
  port: 5432
})

pool.query(`
  CREATE TABLE users (
    ID SERIAL PRIMARY KEY,
    name VARCHAR(30),
    email VARCHAR(30)
  );
`, (err, res) => {
  if (err) {
    console.log(err);
    pool.end()
  } else {
    console.log('Table created successfully')
    pool.end()
  }
})