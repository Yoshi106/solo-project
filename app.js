const knexfile = require("./knexfile");
const knex = require("knex")(knexfile.development);

knex
  .select()
  .table("users")
  .then((rows) => {
    console.log(rows);
  });

const express = require("express");

const app = express();

app.use(express.static("./"));

app.get("/hello", (_, res) => {
  res.send("Hello");
});

app.listen(5000, () => {
  console.log("litening @ 5000");
});
