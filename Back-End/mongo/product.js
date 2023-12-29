/*
 *File to create and save product elements into database
 */
const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGODB_URI;
//console.log(uri);

// mongoose.set("strictQuery", false);
const connection = mongoose
  .connect(uri)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

/*
 * Ingredient is just id, name, and rating
 */

const product_schema = new mongoose.Schema({
  name: String,
  brand: String,
  ingredients: [String],
});

product_schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Product = mongoose.model("Product", product_schema);

//export Product
module.exports = Product;
//create new Product
// const new_product = new Product({
//   name: "Hydrating Facial Cleanser",
//   brand: "CeraVe",
//   ingredients: [
//     "Water",
//     "Glycerin",
//     "Cetearyl Alcohol",
//     "PEG-40 Stearate",
//     "Stearyl Alcohol",
//     "Potassium Phosphate",
//     "Ceramide NP",
//     "Ceramide AP",
//     "Ceramide EOP",
//     "Carbomer",
//     "Glyceryl Monostearate",
//     "Behentrimonium Methosulfate",
//     "Sodium Lauroyl Lactylate",
//     "Sodium Hyaluronate",
//     "Cholesterol",
//     "Phenoxyethanol",
//     "Disodium Edta",
//     "Dipotassium Phosphate",
//     "Tocopherol",
//     "Phytosphingosine",
//     "Xanthan Gum",
//     "Cetyl Alcohol",
//     "Polysorbate 20",
//     "Ethylhexylgycerin",
//   ],
// });

// new_product.save().then((res) => {
//   console.log("ran");
//   mongoose.connection.close();
// });
