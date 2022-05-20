const dotenv = require('dotenv');
// configraration with env. 
dotenv.config();
const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = process.env;

// module.exports = {
//     HOST: "localhost",
//     PORT: 27017,
//     DB: "db_dwifajarbagus_betest"
//   };
module.exports = {
    HOST: DB_HOST,
    PORT: DB_PORT,
    DB: DB_NAME
  };

