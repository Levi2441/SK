import axios from "axios";

const getAllProducts = () => {
  return axios.get("http://localhost:3001/api/products");
};

const getAllIngredients = () => {
  return axios.get("http://localhost:3001/api/ingredients");
};

const addProduct = (new_product) => {
  return axios.post("http://localhost:3001/api/suggestions", new_product);
};

export default {
  getAllProducts: getAllProducts,
  getAllIngredients: getAllIngredients,
  addProduct: addProduct,
};
