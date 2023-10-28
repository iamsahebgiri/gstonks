import useFetchWithCache from '@/hooks/use-fetch-with-cache';
import style from './tabs.module.css';
import { Spinner } from '../spinner';
import { PropsWithChildren } from 'react';
import { EXPIRES_IN_12HR, MAX_RECENTLY_VIEWED_ITEMS } from '@/config';
import Link from 'next/link';
import Stock from '../stock';
import useLocalStorage from '@/hooks/use-local-storage';

interface ContentTabProps extends PropsWithChildren {
  id: string;
}
export default function ContentTab({ id }: ContentTabProps) {
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage(
    'GROWW_STONKS_RECENTLY_VIEWED',
    []
  );

  const { data, loading, error } = useFetchWithCache(
    '/api/query?function=TOP_GAINERS_LOSERS',
    'GROWW_STONKS_TOP_GAINERS_LOSERS',
    EXPIRES_IN_12HR
  );

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div className={style.stockContainer}>
      {data &&
        data.data[id]?.map((stock: any) => (
          <Link
            key={stock.ticker}
            onClick={() => {
              // Check if the product is already in the list
              const existingIndex = recentlyViewed.findIndex(
                (p: any) => p.ticker === stock.ticker
              );

              if (existingIndex !== -1) {
                // If it exists, remove it from the list
                const updatedList = [
                  stock,
                  ...recentlyViewed.slice(0, existingIndex),
                  ...recentlyViewed.slice(existingIndex + 1),
                ];
                setRecentlyViewed(
                  updatedList.slice(0, MAX_RECENTLY_VIEWED_ITEMS)
                );
              } else {
                // If it doesn't exist, add it to the front
                const updatedList = [stock, ...recentlyViewed];
                setRecentlyViewed(
                  updatedList.slice(0, MAX_RECENTLY_VIEWED_ITEMS)
                );
              }
            }}
            href={`/stocks/${stock.ticker}`}
          >
            <Stock
              ticker={stock.ticker}
              volume={stock.volume}
              changeAmount={stock.change_amount}
              changePercentage={stock.change_percentage}
              price={stock.price}
            />
          </Link>
        ))}
    </div>
  );
}
