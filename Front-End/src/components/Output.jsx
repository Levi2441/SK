/**
 * Returns a list of up to 3 bad ingredients that make the product potentially harmful
 */
function bad_ingredients(ingredients, product) {}
/**
 * Creates suggestions given a product
 */
function create_suggestion(product, products, category) {
  if (product.rating > 3) {
    let safe_list = products.filter((elt) => {
      return elt.rating < 2 && elt.category === category;
    });
    let safe_index = Math.floor(Math.random() * (safe_list.length - 1));
    return (
      "A safer, more recommended product is: " +
      safe_list[safe_index].name +
      " from " +
      safe_list[safe_index].brand
    );
  } else {
    return product.name + " is relatively safe and good to use";
  }
}
/**
 * returns all suggestions
 */
function sugs(info, products) {
  let res = [];
  let cleanser_sug = create_suggestion(info.c, products, "Cleanser");
  let toner_sug = create_suggestion(info.t, products, "Toner");
  let serum_sug = create_suggestion(info.s, products, "Serum");

  res.push(cleanser_sug);
  res.push(toner_sug);
  res.push(serum_sug);
  return res;
}
/**
 * Function that gets the products from the products array in their object form
 */
function get_Object(cleanser, toner, serum, products) {
  //   let cleanserObject = null;
  //   let tonerObject = null;
  //   let serumObject = null;
  //   if (cleanser === "N/A") {
  //     cleanserObject = null;
  //   } else {
  //     cleanserObject = products.find((elt) => {
  //       elt.name === cleanser;
  //     });
  //   }
  //   if (toner === "N/A") {
  //     tonerObject = null;
  //   } else {
  //     tonerObject = products.find((elt) => {
  //       elt.name === toner;
  //     });
  //   }
  //   if (serum === "N/A") {
  //     serumObject = null;
  //   } else {
  //     serumObject = products.find((elt) => {
  //       elt.name === serum;
  //     });
  //   }
  return {
    c: products.filter((elt) => {
      return elt.name === cleanser;
    })[0],
    t: products.filter((elt) => {
      return elt.name === toner;
    })[0],
    s: products.filter((elt) => {
      return elt.name === serum;
    })[0],
  };
}
/**
 * Returns and object containing the overall score of the routine and also feedback
 */
function alg(cleanser, toner, serum, ing, products) {
  //console.log(cleanser);
  //console.log(products);
  let info = get_Object(cleanser, toner, serum, products);
  //First we calculate the overall score (take the average score of the three)
  //console.log(info);
  let overall_score = Math.floor(
    (info.c.rating + info.t.rating + info.s.rating) / 3
  );

  let suggestions = sugs(info, products);

  return {
    score: overall_score,
    suggestions: suggestions,
  };
}

/**
 * This component handles the feedback based on the state of result variable and also the input boxes
 */
const Output = (props) => {
  //result state
  let resultState = props.result;
  //User input for cleanser, toner, and serum, could be "N/A"
  let cleanserInput = props.cleanser;
  let tonerInput = props.toner;
  let serumInput = props.serum;

  //list of ingredients and products
  let ingredients = props.ingredients;
  let products = props.products;

  //for now, let the algorithm be simple
  if (resultState === "reset") {
    let feedback = alg(
      cleanserInput,
      tonerInput,
      serumInput,
      ingredients,
      products
    );
    //console.log(feedback.suggestions);
    return (
      <div>
        <p className="OverallScore">You're overall score is {feedback.score}</p>
        <p className="SuggestionHeader">Here are you're suggestions:</p>
        <ul>
          {feedback.suggestions.map((elt) => {
            return (
              <li key={elt} className="Suggestions">
                {elt}
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else {
    return (
      <p className="SubmitInstructions">
        Press submit when done inputting data
      </p>
    );
  }
};

export default Output;
