'use client';

import { EXPIRES_IN_24HR } from '@/config';
import useFetchWithCache from '@/hooks/use-fetch-with-cache';
import React, { useMemo, useState } from 'react';
import { Spinner } from '../spinner';
import { ResponsiveLine } from '@nivo/line';
import { linearGradientDef } from '@nivo/core';
import style from './graph.module.css';
import extractIntraday from '@/utils/extract-intraday';
import extractDaily from '@/utils/extract-daily';

interface LineChartProps {
  symbol: string;
}

const emptyData = {
  ALL: [],
  '1D': [],
  '1W': [],
  '1M': [],
  '1Y': [],
  '3Y': [],
  '5Y': [],
};

type TimeFrameType = keyof typeof emptyData;

const LineChart = ({ symbol }: LineChartProps) => {
  const [timeFrame, setTimeFrame] = useState<TimeFrameType>('1Y');
  const {
    data: dailyData,
    loading: dailyDataLoading,
    error: dailyDataError,
  } = useFetchWithCache(
    `/api/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full`,
    `GROWW_STONKS_TIME_SERIES_DAILY_${symbol}`,
    EXPIRES_IN_24HR
  );

  const {
    data: intraDayData,
    loading: intraDayDataLoading,
    error: intraDayDataError,
  } = useFetchWithCache(
    `/api/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&outputsize=full`,
    `GROWW_STONKS_TIME_SERIES_INTRADAY_${symbol}`,
    EXPIRES_IN_24HR
  );

  const data = useMemo(() => {
    if (dailyData && intraDayData) {
      const { last1YearData, last3YearsData, last5YearsData, all } =
        extractDaily(dailyData.data, '4. close');
      const { last1DayData, last1MonthData, last1WeekData } = extractIntraday(
        intraDayData.data,
        '4. close'
      );

      return {
        ALL: all,
        '1D': last1DayData,
        '1W': last1WeekData,
        '1M': last1MonthData,
        '1Y': last1YearData,
        '3Y': last3YearsData,
        '5Y': last5YearsData,
      };
    }
    return {
      ALL: [],
      '1D': [],
      '1W': [],
      '1M': [],
      '1Y': [],
      '3Y': [],
      '5Y': [],
    };
  }, [dailyData, intraDayData]);

  const minMax = useMemo(() => {
    if (dailyData && intraDayData) {
      const points = data[timeFrame];
      if (points.length === 0) {
        return null;
      }
      let minX = Number(points[0].x),
        minY = Number(points[0].y),
        maxX = Number(points[0].x),
        maxY = Number(points[0].y);

      for (const { x, y } of points) {
        minX = Math.min(minX, Number(x));
        minY = Math.min(minY, Number(y));
        maxX = Math.max(maxX, Number(x));
        maxY = Math.max(maxY, Number(y));
      }

      const offset = 10;
      minX -= offset;
      maxX += offset;
      minY -= offset;
      maxY += offset;

      return {
        minX,
        minY,
        maxX,
        maxY,
      };
    }
  }, [dailyData, intraDayData, data, timeFrame]);

  if (dailyDataLoading || intraDayDataLoading) {
    return <Spinner />;
  }

  if (dailyDataError || intraDayDataError) {
    return (
      <div>
        Error: {dailyDataError?.message} {intraDayDataError?.message}
      </div>
    );
  }

  let isUp = false;
  if (data[timeFrame].length > 2) {
    isUp =
      Number(data[timeFrame].at(0)?.y) <= Number(data[timeFrame].at(-1)?.y);
  }

  return (
    <>
      <section
        style={{
          height: 400,
        }}
      >
        <ResponsiveLine
          animate={true}
          enableSlices="x"
          enableArea={true}
          curve="monotoneX"
          data={[
            {
              id: symbol,
              data: data[timeFrame],
            },
          ]}
          enableGridY={false}
          enableGridX={false}
          enablePoints={false}
          colors={[isUp ? 'var(--color-up)' : 'var(--color-down)']}
          yScale={{
            type: 'linear',
            nice: true,
            min: minMax?.minY,
            max: minMax?.maxY,
          }}
          axisBottom={null}
          axisLeft={null}
          defs={[
            linearGradientDef('gradientA', [
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
                    {/* <p className={style.tooltipSm}>
                      Volume:{' '}
                      {formatNumber(
                        data[point.data.xFormatted]['6. volume']
                      )}
                    </p> */}
                  </div>
                ))}
              </div>
            );
          }}
        />
      </section>
      <div className={style.pillContainer}>
        {(['1D', '1W', '1M', '1Y', '3Y', '5Y', 'ALL'] as TimeFrameType[]).map(
          (value) => {
            return (
              <button
                onClick={() => setTimeFrame(value)}
                className={`${style.pillBtn} ${
                  timeFrame === value ? style.pillActive : null
                }`}
                key={value}
              >
                {value}
              </button>
            );
          }
        )}
      </div>
    </>
  );
};

export default LineChart;
