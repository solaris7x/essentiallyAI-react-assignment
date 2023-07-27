# Frontend Task Essentially AI (completed)

## Steps to run this repo

### Server

- Rename the `sample.env` file to `.env` and place your Polygon API key inside
- Install deps and start the server with `yarn start`

### Client

- The API Url is hardcoded to `http://localhost:5000`, thus this assume you run the client in `http` environment
- Install deps and start the client with `yarn start`

## Overview

The task is to build a webpage to display the trade statistics (Open, High, Low, Close, Volume) of a particular stock for a particular day. You should use Polygon free tier API for this task (https://polygon.io/)

## Individual tasks

### Server

- Implement an API route `/api/fetchStockData` in the app.js file to handle POST requests.
- Parse the incoming request to get the stock symbol and date input from the client.
- Validate the input parameters to ensure they present.
  - Date should be in YYYY-MM-DD format
  - Date is valid and not in future
  - Ticker should only contain alphabets
- Make a request to the Polygon API using the axios library, passing the stock symbol (uppercase) and date as query parameters.
- Handle the response from the Polygon API, extracting the required fields (Open, High, Low, Close, Volume) from the data.
- If the `response status` is not `200` then relay proper status to request
- Format the data into a JSON response and get additional ticker details with logo then send it back.
- Implement error handling to catch any issues during the API call or data processing, returning `500` for unexpected error responses.

### Client

- The app consist of three components `Navbar` , `HomeForm` , `TickerResults`
  - `Navbar` is for UI aesthetics
  - `HomeForm` is the user input form with HTML basic validation (no js dependencies)
  - `TickerResults` is component to show fetched Response after the form is submitted
- The `HomeForm` is responsible for updating the `stockInfo` state (managed in App.js) on submit of user form.
- Once the `stockInfo` state is set , `TickerResults` component will render sending the fetch request to backend API on initialization and set the interal state to loading
- The response can resolve in either `data` or `error` , which updates the state respectively.
- With conditional rendering the app has priority as loading > error > data , if not loading and no error then will try to render data.
- On new form submit , the useEffect hook will retrigger sending the fetch request, reset error and loading to true till response resolves

## Optional tasks

1. Imagine this is a real world scenario which thousands of users use to get the historic data of a stock for a particular day, how would this product change in order to improve the UX.
   - Implement a caching mechanism to store previously requested stock data, reducing API calls and improving response times.
2. What new features would you add in this product to increase it's utility for the end user.
   - Enhanced Data Visualization and Analysis. Provide interactive and visually appealing charts to help users analyze stock performance more effectively.
