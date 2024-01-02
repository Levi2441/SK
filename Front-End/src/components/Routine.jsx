import { useState, useEffect } from "react";
import Category from "./Category";
import Output from "./Output";

/**
 * Checks if product name is in products
 */
function check_name(name, products) {
  let res = products.filter((elt) => {
    if (elt.name === name) {
      return true;
    } else {
      return false;
    }
  });
  if (res.length === 0) {
    return false;
  } else {
    return true;
  }
}
/**
 * Checks if inputted product names are valid
 */
function products_are_valid(p1, p2, p3, products) {
  let res1 = check_name(p1, products);
  let res2 = check_name(p2, products);
  let res3 = check_name(p3, products);
  if (((res1 === res2) === res3) === true) {
    return true;
  } else {
    return false;
  }
}
/**
 * Parse information from props products into categories -> data structures
 */

function parse(products) {
  return {
    c: products.filter((elt) => {
      return elt.category === "Cleanser";
    }),
    t: products.filter((elt) => {
      return elt.category === "Toner";
    }),
    s: products.filter((elt) => {
      return elt.category === "Serum";
    }),
  };
}

/**
 * This component contains the state for the cleanser, toner, and serum inputs
 */
//props should contain two arrays of objects
const Routine = (props) => {
  const input_ing = props.ingredients;
  //const input_products = props.products;
  const split = parse(props.products);

  /**
   * Note when you press submit we need the data from cleanserBox, tonerBox, and serumBox, so we need access to their data in this file
   */
  /**
   * States for Cleanser
   */
  const [cleanserBox, setCleanserBox] = useState("");
  const [tonerBox, setTonerBox] = useState("");
  const [serumBox, setSerumBox] = useState("");
  //const [cleanserList, setCleanserList] = useState(split.c);
  /**
   * Each category will have a box to input the name
   * As the user inputs letters into the box, it shows which products could be it
   */

  /**
   * reset determine whether to display solution or not
   * if state is in submit, then do not run alg
   * if state is in reset, then run alg and display info
   */
  const [reset, setReset] = useState("submit");
  const resetHandler = () => {
    if (reset === "submit") {
      //have to check if the name's are valid
      if (
        products_are_valid(cleanserBox, tonerBox, serumBox, props.products) ===
        true
      ) {
        setReset("reset");
      } else {
        alert("Check that the name matches what is in the database");
      }
    } else {
      setReset("submit");
      setCleanserBox("");
      setTonerBox("");
      setSerumBox("");
    }
  };

  return (
    <div>
      <Category
        category="Cleanser"
        box={cleanserBox}
        setBox={setCleanserBox}
        list={split.c}
      ></Category>
      <Category
        category="Toner"
        box={tonerBox}
        setBox={setTonerBox}
        list={split.t}
      ></Category>
      <Category
        category="Serum"
        box={serumBox}
        setBox={setSerumBox}
        list={split.s}
      ></Category>
      <button onClick={resetHandler}>{reset}</button>
      <Output
        result={reset}
        cleanser={cleanserBox}
        toner={tonerBox}
        serum={serumBox}
        ingredients={props.ingredients}
        products={props.products}
      ></Output>
    </div>
  );
};

export default Routine;
