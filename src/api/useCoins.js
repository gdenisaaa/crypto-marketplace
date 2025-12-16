import { useQuery } from "@tanstack/react-query";

const useCoins = (currency, page) => {
  return useQuery({
    queryKey: ["coins", currency, page],
    queryFn: async () => {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=${page}`,
        {
          headers: {
            "x-cg-demo-api-key": import.meta.env.VITE_COINGECKO_API_KEY,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch coins");
      return res.json();
    },
  });
};

export default useCoins;
