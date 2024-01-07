import Score from "./Score";
/**
 * Returns a list of up to 3 bad ingredients that make the product potentially harmful
 */
function bad_ingredients(ingredients, product) {}
/**
 * Creates suggestions given a product
 */
function create_suggestion(product, products) {
  if (product.rating > 3) {
    let safe_list = products.filter((elt) => {
      return elt.rating < 3 && elt.category === product.category;
    });
    let safe_index = Math.floor(Math.random() * (safe_list.length - 1));
    console.log(safe_list);
    console.log(safe_index);
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
function sugs(info, products, num) {
  let res = [];
  for (let i = 0; i < num; i++) {
    let new_sug = create_suggestion(info[i], products);
    res.push(new_sug);
  }

  return res;
}
/**
 * Function that gets the products from the products array in their object form
 */
function get_Object(inputs, products, num) {
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
  let res = [];
  for (let i = 0; i < num; i++) {
    let curr_product = products.filter((elt) => {
      return elt.name === inputs[i];
    })[0];
    res.push(curr_product);
  }
  return res;
}
/**
 * Returns and object containing the overall score of the routine and also feedback
 */
function alg(inputs, ing, products, num) {
  //console.log(cleanser);
  //console.log(products);
  //info is an array that contains the product objects themselves
  let info = get_Object(inputs, products, num);
  //First we calculate the overall score (take the average score of the three)
  //console.log(info);

  // console.log(info.length);
  // console.log(
  //   info.reduce((accum, elt) => {
  //     console.log(elt.rating);
  //     console.log(accum);
  //     return accum + elt.rating;
  //   }, 0) / info.length
  // );
  let overall_score = Math.floor(
    info.reduce((accum, elt) => {
      return accum + elt.rating;
    }, 0) / info.length
  );

  let suggestions = sugs(info, products, num);

  // console.log(overall_score);
  return {
    score: overall_score,
    suggestions: suggestions,
  };
}

/**
 * This component handles the feedback based on the state of result variable and also the input boxes
 */
const Output = (props) => {
  //num of boxes
  let number = props.num;
  //result state
  let resultState = props.result;
  //User input for cleanser, toner, and serum, all strings
  let inputs = [props.cleanser, props.toner, props.serum];

  //list of ingredients and products
  let ingredients = props.ingredients;
  let products = props.products;

  //for now, let the algorithm be simple
  if (resultState === "reset") {
    let feedback = alg(inputs, ingredients, products, number);
    //console.log(feedback.suggestions);
    return (
      <div className="Output">
        <p className="OverallScore">
          You're overall score is <Score rating={feedback.score}></Score>
        </p>
        <p className="SuggestionHeader">Here are you're suggestions:</p>
        <ul className="Suggestions">
          {feedback.suggestions.map((elt) => {
            return (
              <li key={elt} className="IndividualSuggestions">
                {elt}
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else {
    return <p className="SubmitInstructions"></p>;
  }
};

export default Output;
