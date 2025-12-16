import React, { useState, useEffect } from "react";
import logo from "../assets/cryptocurrencies.png";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ currency, setCurrency }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/page/1");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        isScrolled ? "bg-gray-900/30" : "bg-gray-900"
      }`}
    >
      <div className="h-16 px-4 flex items-center justify-between">
        <img
          className="h-12 w-auto object-contain cursor-pointer"
          src={logo}
          alt="logo"
          onClick={handleLogoClick}
        />
        <h2
          className={`font-mono text-2xl text-white transition-opacity duration-300 ${
            isScrolled ? "opacity-0" : "opacity-100"
          }`}
        >
          Crypto Dashboard
        </h2>
        <select
          className="bg-gray-800 text-white px-3 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="gbp">GBP</option>
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
