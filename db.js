const Pool = require("pg").Pool;
require('dotenv').config();

// const devConfig = {
//     user: process.env.PG_USER,
//     password: process.env.PG_PASSWORD,
//     host: process.env.PG_HOST,
//     port: process.env.PG_PORT,
//     database: process.env.PG_DATABASE
// }
//OR
const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`
const proConfig = {
    connectionString: process.env.DATABASE_URL, //heroku addon
    ssl: {
      rejectUnauthorized: false,
    },
  };
// const proConfig = process.env.DATABASE_URL
//it is heroku addons

const pool = new Pool ({
    connectionString :   
        process.env.NODE_ENV === "production" ? proConfig : devConfig
    //connection for production config or development config
})

module.exports = pool;