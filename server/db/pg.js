const { Pool } = require('pg');
require('dotenv').config();

console.log('process.env!', process.env)
const pool = new Pool ({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT
})

pool.connect()
.then((res) => {console.log('Schema created succesfully')})
.catch((err) => {console.log(err)})
.finally(()=> {pool.release()})
