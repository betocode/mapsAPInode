require("dotenv").config();

module.exports = {
  username: process.env.DATABASE_PROD_USER,
  password: process.env.DATABASE_PROD_PW,
  database: process.env.DATABASE_PROD_DBNAME,
  host: process.env.DATABASE_PROD_HOST,
  dialect: "mysql",
};
