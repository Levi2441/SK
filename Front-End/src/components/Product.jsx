const Product = (props) => {
  const name = props.name;
  const brand = props.brand;
  const ingredients = props.ingredients;
  const rating = props.rating;

  return (
    <div>
      <p>Name : {name}</p>
      <p>Brand : {brand}</p>
      <p>Key Ingredients : {ingredients}</p>
      <p>Rating : {rating}</p>
    </div>
  );
};
