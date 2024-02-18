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
  //console.log(query);
  axios
    .post("http://localhost:3002/product", query)
    .then((res) => {
      //either the all the informatoin or an object with name set to "No Objects found"
      let product = res.data;

      //first check that the query result is valid
      if (product.name == "No Products Found") {
        response.status(200).send("No Products Found");
      } else {
        //have to check if its not already in the database
        //check by name -- deal with brand later?
        // console.log(product.product_name);
        Product.findOne({ name: product.product_name }).then(function (item) {
          //checks for item in databse
          if (item != null) {
            response.status(200).send("Item already in Database");
          } else {
            //after run a check on all the items -- ingredients should be safe
            /**
             * product_name should be there
             * product_brand does not have to be there
             * product_category also does not have to be there
             * overall_score also does not have to be there
             * we have to account for these errors
             * the only thing that necessary to our calculations is score (brand and category can be none)
             */
            //console.log(product);

            if (product.overall_score > -1 && product.brand != "") {
              //ship it off to the databse

              //handle brand and category
              let product_brand = "";
              let product_category = "";

              if (product.product_brand != "") {
                product_brand = product.product_brand;
              }
              if (product.product_category != "") {
                product_category = product.product_category;
              }

              let product_object = Product({
                ingredients: product.product_ingredients,
                name: product.product_name,
                rating: product.overall_score,
                brand: product_brand,
                category: product_category,
              });

              product_object
                .save()
                .then((res) => {
                  response.status(200).json(res);
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              //Key bits of information were not found
              response
                .status(200)
                .send("Key bits of information were not found");
            }
          }
        });
      }
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
