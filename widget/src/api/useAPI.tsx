import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import {GridRowsProp} from "@mui/x-data-grid";

export const useAPI=(uri:string='')=> {
    const [data, setData] = useState<GridRowsProp>([]);
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

    return {data, error, loading};
}