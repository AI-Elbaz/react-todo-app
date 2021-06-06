import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);

  useEffect( async () => {
    const res = await fetch(url);
    setData(await res.json());
  }, [url]);

  return {data};
}

export default useFetch;