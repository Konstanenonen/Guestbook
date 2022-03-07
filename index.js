const guests = require("./guests.json");
const fs = require("fs");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hei Maailma!");
})

app.get("/guestbook", (req, res) => {
  const guestsFormat = guests.map(guest => (
    `<tr><td>${guest.id}</td><td>${guest.username}</td><td>${guest.country}</td><td>${guest.date}</td><td>${guest.message}</td></tr>`
  ))
  .reduce((prevValue, curValue) => prevValue + curValue);

  const guestTable = `<table><thead><tr><td>ID</td><td>Name</td><td>Country</td><td>Date</td><td>Message</td></tr></thead><tbody>${guestsFormat}</tbody></table>`;

  res.send(guestTable);
})

app.use("/newmessage", express.static("./newMessage"));

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

  res.send("Lisäsit uuden vieraan!");
})

app.get("/ajaxmessage", (req, res) => {
  res.send("Ajax Message sivu");
})

app.listen(8000, () => {
  console.log("App is running on port 8000");
})

