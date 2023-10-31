'use client';

import { EXPIRES_IN_12HR } from '@/config';
import useFetchWithCache from '@/hooks/use-fetch-with-cache';
import React from 'react';
import { Spinner } from '../spinner';
import style from './details.module.css';
import LineChart from '../graph';
import { formatNumber } from '@/utils/numbers';

import Performance from '../performance';
import RecentlyViewed from '../recently-viewed';
import StockPrice from '../stock-price';

interface DetailsProps {
  symbol: string;
}

const Details = ({ symbol }: DetailsProps) => {
  const { data, loading, error } = useFetchWithCache(
    `/api/query?function=OVERVIEW&symbol=${symbol}`,
    `GROWW_STONKS_OVERVIEW_${symbol}`,
    EXPIRES_IN_12HR
  );

  const {
    data: globalQuoteData,
    loading: globalQuoteLoading,
    error: globalQuoteError,
  } = useFetchWithCache(
    `/api/query?function=GLOBAL_QUOTE&symbol=${symbol}`,
    `GROWW_STONKS_GLOBAL_QUOTE_${symbol}`,
    EXPIRES_IN_12HR
  );

  if (loading || globalQuoteLoading) {
    return <Spinner />;
  }

  if (error || globalQuoteError) {
    return <div>Error: {error?.message}</div>;
  }

  const details = data.data;

  const globalQuote = globalQuoteData.data['Global Quote'];
  const changeAmount = globalQuote['09. change'];
  const changePercentage = globalQuote['10. change percent'];
  const price = globalQuote['05. price'];

  const payoutRatio =
    Math.floor((details['DividendPerShare'] / details['EPS']) * 100) / 100;

  return (
    <div className={style.detailsContainer}>
      <section className={style.topSection}>
        <div className={style.exchange}>
          {new Date(globalQuote['07. latest trading day']).toLocaleDateString(
            'en-us',
            {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }
          )}
          {' · '}
          {details['Exchange']}
          {' · '}
          {details['AssetType']}
        </div>
        <div className={style.titleContainer}>
          <h2 className={style.mainTitle}>{details['Name']}</h2>
          <p className={style.chip}>{details['Sector']}</p>
        </div>
        <StockPrice
          change_amount={changeAmount}
          change_percentage={changePercentage}
          price={price}
        />
      </section>
      <LineChart symbol={symbol} />
      <section className={style.section}>
        <h1 className={style.title}>Performance</h1>
        <Performance
          lowTitle="Today's Low"
          lowValue={formatNumber(globalQuote['04. low'], 2)}
          highTitle="Today's High"
          highValue={formatNumber(globalQuote['03. high'], 2)}
          currentPrice={globalQuote['05. price']}
        />
        <Performance
          lowTitle="52W Low"
          lowValue={formatNumber(details['52WeekLow'], 2)}
          highTitle="52W High"
          highValue={formatNumber(details['52WeekHigh'], 2)}
          currentPrice={globalQuote['05. price']}
        />
        <div className={style.divider} />
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
          <div className={style.colDivider} />
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
                {Number.isNaN(payoutRatio) || Number.isFinite(payoutRatio)
                  ? payoutRatio
                  : 'NA'}
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
          <div className={style.col}>
            <div className={style.item}>
              <span className={style.heading}>Address</span>
              <span className={style.value}>{details['Address']}</span>
            </div>
          </div>
        </div>
      </section>
      <RecentlyViewed />
    </div>
  );
};

export default Details;
