const dotenv = require('dotenv');
// configraration with env. 
dotenv.config();
const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = process.env;
module.exports = {
    HOST: DB_HOST,
    PORT: DB_PORT,
    DB: DB_NAME
  };

