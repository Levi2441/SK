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
    <div>
      {" "}
      <h1> {cat} </h1>
      <input value={data} onChange={handleData} />
      <ul>
        {displayList.map((elt) => {
          return <li key={elt.id}>{elt.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default Category;
