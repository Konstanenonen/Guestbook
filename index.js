const guests = require("./guests.json");
const express = require("express");
const app = express();

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

app.get("/newmessage", (req, res) => {
  res.send("New Message sivu");
})

app.get("/ajaxmessage", (req, res) => {
  res.send("Ajax Message sivu");
})

app.listen(8000, () => {
  console.log("App is running on port 8000");
})