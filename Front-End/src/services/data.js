import axios from "axios";

const getAllProducts = () => {
  return axios.get("http://localhost:3001/api/products");
};

const getAllIngredients = () => {
  return axios.get("http://localhost:3001/api/ingredients");
};

export default {
  getAllProducts: getAllProducts,
  getAllIngredients: getAllIngredients,
};
