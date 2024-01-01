import { useState, useEffect } from "react";

const Category = (props) => {
  const cat = props.category;

  //input box and results + event handler for box
  const data = props.box;
  const setData = props.setBox;
  const list = props.list;

  const handleData = (event) => {
    // console.log(event.target.value);
    //change the data
    setData(event.target.value);
  };
  //results

  let displayList = list.filter((elt) => {
    return elt.name.includes(data);
  });
  //   console.log(displayList);

  return (
    <div>
      {" "}
      <h1> {cat} </h1>
      <input onChange={handleData}></input>
      <ul>
        {displayList.map((elt) => {
          return <li key={elt.id}>{elt.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default Category;
