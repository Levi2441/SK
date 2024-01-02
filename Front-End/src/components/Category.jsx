import Product from "./ProductInfo";
import Display from "./Display";
/**
 * This component handles the state of the input boxes and also the display of the filter list of products
 */
const Category = (props) => {
  const cat = props.category;

  //input box and results + event handler for box
  const data = props.box;
  const setData = props.setBox;
  //console.log(data);
  const list = props.list;

  const handleData = (event) => {
    // console.log(event.target.value);
    //change the data
    setData(event.target.value);
  };
  //results

  let displayList = list.filter((elt) => {
    return elt.name.includes(data);
  });

  //   console.log(displayList);

  return (
    <div className="InputInfo">
      {" "}
      <h1 className="CategoryHeader"> {cat} </h1>
      <input value={data} onChange={handleData} />
      <Display list={displayList}></Display>
    </div>
  );
};

export default Category;
