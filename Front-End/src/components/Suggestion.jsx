import { useState } from "react";
import bridge from "../services/data";

const Suggestion = () => {
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
};

export default Suggestion;
