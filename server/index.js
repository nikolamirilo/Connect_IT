const express = require("express");
const bodyParser = require("body-parser");
const geolib = require("geolib"); // To calculate distance

const app = express();
app.use(bodyParser.json());

let users = []; // This should be a database in a real app

app.post("/update-location", (req, res) => {
  const { id, latitude, longitude } = req.body;
  users = users.filter((user) => user.id !== id);
  users.push({ id, latitude, longitude });
  res.sendStatus(200);
});

app.post("/nearby-users", (req, res) => {
  const { latitude, longitude, radius } = req.body;
  const nearbyUsers = users.filter((user) =>
    geolib.isPointWithinRadius(
      { latitude: user.latitude, longitude: user.longitude },
      { latitude, longitude },
      radius
    )
  );
  res.json({ users: nearbyUsers });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
