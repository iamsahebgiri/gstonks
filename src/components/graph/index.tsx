'use client';

import { CACHE_EXPIRATION } from '@/config';
import useFetchWithCache from '@/hooks/use-fetch-with-cache';
import React from 'react';
import { Spinner } from '../spinner';
import { Line } from '@nivo/line';
import { linearGradientDef } from '@nivo/core';
import ReactApexChart from 'react-apexcharts';
import style from './graph.module.css';
import { formatNumber } from '@/utils/numbers';

interface LineChartProps {
  symbol: string;
}

const LineChart = ({ symbol }: LineChartProps) => {
  const { data, loading, error } = useFetchWithCache(
    `/api/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${symbol}`,
    {},
    `GROWW_STONKS_TIME_SERIES_WEEKLY_${symbol}`,
    CACHE_EXPIRATION
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
    .map((key, index) => {
      return {
        x: key,
        y: weeklyData[key]['4. close'],
      };
    });

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Line
        width={1024}
        height={400}
        margin={{ top: 0, right: 0, bottom: 20, left: 0 }}
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
        colors={['var(--color-down)']}
        yScale={{
          type: 'linear',
        }}
        axisBottom={null}
        axisLeft={null}
        defs={[
          linearGradientDef('gradientA', [
            { offset: 0, color: 'var(--color-down)' },
            { offset: 100, color: 'var(--color-down)', opacity: 0 },
          ]),
        ]}
        fill={[{ match: '*', id: 'gradientA' }]}
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
              {/* <strong>{point.serieId}</strong> [{point.data.yFormatted}] */}
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
      <div className={style.pillContainer}>
        {['1D', '1W', '1M', '3M', '6M', '1Y', '3Y'].map((value) => {
          return (
            <button className={style.pillBtn} key={value}>
              {value}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LineChart;
