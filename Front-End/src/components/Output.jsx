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
      if (elt.rating < 2) {
        return true;
      } else {
        return false;
      }
    });
    let safe_index = Math.floor(Math.random() * (safe_list.length - 1));
    return "A safer product is: " + safe_list[safe_index].name;
  } else {
    return "Safe Product";
  }
}
/**
 * returns all suggestions
 */
function sugs(info, products) {
  let res = [];
  let cleanser_sug = create_suggestion(info.c, products);
  let toner_sug = create_suggestion(info.t, products);
  let serum_sug = create_suggestion(info.s, products);

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
      if (elt.name === cleanser) {
        return true;
      } else {
        return false;
      }
      //   console.log(elt.name);
      //   console.log(cleanser);
      //   elt.name === cleanser;
    })[0],
    t: products.filter((elt) => {
      if (elt.name === toner) {
        return true;
      } else {
        return false;
      }
    })[0],
    s: products.filter((elt) => {
      if (elt.name === serum) {
        return true;
      } else {
        return false;
      }
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
        <p>You're overall score is {feedback.score}</p>
        <p>Here are you're suggestions:</p>
        <ul>
          {feedback.suggestions.map((elt) => {
            return <li key={elt}>{elt}</li>;
          })}
        </ul>
      </div>
    );
  } else {
    return <p>Press submit when done inputting data</p>;
  }
};

export default Output;
