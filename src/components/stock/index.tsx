import React from 'react';
import StockPrice from '../stock-price';
import style from './stock.module.css';
import { getColor } from '@/utils/colors';

interface StockProps {
  ticker: string;
  changeAmount: number;
  changePercentage: string;
  price: number;
  volume: string;
}

const Stock = ({
  ticker,
  changeAmount,
  changePercentage,
  price,
  volume,
}: StockProps) => {
  return (
    <div className={style.stock}>
      {/* <p title="Volume">{volume}</p> */}
      <div
        className={style.ticker}
        style={{
          background: getColor(ticker).text,
        }}
        title={ticker}
      >
        {ticker}
      </div>
      <StockPrice
        change_amount={changeAmount}
        change_percentage={changePercentage}
        price={price}
        sm={true}
      />
    </div>
  );
};

export default Stock;
