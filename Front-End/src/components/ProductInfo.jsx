import Type from "./Type";
import Brand from "./Brand";

const Product = (props) => {
  const prod = props.prod;
  const setter = props.setter;

  const clickHandler = () => {
    setter(prod.name);
  };

  //console.log(prod);

  //cleanser will be blue
  //toner will be white
  //serum will be purple
  return (
    <button className="ProductInfo" onClick={clickHandler}>
      <p>{prod.name}</p>
      <Brand brand={prod.brand}></Brand>
      <Type category={prod.category}></Type>
    </button>
  );
};

export default Product;
