import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState("");

  useEffect(() => {
    setLoading("Loading...");
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong");
      })
      .then((responseJson) => {
        setProducts(responseJson);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => setLoading("Done."));
  }, [url]);

  return { products, error, loading };
};
