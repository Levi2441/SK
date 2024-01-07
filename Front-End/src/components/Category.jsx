import Product from "./ProductInfo";
import Display from "./Display";
import { useState, useEffect } from "react";

/**
 * This component handles the state of the input boxes and also the display of the filter list of products
 */
const Category = (props) => {
  const cat = props.category;

  //input box and results + event handler for box

  const data = props.box;
  const setData = props.setBox;
  //console.log(data);
  const list = props.list;

  const reset = props.reset;
  const resetState = props.resetState;

  const handleData = (event) => {
    //(event.target.value);
    //change the data
    if (reset === "reset") {
      // console.log("reached");
      resetState("submit");
      setData(event.target.value);
    } else {
      setData(event.target.value);
    }
  };
  //results

  let displayList = list.filter((elt) => {
    return elt.name.includes(data);
  });

  //console.log(displayList);

  return (
    <div className="Category">
      {" "}
      <h1 className="CategoryHeader"> {cat} </h1>
      <input value={data} onChange={handleData} className="InputInfo" />
      <Display list={displayList} setter={setData}></Display>
    </div>
  );
};

export default Category;
