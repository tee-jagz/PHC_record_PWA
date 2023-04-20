const sql = require('mssql');
const config = require('./secret.js');

const pool = new sql.ConnectionPool(config);

const connect = () => {
  return new Promise((resolve, reject) => {
    pool.connect((err) => {
      if (err) {
        console.error('Error connecting to the database:', err);
        reject(err);
      } else {
        console.log('Connected to Azure SQL Database');
        resolve(pool);
      }
    });
  });
};

module.exports = {
  connect,
  sql,
};
