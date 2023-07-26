import { useState } from "react";

import "./App.css";

import Navbar from "./components/Navbar";
import HomeForm from "./components/HomeForm";
import TickerResults from "./components/TickerResults";

const App = () => {
  // Dark mode setup
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // stockInfo state
  const [stockInfo, setstockInfo] = useState(null);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-white text-black dark:bg-[#212121] dark:text-white md:mt-0 relative text-xl min-h-screen">
        {/* // Navbar */}
        <Navbar
          title="Essentially AI"
          links={[
            {
              name: "Home",
              href: "/",
              icon: "ant-design:home-outlined",
            },
            {
              name: "Features",
              href: "/#features",
              icon: "bi:gear-fill",
            },
            {
              name: "Tools",
              href: "/#tools",
              icon: "carbon:tools",
            },
          ]}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <div className={stockInfo ? "pt-20" : "pt-56"}></div>

        {/* Form  */}
        <HomeForm setstockInfo={setstockInfo} />

        <div className="mt-10"></div>
        {/* Ticker Details */}
        {stockInfo && <TickerResults stockInfo={stockInfo} />}
      </div>
    </div>
  );
};

export default App;
