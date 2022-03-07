const guests = require("./guests.json");
const fs = require("fs");
const express = require("express");
const app = express();

//For handling the form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Including EJS
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Hei Maailma!");
});

app.get("/guestbook", (req, res) => {
  const table = makeTable;
  res.render("pages/guestbook", {table: table});
});

app.get("/newmessage", (req, res) => {
  res.render("pages/newmessage");
});

app.get("/ajaxmessage", (req, res) => {
  res.render("pages/ajaxmessage");
});

app.post("/addMessage", (req, res) => {
  console.log(req.body);
  const newGuestObject = {
    id: guests.length,
    username: req.body.name,
    country: req.body.country,
    date: Date(),
    message: req.body.message
  }
  guests.push(newGuestObject);

  const guestsString = JSON.stringify(guests);

  fs.writeFile("guests.json", guestsString, (err) => {
    if (err) throw err;
    console.log("Guest has been saved!");
  })

  res.send(makeTable());
})

app.listen(8000, () => {
  console.log("App is running on port 8000");
})

function makeTable() {
  const guests = require("./guests.json");
  const guestsFormat = guests.map(guest => (
    `<tr><td>${guest.id}</td><td>${guest.username}</td><td>${guest.country}</td><td>${guest.date}</td><td>${guest.message}</td></tr>`
  ))
  .reduce((prevValue, curValue) => prevValue + curValue);

  return (`<table class="table"><thead class="thead-dark"><tr><th>ID</td><th>Name</th><th>Country</th><th>Date</th><th>Message</th></tr></thead><tbody>
  ${guestsFormat}
  </tbody></table>`);
}
