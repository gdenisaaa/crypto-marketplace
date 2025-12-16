import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Coin from "./pages/Coin";
import { useState } from "react";
import Footer from "./components/Footer";

function App() {
  const [currency, setCurrency] = useState("usd");

  return (
    <div className="min-h-screen flex flex-col text-white bg-gradient-to-b from-gray-900 via-gray-800 to-emerald-900">
      <Navbar currency={currency} setCurrency={setCurrency} />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Navigate to="/page/1" replace />} />
          <Route path="/page/:pageNum" element={<Home currency={currency} />} />
          <Route path="/coin/:coinId" element={<Coin currency={currency} />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
