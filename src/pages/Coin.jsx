import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const Coin = ({ currency }) => {
  const { coinId } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["coin", coinId],
    queryFn: async () => {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`
      );
      if (!res.ok) throw new Error("Failed to fetch coin data");
      return res.json();
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading coin...</p>;
  if (error) return <p className="text-center mt-10">Error loading coin!</p>;

  const price = data.market_data.current_price[currency];
  const marketCap = data.market_data.market_cap[currency];

  const currencySymbols = {
    usd: "$",
    eur: "€",
    gbp: "£",
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 text-white">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10">
        <div className="flex-1">
          <h1 className="text-5xl font-bold mb-4 text-emerald-400">
            {data.name}
          </h1>

          <p className="text-lg text-gray-300 mb-6 uppercase tracking-wide">
            Symbol:{" "}
            <span className="text-white">{data.symbol.toUpperCase()}</span>
          </p>

          <div className="space-y-4">
            <p className="text-xl">
              <span className="font-semibold text-emerald-300">
                Current Price:{" "}
              </span>
              {currencySymbols[currency]}
              {price.toLocaleString()}
            </p>

            <p className="text-xl">
              <span className="font-semibold text-emerald-300">
                Market Cap:{" "}
              </span>
              {currencySymbols[currency]}
              {marketCap.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <img
            src={data.image.large}
            alt={data.name}
            className="w-40 h-40 drop-shadow-lg"
          />
        </div>
      </div>
      <div className="mt-12 text-gray-300 leading-relaxed">
        <h2 className="text-2xl font-semibold mb-4 text-emerald-400">
          Description
        </h2>

        <p
          dangerouslySetInnerHTML={{
            __html:
              data.description.en.split(". ").slice(0, 3).join(". ") + ".",
          }}
        ></p>
      </div>
    </div>
  );
};

export default Coin;
