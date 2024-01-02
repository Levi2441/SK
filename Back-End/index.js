/**
 * This file contains the express application used to handle HTTP requests
 *
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
const Suggestion = require("./mongo/sug");

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
 * Set up routes to get a specific product by id
 */
app.get("/api/products/:id", (request, response) => {
  Product.findById(request.params.id)
    .then((res) => {
      //console.log("success");
      response.status(200).json(res);
    })
    .catch(() => {
      console.log("error getting product");
    });
});

app.get("/api/ingredients/:id", (request, response) => {
  Ing.findById(request.params.id)
    .then((res) => {
      //console.log("success");
      response.status(200).json(res);
    })
    .catch(() => {
      console.log("error getting ingredient");
    });
});

/*
 *Set up route for adding/deleting a suggestion
 *Should just contain information about name and brand of product
 */

app.post("/api/suggestions", (request, response) => {
  //use Sug model to create a new object
  //request.body should contain the object
  let sug_data = request.body;

  //build the new suggestion
  let new_sug = Suggestion({
    name: sug_data.name,
    brand: sug_data.brand,
  });

  //invoke .save() method

  new_sug
    .save()
    .then((res) => {
      response.status(200).json(res);
    })
    .catch((error) => {
      console.log("Error adding suggestion");
    });
});

app.delete("/api/suggestions/:id", (request, response) => {
  Suggestion.findByIdAndDelete(request.params.id).then((deletedObj) => {
    if (deletedObj) {
      response.status(200).send("<p>Successfully Deleted</p>");
    } else {
      response.status(404).send("<p>Product not found</p>");
    }
  });
});
//also set up a route to view
app.get("/api/suggestions", (request, response) => {
  Suggestion.find({}).then((res) => {
    response.status(200).json(res);
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
