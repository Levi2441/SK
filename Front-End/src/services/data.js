import axios from "axios";

const getAllProducts = () => {
  return axios.get("/api/products");
};

const getAllIngredients = () => {
  return axios.get("/api/ingredients");
};

const addProduct = (new_product) => {
  return axios.post("/api/suggestions", new_product);
};

export default {
  getAllProducts: getAllProducts,
  getAllIngredients: getAllIngredients,
  addProduct: addProduct,
};
