const Product = (props) => {
  const prod = props.prod;

  //console.log(prod);
  return (
    <li className="ProductInfo">
      {prod.name} by {prod.brand}
    </li>
  );
};

export default Product;
