import { useEffect, useState } from "react";

/**
 *  @deprecated This hook is deprecated in favor of the apiService and asyncApiRequest
 */
export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong");
      })
      .then((responseJson) => {
        setData(responseJson);
      })
      .catch((e) => {
        setError(e);
      });
  }, [url]);

  return { data, error };
};
