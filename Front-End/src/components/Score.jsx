const Score = (props) => {
  let rating = props.rating;

  if (rating < 4) {
    return <span className="GreenRating">{rating}</span>;
  } else if (rating < 7) {
    return <span className="YellowRating">{rating}</span>;
  } else {
    return <span className="RedRating">{rating}</span>;
  }
};

export default Score;
