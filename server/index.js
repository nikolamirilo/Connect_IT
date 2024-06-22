const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const allRoutes = require("./routes/index.routes");
const { client } = require("./lib/database.config");
const app = express();

(async () => {
  try {
    await client.connect();
    console.log('Connected to the database');

    app.use(bodyParser.json());
    app.use(cors());
    app.use("/", allRoutes);

    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
})();
