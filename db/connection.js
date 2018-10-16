const mysql = require('mysql');
const connection = mysql.createConnection({
  host: '119.28.77.43',
  user: 'mgcb',
  password: 'shubiaoN2,',
  database: 'magic_cube',
});

module.exports = connection;
