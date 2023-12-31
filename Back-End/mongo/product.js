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
  category: String,
  ingredients: [String],
  rating: Number,
});

product_schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Product = mongoose.model("Product", product_schema);

// //export Product
// module.exports = Product;
//create new Product
const new_product = new Product({
  name: "B-Hydra Intensive Hydration Serum",
  brand: "Drunk Elephant",
  category: "Serum",
  ingredients: [
    "Water",
    "Coconut Alkanes",
    "Ammonium Acryloyldimethyltaurate",
    "Glycerin",
    "Pentylene Glycol",
    "Sclerocarya Birrea Seed Oil",
    "Wheat Amino Acids",
    "Ananas Sativus Fruit Extract",
    "Berberis Vulgaris Extract",
    "Citrullus Vulgaris Fruit Extract",
    "Lens Esculenta Fruit Extract",
    "Pyrus Malus Fruit Extract",
    "Caprate",
    "Panthenol",
    "Sodium PCA",
    "Sodium Hyaluronate Crosspolymer",
    "Dipotassium Glycyrrhizate",
    "Niacinamide",
    "Cyclodextrin",
    "Sodium Hyaluronate",
    "Sodium Lactate",
    "Phenoxyethanol",
    "Hydroxyproline",
    "Sodium Salt Ethylenediamine Disuccinate",
    "Citric Acid",
    "Caprylyl Glycol",
    "Chlorphenesin",
    "Ethylhexylglycerin",
  ],
  rating: 2,
});

new_product.save().then((res) => {
  console.log("ran");
  mongoose.connection.close();
});
