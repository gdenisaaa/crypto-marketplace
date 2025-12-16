import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CoinsList from "../components/CoinsList";

const Home = ({ currency }) => {
  const [search, setSearch] = useState("");
  const { pageNum } = useParams();
  const navigate = useNavigate();
  const page = Number(pageNum);

  const setPage = (newPage) => {
    navigate(`/page/${newPage}`);
  };

  return (
    <section className="text-white py-6">
      <div className="max-w-4xl mx-auto px-6 py-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Live Crypto Marketplace
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Welcome to the world's largest cryptocurrency marketplace.
        </p>

        <form className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="text"
            placeholder="Search crypto..."
            required
            className="w-full sm:w-64 px-4 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-300"
          />

          <button
            type="submit"
            className="px-6 py-2 bg-white text-emerald-800 font-semibold rounded-md hover:bg-green-100 transition"
          >
            Search
          </button>
        </form>
      </div>
      <CoinsList
        currency={currency}
        search={search}
        page={page}
        setPage={setPage}
      />
    </section>
  );
};

export default Home;
