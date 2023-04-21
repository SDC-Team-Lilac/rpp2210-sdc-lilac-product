const { Pool } = require('pg');

console.log('POOL!')
const pool = new Pool ({
  user: 'christian',
  host: 'localhost',
  database: 'sdc',
  password: '123mystery',
  port: 5432
})

pool.connect()
.then((client) => {
  return client.query('CREATE SCHEMA IF NOT EXISTS SDC')
})
.then((res) => {console.log('Schema created succesfully')})
.catch((err) => {console.log(err)})
.finally(()=> {pool.release()})
