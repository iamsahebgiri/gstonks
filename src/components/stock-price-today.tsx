import useFetchWithCache from '@/hooks/use-fetch-with-cache';
import React from 'react';
import { Spinner } from './spinner';
import { EXPIRES_IN_12HR } from '@/config';
import StockPrice from './stock-price';

interface StockPriceTodayProps {
  symbol: string;
}

const StockPriceToday = ({ symbol }: StockPriceTodayProps) => {
  const { data, loading, error } = useFetchWithCache(
    `/api/query?function=GLOBAL_QUOTE&symbol=${symbol}`,
    `GROWW_STONKS_GLOBAL_QUOTE_${symbol}`,
    EXPIRES_IN_12HR
  );

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error?.message}</div>;
  }
  if (data) {
    const globalQuote = data.data['Global Quote'];
    const changeAmount = globalQuote['09. change'];
    const changePercentage = globalQuote['10. change percent'];
    const price = globalQuote['05. price'];
    return (
      <div>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        <StockPrice
          change_amount={changeAmount}
          change_percentage={changePercentage}
          price={price}
        />
      </div>
    );
  }
};

export default StockPriceToday;
