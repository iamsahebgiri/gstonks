import { useEffect, useState } from 'react';

const useFetchWithCache = (
  apiUrl: string,
  config = {},
  cacheKey: string,
  expiration: number
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const setDataAndCache = (newData: any) => {
      setData(newData);
      localStorage.setItem(cacheKey, JSON.stringify(newData));
      localStorage.setItem(
        `${cacheKey}_expiry`,
        (Date.now() + expiration).toString()
      );
    };

    const controller = new AbortController();
    const cachedData = JSON.parse(localStorage.getItem(cacheKey) || 'null');
    const cacheExpiry = parseInt(
      localStorage.getItem(`${cacheKey}_expiry`) || '0',
      10
    );

    if (cachedData && cacheExpiry && Date.now() < cacheExpiry) {
      console.log('Sending from cache');
      setData(cachedData);
      setLoading(false);
    } else {
      console.log('Making fresh API Call');
      fetch(apiUrl, {
        ...config,
        signal: controller.signal,
      })
        .then((response) => response.json())
        .then((newData) => {
          setDataAndCache(newData);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUrl, cacheKey, expiration]);

  return { data, loading, error };
};

export default useFetchWithCache;
