// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(function (req, res, next) {
  const allowedOrigins = ["http://localhost:3000"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.enable("trust proxy");

app.post("/api/fetchStockData", async (req, res) => {
  // YOUR CODE GOES HERE, PLEASE DO NOT EDIT ANYTHING OUTSIDE THIS FUNCTION

  try {
    console.log(req.body);
    // Parse and validate request body
    const { stock, date } = req.body;
    if (!stock || !date) {
      return res
        .status(400)
        .send("Invalid request body, please include stock and date");
    }

    // regex to check if date is in YYYY-MM-DD format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).send("Invalid date format, please use YYYY-MM-DD");
    }
    // Check if date is valid and before today
    const today = new Date();
    const inputDate = new Date(date);
    if (inputDate >= today) {
      return res
        .status(400)
        .send("Invalid date, I can't predict the future yet!");
    }

    // regex check if stock is alphabet characters only
    const stockRegex = /^[a-zA-Z]+$/;
    if (!stockRegex.test(stock)) {
      return res
        .status(400)
        .send("Invalid stock ticker, please use only alphabet characters");
    }

    // Convert stock to uppercase
    const ticker = stock.toUpperCase();
    console.log(ticker, date);

    // My API key
    const apiKey = "zCTXIKq32nAGxSoCglU5JKAI2di9zHwW";
    // apiKey: "6lM5vxLdnwzDhWSbp3QCVDMOgwI42IoY",

    // API call
    const url =
      "https://api.polygon.io/v1/open-close/" +
      ticker +
      "/" +
      date +
      "?apiKey=" +
      apiKey;
    // const url = 'https://api.polygon.io/v1/open-close/AAPL/2023-07-25?apiKey=xxx'

    try {
      const response = await axios.get(url);

      // Check if the response is valid
      const data = response.data;
      console.log(data);

      //   res.sendStatus(200);
      return res.send({
        open: data.open,
        close: data.close,
        high: data.high,
        low: data.low,
        volume: data.volume,
      });
    } catch (err) {
      console.log(err.response.status, err.response.data);
      if (err.response.data.message) {
        return res.status(404).send(err.response.data.message);
      }
      return res.status(err.response.status).send(err.response.data);
    }
  } catch (error) {
    console.log("Something went wrong: ", error);
    return res.status(500).send("Something went wrong");
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
