/* First we have to check all the ingredients
 * of the products are found in the ingredients db
 */

/*
First we set up the server and GET routes
*/
const express = require("express");
const app = express();
const cors = require("cors"); //only necessary until backend and frontend run on the same port

app.use(express.static("dist")); //to check ./dist file for frontend
app.use(cors()); //to allow response from different origin
app.use(express.json()); //allow express methods for parsing json

//import models from ing and products
const Ing = require("./mongo/ing");
const Product = require("./mongo/product");

// const ingredients = Ing.find({}).then((res) => {
//   console.log(res);
//   console.log("success");
// });
// const products = Product.find({}).then((res) => {
//   console.log(res);
//   console.log("success");
// });

/*
 * Routes
 */

app.get("/", (request, response) => {
  response.status(200).send("<p>Server Up</p>");
});

app.get("/api/ingredients", (request, response) => {
  Ing.find({})
    .then((res) => {
      //console.log("success");
      response.status(200).json(res);
    })
    .catch(() => {
      console.log("error");
    });
});

app.get("/api/products", (request, response) => {
  Product.find({})
    .then((res) => {
      //console.log("success");
      response.status(200).json(res);
    })
    .catch(() => {
      console.log("error");
    });
});

/**
 * Listen for requests
 */

const PORT = process.env.PORT;

// console.log('Environment:', process.env.NODE_ENV);
// console.log('Port:', PORT);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  //console.log("test");
});
