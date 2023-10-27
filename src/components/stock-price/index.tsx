import React from 'react';
import style from './stock-price.module.css';
import { Icon } from '@iconify/react';
import arrowUp24Filled from '@iconify/icons-fluent/arrow-up-24-filled';
import arrowDown24Filled from '@iconify/icons-fluent/arrow-down-24-filled';

interface StockPriceProps {
  price: number;
  change_percentage: string;
  change_amount: number;
  sm?: boolean;
}

const StockPrice = ({
  price,
  change_percentage,
  change_amount,
  sm,
}: StockPriceProps) => {
  const isUp = change_amount >= 0;

  return (
    <div
      className={style.container}
      style={{
        flexDirection: sm ? 'column' : 'row',
        alignItems: sm ? 'flex-start' : 'center',
        gap: sm ? '0.4rem' : '1rem',
      }}
    >
      <h2
        className={style.price}
        style={{
          fontSize: sm ? '1.5rem' : '2rem',
        }}
        title="Price"
      >
        ${price}
      </h2>
      <div className={style.stat}>
        <div
          className={style.percentageContainer}
          style={{
            background: isUp ? 'var(--bg-up-light)' : 'var(--bg-down-light)',
            color: isUp ? 'var(--color-up)' : 'var(--color-down)',
          }}
        >
          <Icon
            icon={isUp ? arrowUp24Filled : arrowDown24Filled}
            height={16}
            width={16}
          />
          <p>{change_percentage}</p>
        </div>
        {!sm ? (
          <p
            className={style.amount}
            style={{ color: isUp ? 'var(--color-up)' : 'var(--color-down)' }}
          >
            {change_amount} Today
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default StockPrice;
