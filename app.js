const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("working properly working !!!!");
});

app.listen(3000, () => {
  console.log("App running on port 3000");
});
