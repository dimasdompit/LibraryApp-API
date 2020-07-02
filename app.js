const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const connection = require("./app/helpers/mysql");
const routes = require("./app/routes/mainRoute");

// Run express function
const app = express();

// test connection
connection.connect(function (err) {
  if (err) throw err;
  console.log("Database connected!");
});

app.use(express.static("assets"));

app.use(cors());
app.use(morgan("dev"));
// Use body-parser to get data from request body
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use("/", routes);

app.listen(3000, function () {
  console.log("server running at port localhost:3000");
});
