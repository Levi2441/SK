import { useState } from "react";
import bridge from "../services/data";

const Addition = () => {
  const [suggestionBoxProduct, setSuggestionBoxProduct] = useState("");
  const [suggestionBoxBrand, setSuggestionBoxBrand] = useState("");

  const suggestionButtonChange = (event) => {
    event.preventDefault();
    //console.log("reached");
    if (suggestionBoxProduct === "") {
      alert("Enter in product name");

      // } else if (suggestionBoxBrand === "") {
      //   alert("Enter in brand name");
    } else {
      let new_suggestion = {
        url: suggestionBoxProduct,
        //brand: suggestionBoxBrand,
      };
      // console.log(new_suggestion);
      bridge.addProduct(new_suggestion).then((res) => {
        // console.log(res);
        alert(res.data);
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
    <div className="BottomContainer">
      <p></p>
      <p className="FormInstructions">
        Form: To create a query, enter in details about name and brand of the
        product Ex. COSRX Propolis Toner
      </p>
      <form className="InputInfo">
        <input
          onChange={suggestionBoxProductChange}
          value={suggestionBoxProduct}
        />
        {/* <p></p>
        <input onChange={suggestionBoxBrandChange} value={suggestionBoxBrand} />
        <p></p> */}
        <button className="AdditionSubmit" onClick={suggestionButtonChange}>
          add
        </button>
      </form>
    </div>
  );
};

export default Addition;
