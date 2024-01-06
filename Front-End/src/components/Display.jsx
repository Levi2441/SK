import Product from "./ProductInfo";
const Display = (props) => {
  const list = props.list;
  const setter = props.setter;
  //console.log(list);
  if (list.length > 3) {
    return (
      <p>
        Too many products found -- Enter in more characters to be more specific
      </p>
    );
  } else if (list.length === 0) {
    return (
      <p>No products found -- check spelling or submit a form to add product</p>
    );
  } else {
    return (
      <ul className="ProductInfoList">
        {list.map((elt) => {
          return <Product key={elt.id} prod={elt} setter={setter}></Product>;
        })}
      </ul>
    );
  }
};

export default Display;
