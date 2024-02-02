const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);
  console.log("in the event-bus: ", JSON.stringify(event));
  axios.post("http://posts-clusterip-srv:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  // axios.post("http://localhost:4001/events", event).catch((err) => {
  //   console.log(err.message);
  // });
  // axios.post("http://localhost:4002/events", event).catch((err) => {
  //   console.log(err.message);
  // });
  // axios.post("http://localhost:4003/events", event).catch((err) => {
  //   console.log(err.message);
  // });

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("v49");
  console.log("Listening on port 4005");
});
