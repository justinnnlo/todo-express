// const Pool = require("pg").Pool;

const { Client } = require('pg');

module.exports = { async dbQuery(statement, ...params) {
  console.log('before client connect');
  let client = new Client({
    database: 'perntodo',
    user: 'postgres',
    password: 'password',
  });

  console.log('this is statement:', statement);
  try {
    await client.connect();
  } catch(err) {
    console.err(err);
  }

  console.log('after client connect');
  let result = await client.query(statement, params);
  await client.end();
  console.log('after we got result back');
  return result;
}};

