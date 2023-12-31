/*
 *File containing schema and model of collection that stores user suggestions
 */
const mongoose = require("mongoose");

require("dotenv").config();

const connection = mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const sug_schema = new mongoose.Schema({
  name: String,
  brand: String,
});
sug_schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const sug_model = mongoose.model("Suggestion", sug_schema);

module.exports = sug_model;

// const new_sug = sug_model({
//   name: "Test Name",
//   brand: "Test Brand",
// });

// new_sug.save().then((res) => {
//   console.log("sug saved");
//   mongoose.connection.close();
// });
