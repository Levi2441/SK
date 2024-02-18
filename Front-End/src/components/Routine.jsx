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
function products_are_valid(p1, p2, p3, products, number) {
  let res1 = check_name(p1, products);
  let res2 = check_name(p2, products);
  let res3 = check_name(p3, products);
  for (let i = 0; i < number; i++) {
    if (i === 0) {
      if (res1 === false) {
        return false;
      }
    } else if (i === 1) {
      if (res2 === false) {
        return false;
      }
    } else {
      if (res3 === false) {
        return false;
      }
    }
  }
  return true;
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
   * name for cleanserBox,tonerBox,and serumBox should be generalized to product1,product2,product3
   */
  const [cleanserBox, setCleanserBox] = useState("");
  const [tonerBox, setTonerBox] = useState("");
  const [serumBox, setSerumBox] = useState("");

  const [boxes, setBoxes] = useState(0);

  const [reset, setReset] = useState("submit");

  let categories = [
    <Category
      key="1"
      category="Product 1"
      box={cleanserBox}
      setBox={setCleanserBox}
      list={props.products}
      reset={reset}
      resetState={setReset}
    ></Category>,
    <Category
      key="2"
      category="Product 2"
      box={tonerBox}
      setBox={setTonerBox}
      list={props.products}
      reset={reset}
      resetState={setReset}
    ></Category>,
    <Category
      key="3"
      category="Product 3"
      box={serumBox}
      setBox={setSerumBox}
      list={props.products}
      reset={reset}
      resetState={setReset}
    ></Category>,
  ];

  const deleteHandler = () => {
    if (boxes === 0) {
      alert("Please add a product first");
    } else {
      setReset("submit");
      setBoxes(boxes - 1);

      if (boxes === 1) {
        setCleanserBox("");
      } else if (boxes === 2) {
        setTonerBox("");
      } else {
        setSerumBox("");
      }
    }
  };
  const addHandler = () => {
    if (boxes === 3) {
      alert("Already maximum number of products");
    } else {
      setBoxes(boxes + 1);
      setReset("submit");
    }
  };

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
  const resetHandler = () => {
    if (reset === "submit") {
      //have to check if the name's are valid
      if (
        products_are_valid(
          cleanserBox,
          tonerBox,
          serumBox,
          props.products,
          boxes
        ) === true &&
        boxes > 0
      ) {
        setReset("reset");
      } else {
        if (boxes === 0) {
          alert("Add Products First");
        } else {
          alert("Check that the name matches what is in the database");
        }
      }
    } else {
      setReset("submit");
      setCleanserBox("");
      setTonerBox("");
      setSerumBox("");
    }
  };

  //console.log("boxes to display");
  //console.log(boxes);
  let show_categories = [];
  for (let i = 0; i < boxes; i++) {
    show_categories.push(categories[i]);
  }
  return (
    <div>
      <div className="ADButtons">
        <button onClick={addHandler} className="AddButton">
          {" "}
          +{" "}
        </button>
        <button onClick={deleteHandler} className="DeleteButton">
          {" "}
          -{" "}
        </button>
      </div>

      <p></p>
      {show_categories.map((elt) => {
        return elt;
      })}
      <button onClick={resetHandler} className="SubmitButton">
        {reset}
      </button>
      <Output
        num={boxes}
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
