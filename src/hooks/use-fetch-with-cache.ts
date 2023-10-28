import { useEffect, useState } from 'react';

const useFetchWithCache = (
  apiUrl: string,
  cacheKey: string,
  expiration: number
) => {
  const [data, setData] = useState<null | any>(null);
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
      console.log('[HIT]', apiUrl);
      setData(cachedData);
      setLoading(false);
      setError(null);
    } else {
      console.log('[MISS]', apiUrl);
      fetch(apiUrl, {
        signal: controller.signal,
      })
        .then((response) => response.json())
        .then((newData) => {
          setDataAndCache(newData);
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    return () => {
      controller.abort();
    };
  }, [apiUrl, cacheKey, expiration]);

  return { data, loading, error };
};

export default useFetchWithCache;
