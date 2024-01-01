import { useEffect, useState } from "react";

const useCurrencyInfo = (crypto, currency) => {
  const [data, setData] = useState({});
  const [debouncedCrypto, setDebouncedCrypto] = useState(crypto);
  const [debouncedCurrency, setDebouncedCurrency] = useState(currency);

  useEffect(() => {
    // Set a timeout to update debouncedCrypto after a delay
    const timeoutId = setTimeout(() => {
      setDebouncedCrypto(crypto);
    }, 1000); // Adjust the delay as needed (500 milliseconds in this example)

    // Cleanup the timeout to avoid unnecessary updates
    return () => {
      clearTimeout(timeoutId);
    };
  }, [crypto]);

  useEffect(() => {
    // Set a timeout to update debouncedCurrency after a delay
    const timeoutId = setTimeout(() => {
      setDebouncedCurrency(currency);
    }, 1000); // Adjust the delay as needed (5000 milliseconds in this example)

    // Cleanup the timeout to avoid unnecessary updates
    return () => {
      clearTimeout(timeoutId);
    };
  }, [currency]);

  useEffect(() => {
    // Perform the fetch using debouncedCrypto and debouncedCurrency
    if (debouncedCrypto && debouncedCurrency) {
      fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${debouncedCrypto}&vs_currencies=${debouncedCurrency}`
      )
        .then((res) => res.json())
        .then((res) => {
          if (
            res[debouncedCrypto] &&
            Object.keys(res[debouncedCrypto]).length > 0
          ) {
            setData(res[debouncedCrypto]);
          } else {
            console.error("Invalid data received:", res);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [debouncedCrypto, debouncedCurrency]);

  return data;
};

export default useCurrencyInfo;
