import { useState } from "react";
import bridge from "../services/data";

const Addition = () => {
  const [suggestionBoxProduct, setSuggestionBoxProduct] = useState("");
  const [suggestionBoxBrand, setSuggestionBoxBrand] = useState("");

  const suggestionButtonChange = () => {
    if (suggestionBoxProduct === "") {
      alert("Enter in product name");
    } else if (suggestionBoxBrand === "") {
      alert("Enter in brand name");
    } else {
      let new_suggestion = {
        name: suggestionBoxProduct,
        brand: suggestionBoxBrand,
      };
      bridge.addProduct(new_suggestion).then(() => {
        alert("Success!");
        setSuggestionBoxBrand("");
        setSuggestionBoxProduct("");
      });
    }
  };

  const suggestionBoxBrandChange = (event) => {
    setSuggestionBoxBrand(event.target.value);
  };
  const suggestionBoxProductChange = (event) => {
    setSuggestionBoxProduct(event.target.value);
  };

  return (
    <>
      <p></p>
      <p className="FormInstructions">
        Form: Input name of product in top box, and brand of product in bottom
        box
      </p>
      <form className="InputInfo">
        <input
          onChange={suggestionBoxProductChange}
          value={suggestionBoxProduct}
        />
        <p></p>
        <input onChange={suggestionBoxBrandChange} value={suggestionBoxBrand} />
        <p></p>
        <button className="AdditionSubmit" onClick={suggestionButtonChange}>
          add
        </button>
      </form>
    </>
  );
};

export default Addition;
