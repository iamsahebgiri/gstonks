import useFetchWithCache from '@/hooks/use-fetch-with-cache';
import Tooltip from '../tooltip';
import style from './stock.module.css';
import { Spinner } from '../spinner';
import { PropsWithChildren } from 'react';
import { CACHE_EXPIRATION } from '@/config';
import StockPrice from '../stock-price';

interface ContentTabProps extends PropsWithChildren {
  id: string;
}
export default function ContentTab({ id }: ContentTabProps) {
  const { data, loading, error } = useFetchWithCache(
    '/api/query?function=TOP_GAINERS_LOSERS',
    {},
    'GROWW_STONKS_HOME',
    CACHE_EXPIRATION
  );

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error?.message}</div>;
  }

  console.log(id);

  return (
    <div className={style.stockContainer}>
      {data &&
        data.data[id]?.map((stock) => (
          <div key={stock.ticker} className={style.stock}>
            <h4 className={style.ticker} title={stock.ticker}>
              {stock.ticker}
            </h4>
            <StockPrice
              change_amount={stock.change_amount}
              change_percentage={stock.change_percentage}
              price={stock.price}
            />
            {/* <h2 className={style.price} title="Price">
              ${stock.price}
            </h2>

            <p
              className={
                stock.change_percentage.startsWith('-')
                  ? style.negativeChange
                  : style.positiveChange
              }
              title="Change"
            >
              <Icon
                icon={
                  stock.change_percentage.startsWith('-')
                    ? caretDown24Filled
                    : caretUp24Filled
                }
                height={18}
                width={18}
              />
              {stock.change_amount} ({stock.change_percentage})
            </p> */}
            <p title="Volume">{stock.volume}</p>
          </div>
        ))}
    </div>
  );
}
