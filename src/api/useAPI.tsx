import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
export const useAPI = (uri: string = "") => {
  const [data, setData] = useState<Array<object | number[] | string[]>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(uri);
        setData(response.data?.data || []);
      } catch (e: AxiosError | unknown) {
        if (e instanceof AxiosError) setError(e.message);
        else setError("Request failed from server.");
      } finally {
        setLoading(false);
      }
    })();
  }, [uri]);

  return { data, error, loading };
};
