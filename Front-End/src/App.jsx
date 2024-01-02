import { useState, useEffect } from "react";
//import "./App.css";
import bridge from "./services/data";
import Routine from "./components/Routine";
import Instructions from "./components/Instructions";
import Suggestion from "./components/Suggestion";

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
  const [ingredients, setIngredients] = useState([]);
  const [products, setProducts] = useState([]);

  //ingredient and product hooks
  const ingHook = () => {
    bridge.getAllIngredients().then((res) => {
      setIngredients(res.data);
    });
  };
  const productHook = () => {
    bridge.getAllProducts().then((res) => {
      setProducts(res.data);
    });
  };

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
    </>
  );
}

export default App;
