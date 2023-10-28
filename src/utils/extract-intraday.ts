export interface TimeSeriesData {
  [timestamp: string]: {
    '1. open': string;
    '2. high': string;
    '3. low': string;
    '4. close': string;
    '5. volume': string;
  };
}

interface MetaDataIntraDay {
  '1. Information': string;
  '2. Symbol': string;
  '3. Last Refreshed': string;
  '4. Interval': string;
  '5. Output Size': string;
  '6. Time Zone': string;
}

interface AlphaVantageData {
  'Meta Data': MetaDataIntraDay;
  'Time Series (5min)': TimeSeriesData;
}

type a = keyof MetaDataIntraDay;

// query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&outputsize=full&apikey=demo
function extractIntraday(
  data: AlphaVantageData,
  column: keyof TimeSeriesData[keyof TimeSeriesData]
) {
  const { 'Meta Data': metaData, 'Time Series (5min)': timeSeries } = data;

  // Parse the last refreshed date
  const lastRefreshed = new Date(metaData['3. Last Refreshed']);

  // Calculate the dates for last 1 day, 1 week, and 1 month ago
  const last1Day = new Date(lastRefreshed);
  last1Day.setDate(last1Day.getDate() - 1);

  const last1Week = new Date(lastRefreshed);
  last1Week.setDate(last1Week.getDate() - 7);

  const last1Month = new Date(lastRefreshed);
  last1Month.setMonth(last1Month.getMonth() - 1);

  // Filter data for the desired timeframes
  const last1DayData = Object.keys(timeSeries)
    .filter((timestamp) => new Date(timestamp) >= last1Day)
    .map((timestamp) => ({ x: timestamp, y: timeSeries[timestamp][column] }))
    .reverse();

  const last1WeekData = Object.keys(timeSeries)
    .filter((timestamp) => new Date(timestamp) >= last1Week)
    .map((timestamp) => ({ x: timestamp, y: timeSeries[timestamp][column] }))
    .reverse();

  const last1MonthData = Object.keys(timeSeries)
    .filter((timestamp) => new Date(timestamp) >= last1Month)
    .map((timestamp) => ({ x: timestamp, y: timeSeries[timestamp][column] }))
    .reverse();

  return {
    last1DayData,
    last1WeekData,
    last1MonthData,
  };
}

export default extractIntraday;
