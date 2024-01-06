const Instructions = () => {
  return (
    <div>
      <h1 className="MainInstructionsHeader">Instructions</h1>
      <ol className="MainInstructionsContainer">
        <li className="MainInstructionsInfo">
          1. Press the '+' or '-' icons to add a skincare product
        </li>
        <li className="MainInstructionsInfo">
          2. Enter the name of your product into the boxes
        </li>
        <li className="MainInstructionsInfo">
          3. Press submit when all names are entered
        </li>
        <li className="MainInstructionsInfo">
          4. If product is not in database, fill out the form below to request
          it to be added
        </li>
      </ol>
    </div>
  );
};

export default Instructions;
