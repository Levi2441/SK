import Score from "./Score";
/**
 * Returns a list of up to 3 bad ingredients that make the product potentially harmful
 */
function bad_ingredients(ingredients, product) {}

function product_weight(num_of_ingredients) {
  return 1 / (1 + Math.exp(0.2 * -(num_of_ingredients - 25)));
}
/**
 * Returns weight provided by sigmoid function given an ingredient_score
 */
function ingredient_weight(ingredient_score) {
  return (1 / (1 + Math.exp(-(ingredient_score - 5)))) * 2;
}
/**
 * given a list of values, returns the weighted score
 */
function weighted_score(values) {
  let total = 0;
  for (let i = 0; i < values.length; i++) {
    total += values[i] * ingredient_weight(values[i]);
  }
  return Math.floor(total / values.length);
}
/**
 * Takes a list of ingredients and returns a list of their scores -- given ingredients dictionary
 */
function return_scores(dict, ings) {
  let res = [];
  for (let i = 0; i < ings.length; i++) {
    let curr_ing = ings[i].toLowerCase();
    if (curr_ing in dict) {
      let ing_score = dict[curr_ing];
      res.push(ing_score);
    }
  }
  return res;
}
/**
 * Takes in a product, and returns its weighted score --
 * weight depends on number of elements -- the more elements, the more you rely on the overall_score
 *
 */
function return_weighted_scores(dict, product) {
  let product_ingredients = product.ingredients;
  let ewg_score = product.rating;
  let scores = return_scores(dict, product_ingredients);
  let weights = product_weight(product_ingredients.length);

  return (1 - weights) * weighted_score(scores) + weights * ewg_score;
}
/**
 * Takes in a list of products, and returns their average weighted scores
 */
/**
 * Creates suggestions given a product
 */
function create_suggestion(product, products) {
  if (product.rating > 3) {
    let safe_list = products.filter((elt) => {
      return elt.rating < 3 && elt.category === product.category;
    });
    let safe_index = Math.floor(Math.random() * (safe_list.length - 1));
    // console.log(safe_list);
    // console.log(safe_index);
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

  //just taking the average
  let overall_score = Math.floor(
    info.reduce((accum, elt) => {
      return accum + (return_weighted_scores(ing, elt) + 1);
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

  //console.log(ingredients);
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
