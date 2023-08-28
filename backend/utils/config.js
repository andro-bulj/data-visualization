require("dotenv").config();

const PORT = process.env.PORT;
const password = process.env.ATLAS_PASS;
const user = process.env.ATLAS_USER;
const dbname =
  process.env.NODE_ENV === "test" ? "transactions-api-test" : "transactions-api";
console.log(process.env.NODE_ENV);
console.log(dbname);
const DB_URI = `mongodb+srv://${user}:${password}@fitraprojekt.ldltkoi.mongodb.net/${dbname}?retryWrites=true&w=majority`;

module.exports = { PORT, DB_URI };
