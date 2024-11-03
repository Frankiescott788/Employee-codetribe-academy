const express = require("express");
const cors = require("cors");
const routes  = require("./routes/routes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({}));
app.listen(8080, () => {
  console.log("Server connected to database and running on port 8080")
});
app.use(routes);