import React from 'react';
import style from './stock-price.module.css';
import { Icon } from '@iconify/react';
import caretUp24Filled from '@iconify/icons-fluent/caret-up-24-filled';
import caretDown24Filled from '@iconify/icons-fluent/caret-down-24-filled';

interface StockPriceProps {
  price: number;
  change_percentage: number;
  change_amount: number;
}

const StockPrice = ({
  price,
  change_percentage,
  change_amount,
}: StockPriceProps) => {
  const isUp = change_amount >= 0;
  return (
    <div>
      <h2 className={style.price} title="Price">
        ${price}
      </h2>

      <p
        className={isUp ? style.positiveChange : style.negativeChange}
        title="Change"
      >
        <Icon
          icon={isUp ? caretUp24Filled : caretDown24Filled}
          height={18}
          width={18}
        />
        {change_amount} ({change_percentage})
      </p>
    </div>
  );
};

export default StockPrice;
