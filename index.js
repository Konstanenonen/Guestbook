const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hei Maailma!");
})

app.get("/guestbook", (req, res) => {
  res.send("Guestbook sivu");
})

app.get("/newmessage", (req, res) => {
  res.send("New Message sivu");
})

app.get("/ajaxmessage", (req, res) => {
  res.send("Ajax Message sivu");
})

app.listen(8000, () => {
  console.log("App is running on port 8000");
})