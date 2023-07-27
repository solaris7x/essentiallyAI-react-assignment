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
    const apiKey = process.env.POLYGON_APIKEY;
    if (!apiKey) {
      return res.status(500).send("API Key not configured on backend");
    }

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
      const tickerDayResponse = await axios.get(url);

      // Check if the response is valid
      const tickerDayData = tickerDayResponse.data;
      console.log(tickerDayData);

      // Get ticker details
      const tickerDetailsResponse = await axios.get(
        `https://api.polygon.io/v3/reference/tickers/${ticker}?date=${date}&apiKey=${apiKey}`
      );

      const tickerDetails = tickerDetailsResponse.data.results;
      // console.log(tickerDetails.name);

      let logoData = null;
      // Get Logo SVG data
      if (tickerDetails?.branding?.logo_url) {
        const logoUrl = tickerDetails.branding.logo_url + `?apiKey=${apiKey}`;

        const logoResponse = await axios.get(
          tickerDetails.branding.logo_url + `?apiKey=${apiKey}`
        );
        logoData = logoResponse.data;
      }

      //   res.sendStatus(200);
      return res.send({
        name: tickerDetails.name,
        logoData,
        open: tickerDayData.open,
        close: tickerDayData.close,
        high: tickerDayData.high,
        low: tickerDayData.low,
        volume: tickerDayData.volume,
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
