import { useState } from "react";

import "./App.css";

import Navbar from "./components/Navbar";
import HomeForm from "./components/HomeForm";
import TickerResults from "./components/TickerResults";

const App = () => {
  // Dark mode setup
  const [darkMode, setDarkMode] = useState(false);

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
              name: "Repo",
              href: "https://github.com/solaris7x/essentiallyAI-react-assignment.git",
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

        <div className="py-10"></div>

        {/* Footer */}
        <footer className="flex flex-col items-center justify-center w-full h-24 border-t dark:border-gray-700">
          Created by
          <a
            className="text-emerald-500 hover:text-emerald-800"
            href="https://github.com/solaris7x"
            target="_blank"
            rel="noopener noreferrer"
          >
            Solaris7x
          </a>
        </footer>
      </div>
    </div>
  );
};

export default App;
