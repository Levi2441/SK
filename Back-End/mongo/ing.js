/*
 *File to create and save ingredient elements into database
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

const ing_schema = new mongoose.Schema({
  name: String,
  rating: Number,
});
ing_schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const Ing = mongoose.model("Ingredient", ing_schema);
console.log("got here");
//export model
module.exports = Ing;

// //add new elt to db
// const new_ing = new Ing({
//   name: "test",
//   rating: 2,
// });

// new_ing.save().then((res) => {
//   console.log("ran");
//   mongoose.connection.close();
// });
