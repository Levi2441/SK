const app = require("./app");

/**
 * Listen for requests
 */

const PORT = process.env.PORT;

// console.log('Environment:', process.env.NODE_ENV);
// console.log('Port:', PORT);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  //console.log("test");
});
