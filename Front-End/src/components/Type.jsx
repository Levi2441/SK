const Type = (props) => {
  let type_of_product = props.category;

  if (type_of_product === "Cleanser") {
    return <span className="Cleanser">Cleanser</span>;
  } else if (type_of_product === "Toner") {
    return <span className="Toner">Toner</span>;
  } else {
    return <span className="Serum">Serum</span>;
  }
};

export default Type;
