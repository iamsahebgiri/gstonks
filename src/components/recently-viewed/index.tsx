import useLocalStorage from '@/hooks/use-local-storage';
import React from 'react';
import Stock from '../stock';
import style from './../details/details.module.css';
import containerStyle from './../tab/tabs.module.css';
import Link from 'next/link';

const RecentlyViewed = () => {
  const [stocks] = useLocalStorage('GROWW_STONKS_RECENTLY_VIEWED', []);

  if (stocks && stocks.length == 0) {
    return null;
  }

  return (
    <div>
      <section className={style.section}>
        <h1 className={style.title}>Recently Viewed</h1>
        <div className={containerStyle.stockContainer}>
          {stocks.map(
            ({
              change_amount,
              change_percentage,
              price,
              ticker,
              volume,
            }: any) => (
              <Link key={ticker} href={`/stocks/${ticker}`}>
                <Stock
                  key={ticker}
                  changeAmount={change_amount}
                  changePercentage={change_percentage}
                  price={price}
                  ticker={ticker}
                  volume={volume}
                />
              </Link>
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default RecentlyViewed;
