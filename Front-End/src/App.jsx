import { useState, useEffect } from "react";
//import "./App.css";
import bridge from "./services/data";
import Routine from "./components/Routine";
import Instructions from "./components/Instructions";
import Addition from "./components/Addition";

/**
 * check_if_valid checks if all productss' ingredients are in the database
 */
function check_if_valid(i, p) {
  //end result

  let truth = true;

  //extract ingredients
  let only_ing = i.map((elt) => {
    return elt.name;
  });

  // console.log(only_ing);

  p.forEach((elt) => {
    //ingredients for each product
    let curr_ing = elt.ingredients;
    curr_ing.forEach((indv) => {
      if (only_ing.includes(indv) === false) {
        truth = false;
        //console.log(indv);
      }
    });
  });
  // console.log(truth);
  return truth;
}

function App() {
  const [ingredients, setIngredients] = useState({});
  const [products, setProducts] = useState([]);

  //ingredient and product hooks
  const ingHook = () => {
    bridge.getAllIngredients().then((res) => {
      let ingredients = res.data;
      let dict = {};

      for (let i = 0; i < ingredients.length; i++) {
        //standardize to lower case
        let name_of_ing = ingredients[i].name.toLowerCase();
        let safety_of_ing = ingredients[i].rating;
        dict[name_of_ing] = safety_of_ing;
      }
      setIngredients(dict);
    });
  };
  const productHook = () => {
    bridge.getAllProducts().then((res) => {
      setProducts(res.data);
    });
  };

  // console.log(products);

  useEffect(ingHook, []);
  useEffect(productHook, []);

  /**
   * Rest of Code
   */
  //check_if_valid(ingredients, products);
  // console.log(ingredients);
  // console.log(products);
  return (
    <>
      <Instructions></Instructions>
      <Routine ingredients={ingredients} products={products}></Routine>
      <Addition></Addition>
    </>
  );
}

export default App;
