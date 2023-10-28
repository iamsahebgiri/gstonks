import React from 'react';
import style from './perfomance.module.css';
import { Icon } from '@iconify/react';
import caretUp24Filled from '@iconify/icons-fluent/caret-up-24-filled';

interface PerformanceProps {
  lowTitle: string;
  lowValue: string;
  highTitle: string;
  highValue: string;
  currentPrice: string;
}

const Performance = ({
  lowTitle,
  lowValue,
  highTitle,
  highValue,
  currentPrice,
}: PerformanceProps) => {
  const left = Math.floor(
    ((Number(currentPrice) - Number(lowValue)) /
      (Number(highValue) - Number(lowValue))) *
      100
  );

  return (
    <div className={style.performance}>
      <div className={style.leftContainer}>
        <p className={style.heading}>{lowTitle}</p>
        <p className={style.value}>{lowValue}</p>
      </div>
      <div className={style.progress}>
        <div className={style.bar} />
        <Icon
          className={style.icon}
          style={{
            left: Number.isSafeInteger(left) ? `${left}%` : '0%',
          }}
          icon={caretUp24Filled}
        />
      </div>
      <div className={style.rightContainer}>
        <p className={style.heading}>{highTitle}</p>
        <p className={style.value}>{highValue}</p>
      </div>
    </div>
  );
};

export default Performance;
