import { useEffect, useState } from "react";

const ApiHook = (url) => {
  const [loading, setLoading] = useState(true);
  const [data, setAPiResponse] = useState([]);
  const [error, setError] = useState();
  useEffect(() => {
    const fetchApiCall = async () => {
      try {
        let response = await fetch(url);
        if (!response.ok) {
          setError("api error");
        } else {
          let jsonParsedRes = await response.json();
          setAPiResponse(jsonParsedRes);
          setError(null);
        }
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchApiCall();
  }, []);
  return { data, loading, error };
};
export default ApiHook;
