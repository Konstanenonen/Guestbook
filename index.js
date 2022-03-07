const guests = require("./guests.json");
const fs = require("fs");
const express = require("express");
const app = express();

//For handling the form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Including EJS
app.set("view engine", "ejs");

// Getting the right port dynamically
const PORT = process.env.PORT || 8000;

// Home Page
app.get("/", (req, res) => {
  res.render("pages/index.ejs");
});

// Guestbook Page
app.get("/guestbook", (req, res) => {
  const table = makeTable;
  res.render("pages/guestbook", {table: table});
});

// New Message Page
app.get("/newmessage", (req, res) => {
  res.render("pages/newmessage");
});

// New Ajax Message Page
app.get("/ajaxmessage", (req, res) => {
  res.render("pages/ajaxmessage");
});

// POST route for Ajax Message Page
app.post("/addAjaxMessage", (req, res) => {
  addNewGuest(req.body.name, req.body.country, req.body.message);
  res.send(makeTable());
})

// POST route for New Message Page
app.post("/addNewMessage", (req, res) => {
  addNewGuest(req.body.name, req.body.country, req.body.message);
  res.redirect("/guestbook");
})

//Starting the server
app.listen(PORT, () => {
  console.log("App is running on port 8000");
})

// Helper function for making the HTML-Table out of Guests JSON-data
function makeTable() {
  const guests = require("./guests.json");
  const guestsFormat = guests.map(guest => (
    `<tr><td class="tohide">${guest.id}</td><td>${guest.username}</td><td>${guest.country}</td><td class="tohide">${guest.date}</td><td>${guest.message}</td></tr>`
  ))
  .reduce((prevValue, curValue) => prevValue + curValue);

  return (`<table class="table"><thead class="thead-dark"><tr><th class="tohide">ID</td><th>Name</th><th>Country</th><th class="tohide">Date</th><th>Message</th></tr></thead><tbody>
  ${guestsFormat}
  </tbody></table>`);
}

//Helper function to add a new Guest to local variable and JSON file
function addNewGuest(username, country, message) {
  const newGuestObject = {
    id: guests.length + 1,
    username: username,
    country: country,
    date: Date(),
    message: message
  }
  guests.push(newGuestObject);

  const guestsString = JSON.stringify(guests);

  fs.writeFile("guests.json", guestsString, (err) => {
    if (err) throw err;
    console.log("Guest has been saved!");
  })
}
