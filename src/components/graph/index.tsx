'use client';

import { EXPIRES_IN_12HR } from '@/config';
import useFetchWithCache from '@/hooks/use-fetch-with-cache';
import React, { useState } from 'react';
import { Spinner } from '../spinner';
import { ResponsiveLine } from '@nivo/line';
import { linearGradientDef } from '@nivo/core';
import style from './graph.module.css';
import { formatNumber } from '@/utils/numbers';

interface LineChartProps {
  symbol: string;
}

const LineChart = ({ symbol }: LineChartProps) => {
  const [duration, setDuration] = useState('ALL');
  const { data, loading, error } = useFetchWithCache(
    `/api/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${symbol}`,
    `GROWW_STONKS_TIME_SERIES_WEEKLY_${symbol}`,
    EXPIRES_IN_12HR
  );

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error?.message}</div>;
  }

  const weeklyData = data.data['Weekly Adjusted Time Series'];

  const timeSeriesClose = Object.keys(weeklyData)
    .reverse()
    .map((key) => {
      return {
        x: key,
        y: weeklyData[key]['4. close'],
      };
    });

  let isUp = false;
  if (timeSeriesClose.length > 2) {
    isUp =
      Number(timeSeriesClose.at(0)?.y) <= Number(timeSeriesClose.at(-1)?.y);
  }

  return (
    <>
      <section
        style={{
          height: 400,
        }}
      >
        <ResponsiveLine
          // margin={{ top: 0, right: 0, bottom: 20, left: 0 }}
          animate={true}
          enableSlices="x"
          enableArea={true}
          curve="monotoneX"
          data={[
            {
              id: symbol,
              data: timeSeriesClose,
            },
          ]}
          enableGridY={false}
          enableGridX={false}
          enablePoints={false}
          colors={[isUp ? 'var(--color-up)' : 'var(--color-down)']}
          yScale={{
            type: 'linear',
          }}
          axisBottom={null}
          axisLeft={null}
          defs={[
            linearGradientDef('gradient', [
              {
                offset: 0,
                color: isUp ? 'var(--color-up)' : 'var(--color-down)',
              },
              {
                offset: 100,
                color: isUp ? 'var(--color-up)' : 'var(--color-down)',
                opacity: 0,
              },
            ]),
          ]}
          fill={[{ match: '*', id: 'gradient' }]}
          sliceTooltip={({ slice }) => {
            return (
              <div
                style={{
                  background: 'white',
                  padding: '8px 12px',
                  borderRadius: '0.3rem',
                  border: '1px solid var(--neutral-100)',
                  boxShadow: 'var(--shadow)',
                }}
              >
                {slice.points.map((point) => (
                  <div
                    key={point.id}
                    style={{
                      padding: '2px 0',
                    }}
                  >
                    <h6 className={style.tooltipSm}>
                      USD ${point.data.yFormatted}
                    </h6>
                    <p className={style.tooltipSm}>
                      {new Date(point.data.xFormatted).toLocaleDateString(
                        'en-us',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }
                      )}
                    </p>
                    <p className={style.tooltipSm}>
                      Volume:{' '}
                      {formatNumber(
                        weeklyData[point.data.xFormatted]['6. volume']
                      )}
                    </p>
                  </div>
                ))}
              </div>
            );
          }}
        />
      </section>
      <div className={style.pillContainer}>
        {['ALL', '1D', '1W', '1M', '3M', '6M', '1Y', '3Y'].map((value) => {
          return (
            <button
              onClick={() => setDuration(value)}
              className={`${style.pillBtn} ${
                duration === value ? style.pillActive : null
              }`}
              key={value}
            >
              {value}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default LineChart;
