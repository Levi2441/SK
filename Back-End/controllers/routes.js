const router = require("express").Router();
const axios = require("axios");

const Ing = require("../mongo/ing");
const Product = require("../mongo/product");
const Suggestion = require("../mongo/sug");

router.get("/", (request, response) => {
  response.status(200).send("<p>Server Up</p>");
});

router.get("/api/ingredients", (request, response) => {
  Ing.find({})
    .then((res) => {
      //console.log("success");
      response.status(200).json(res);
    })
    .catch(() => {
      console.log("error");
    });
});

router.get("/api/products", (request, response) => {
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
router.get("/api/products/:id", (request, response) => {
  Product.findById(request.params.id)
    .then((res) => {
      //console.log("success");
      response.status(200).json(res);
    })
    .catch(() => {
      console.log("error getting product");
    });
});

router.get("/api/ingredients/:id", (request, response) => {
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

router.post("/api/suggestions", (request, response) => {
  //use Sug model to create a new object
  //request.body should contain the object
  let sug_data = request.body;

  //build the new suggestion
  let query = {
    url: sug_data.url,
  };
  // let new_sug = Suggestion({
  //   name: sug_data.name,
  //   brand: sug_data.brand,
  // });

  //invoke .save() method

  // new_sug
  //   .save()
  //   .then((res) => {
  //     response.status(200).json(res);
  //   })
  //   .catch((error) => {
  //     console.log("Error adding suggestion");
  //   });
  console.log(query);
  axios
    .post("http://localhost:3002/product", query)
    .then((res) => {
      //console.log(res);
      response.status(200).send(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/api/suggestions/:id", (request, response) => {
  Suggestion.findByIdAndDelete(request.params.id).then((deletedObj) => {
    if (deletedObj) {
      response.status(200).send("<p>Successfully Deleted</p>");
    } else {
      response.status(404).send("<p>Product not found</p>");
    }
  });
});
//also set up a route to view
router.get("/api/suggestions", (request, response) => {
  Suggestion.find({}).then((res) => {
    response.status(200).json(res);
  });
});

module.exports = router;
