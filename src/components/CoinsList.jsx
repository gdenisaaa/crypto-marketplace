import React from "react";
import useCoins from "../api/useCoins";
import { useNavigate } from "react-router-dom";

const CoinsList = ({ currency, search, page, setPage }) => {
  const { data, isLoading, isFetching, error } = useCoins(currency, page);

  const navigate = useNavigate();

  const currencySymbols = {
    usd: "$",
    eur: "€",
    gbp: "£",
  };

  if (isLoading && !isFetching) return <p>Loading...</p>;
  if (error) return <p>Error loading coins!</p>;

  const filteredCoins =
    data?.filter((coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    ) || [];

  // need to come back here // i hard coded the page to prevent crushing
  const isLastPage = data?.length < 20 || page == 7;

  return (
    <section>
      <div className="flex justify-between items-center max-w-4xl mx-auto px-6 py-3 text-white text-lg md:text-xl mb-8 bg-gradient-to-r from-gray-900 via-emerald-900 to-emerald-800 rounded-lg shadow-md">
        <p className="w-1/12 text-left">#</p>
        <p className="w-3/12 text-left">Coins</p>
        <p className="w-2/12 text-right">Price</p>
        <p className="w-3/12 text-right">24H Change</p>
        <p className="w-3/12 text-right">Market Cap</p>
      </div>

      {search !== "" && filteredCoins.length === 0 && (
        <p className="text-center mt-6 text-gray-400">
          No coins match your search.
        </p>
      )}

      {/* coins */}
      {filteredCoins.map((coin) => (
        <div
          key={coin.id}
          className="flex justify-start max-w-4xl mx-auto px-6 py-4 text-white text-lg md:text-xl"
        >
          <p className="w-1/12 text-left">{coin.market_cap_rank}</p>

          <div
            className="w-3/12 flex items-center gap-2 text-left cursor-pointer"
            onClick={() => navigate(`/coin/${coin.id}`)}
          >
            <img src={coin.image} alt={coin.name} className="w-7 h-7" />
            <span>{coin.name}</span>
          </div>

          <p className="w-2/12 text-right">
            {currencySymbols[currency]} {coin.current_price.toLocaleString()}
          </p>

          <p
            className={`w-3/12 text-right ${
              coin.price_change_percentage_24h >= 0
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>

          <p className="w-3/12 text-right">
            {currencySymbols[currency]}
            {coin.market_cap.toLocaleString()}
          </p>
        </div>
      ))}

      {/* pagination */}
      <div className="flex justify-center gap-4 mt-8">
        {!isFetching && (
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            className="px-4 py-2 bg-emerald-700 rounded disabled:opacity-50"
            disabled={page === 1}
          >
            Previous
          </button>
        )}

        <span className="text-white font-semibold px-4 py-2 flex items-center gap-2">
          Page {page}
          {isFetching && (
            <div className="h-6 w-6 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
          )}
        </span>

        {!isFetching && (
          <button
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-emerald-700 rounded disabled:opacity-50"
            disabled={isLastPage}
          >
            Next
          </button>
        )}
      </div>
    </section>
  );
};

export default CoinsList;
