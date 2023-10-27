'use client';

import { CACHE_EXPIRATION } from '@/config';
import useFetchWithCache from '@/hooks/use-fetch-with-cache';
import React from 'react';
import { Spinner } from '../spinner';
import style from './details.module.css';
import LineChart from '../graph';
import { formatNumber } from '@/utils/numbers';
import StockPrice from '../stock-price';
import Performance from '../performance';

interface DetailsProps {
  symbol: string;
}

const Details = ({ symbol }: DetailsProps) => {
  const { data, loading, error } = useFetchWithCache(
    `/api/query?function=OVERVIEW&symbol=${symbol}`,
    {},
    `GROWW_STONKS_OVERVIEW_${symbol}`,
    CACHE_EXPIRATION
  );

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error?.message}</div>;
  }
  const details = data.data;

  return (
    <div className={style.detailsContainer}>
      <section className={style.topSection}>
        <div className={style.exchange}>{details['Exchange']}</div>
        <div className={style.titleContainer}>
          <h2 className={style.title}>{details['Name']}</h2>
          <p className={style.chip}>{details['Sector']}</p>
        </div>
        <StockPrice change_amount={10} change_percentage={10} price={20} />
      </section>
      <LineChart symbol={symbol} />
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <section className={style.section}>
        <h1 className={style.title}>Performance</h1>
        <Performance
          lowTitle="Today's Low"
          lowValue={3}
          highTitle="Today's High"
          highValue={10}
        />
        <Performance
          lowTitle="52W Low"
          lowValue={3}
          highTitle="52W High"
          highValue={10}
        />
        <div className={style.divider} />
        {/* <div className={style.perfContainer}>
          <div>
            <p className={style.heading}>52W Low</p>
            <p className={style.value}>
              ${formatNumber(details['52WeekLow'], 2)}
            </p>
          </div>
          <div className={style.perfItem}>
            <div
              style={{
                width: '100%',
                height: '6px',
                borderRadius: '3px',
                background: 'var(--color-up)',
              }}
            />
            <Icon style={{
              width: "200%",
            }} icon={caretUp24Filled} />
          </div>
          <div>
            <p className={style.heading}>52W High</p>
            <p className={style.value}>
              ${formatNumber(details['52WeekHigh'], 2)}
            </p>
          </div>
        </div> */}
      </section>

      <section className={style.section}>
        <h1 className={style.title}>Fundamentals</h1>
        <div className={style.container}>
          <div className={style.col}>
            <div className={style.stat}>
              <span className={style.heading}>Market Cap</span>
              <span className={style.value}>
                ${formatNumber(details['MarketCapitalization'], 2)}
              </span>
            </div>
            <div className={style.stat}>
              <span className={style.heading}>EBITDA</span>
              <span className={style.value}>
                ${formatNumber(details['EBITDA'], 2)}
              </span>
            </div>
            <div className={style.stat}>
              <span className={style.heading}>Revenue(TTM)</span>
              <span className={style.value}>
                ${formatNumber(details['RevenueTTM'], 2)}
              </span>
            </div>
            <div className={style.stat}>
              <span className={style.heading}>Gross Profit(TTM)</span>
              <span className={style.value}>
                ${formatNumber(details['GrossProfitTTM'], 2)}
              </span>
            </div>
            <div className={style.stat}>
              <span className={style.heading}>ROE(TTM)</span>
              <span className={style.value}>
                {details['ReturnOnEquityTTM']}
              </span>
            </div>
            <div className={style.stat}>
              <span className={style.heading}>Book value</span>
              <span className={style.value}>{details['BookValue']}</span>
            </div>
            <div className={style.stat}>
              <span className={style.heading}>Profit Margin</span>
              <span className={style.value}>{details['ProfitMargin']}</span>
            </div>
          </div>
          <div className={style.col}>
            <div className={style.stat}>
              <span className={style.heading}>Dividend Yield</span>
              <span className={style.value}>
                {details['DividendYield'] * 100}%
              </span>
            </div>
            <div className={style.stat}>
              <span className={style.heading}>P/B Ratio</span>
              <span className={style.value}>{details['PriceToBookRatio']}</span>
            </div>
            <div className={style.stat}>
              <span className={style.heading}>P/E Ratio</span>
              <span className={style.value}>{details['PERatio']}</span>
            </div>
            <div className={style.stat}>
              <span className={style.heading}>PEG Ratio</span>
              <span className={style.value}>{details['PEGRatio']}</span>
            </div>
            <div className={style.stat}>
              <span className={style.heading}>EPS</span>
              <span className={style.value}>{details['EPS']}</span>
            </div>
            <div className={style.stat}>
              <span className={style.heading}>DPS</span>
              <span className={style.value}>{details['DividendPerShare']}</span>
            </div>
            <div className={style.stat}>
              <span className={style.heading}>Payout Ratio</span>
              <span className={style.value}>
                {Math.floor(
                  (details['DividendPerShare'] / details['EPS']) * 100
                ) / 100}
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className={style.section}>
        <h1 className={style.title}>About the company</h1>
        <p className={style.p}>{details['Description']}</p>
        <div className={style.container}>
          <div className={style.col}>
            <div className={style.item}>
              <span className={style.heading}>Industry</span>
              <span className={style.value}>{details['Industry']}</span>
            </div>
          </div>
          {/* <div className={style.col}>
            <div className={style.item}>
              <span className={style.heading}>Type</span>
              <span className={style.value}>{details['AssetType']}</span>
            </div>
          </div> */}
          <div className={style.col}>
            <div className={style.item}>
              <span className={style.heading}>Address</span>
              <span className={style.value}>{details['Address']}</span>
            </div>
          </div>
        </div>
      </section>
      <section className={style.section}>
        <h1 className={style.title}>Recently Viewed</h1>
      </section>
    </div>
  );
};

export default Details;
