import axios from "axios";

const base_url = "http://localhost:3001";

const getAllProducts = () => {
  return axios.get(base_url + "/api/products");
};

const getAllIngredients = () => {
  return axios.get(base_url + "/api/ingredients");
};

const addProduct = (new_product) => {
  return axios.post(base_url + "/api/suggestions", new_product);
};

export default {
  getAllProducts: getAllProducts,
  getAllIngredients: getAllIngredients,
  addProduct: addProduct,
};
