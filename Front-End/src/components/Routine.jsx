import { useState, useEffect } from "react";
import Category from "./Category";

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
  if (reset === "submit") {
    //nothing should happen
  } else {
    //display alg
    setReset("submit");
  }

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
    </div>
  );
};

export default Routine;
