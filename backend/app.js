const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({}));

// Use the PORT environment variable provided by Render, defaulting to 8080 if not set
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server connected to database and running on port ${PORT}`);
});

app.use(routes);
