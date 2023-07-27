// Display Ticker Details
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

const TickerResults = (props) => {
  // Loading state
  const [loading, setLoading] = useState(true);

  // Error state
  const [error, setError] = useState(false);

  // Ticker details state
  const [tickerDetails, setTickerDetails] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setTickerDetails(null);

    async function fetchStockData() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/fetchStockData",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              stock: props.stockInfo.stock,
              date: props.stockInfo.date,
            }),
          }
        );
        // console.log(response);
        if (response.status !== 200) {
          const text = await response.text();
          setError(`Error ${response.status}: ${text}`);
          return;
        }
        const data = await response.json();
        // console.log(data);
        const numberKeys = ["open", "close", "high", "low", "volume"];
        if (!data || numberKeys.some((key) => isNaN(data[key]))) {
          throw new Error("Received invalid data");
        }
        setTickerDetails(data);
      } catch (error) {
        // console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStockData();
  }, [props.stockInfo]);

  // If loading
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-emerald-400-500">Fetching Data...</h2>
      </div>
    );
  }

  // If error
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-red-500">{error}</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Ticker Details</h1>
      <div className="grid grid-cols-2 items-center justify-center gap-2 text-center border-4 border-gray-700 dark:border-gray-300 rounded-lg p-4 group hover:bg-amber-500 hover:text-black  w-4/5 md:w-1/3">
        <div className="col-span-2 text-3xl text-yellow-500 group-hover:text-black flex justify-center">
          {tickerDetails.logoData ? (
            <div
              className="p-3 logoClass"
              dangerouslySetInnerHTML={{ __html: tickerDetails.logoData }}
            />
          ) : (
            <Icon icon="ic:sharp-rocket-launch" />
          )}
        </div>
        <h3 className="text-2xl font-semibold col-span-2">
          {props.stockInfo.stock} - {props.stockInfo.date}
        </h3>
        <div className="">Name</div>
        <div className="">{tickerDetails.name}</div>
        <div className="">Open</div>
        <div className="">{tickerDetails.open}</div>
        <div className="">Close</div>
        <div className="">{tickerDetails.close}</div>
        <div className="">High</div>
        <div className="">{tickerDetails.high}</div>
        <div className="">Low</div>
        <div className="">{tickerDetails.low}</div>
        <div className="">Volume</div>
        <div className="">{tickerDetails.volume}</div>
      </div>
    </div>
  );
};

export default TickerResults;
