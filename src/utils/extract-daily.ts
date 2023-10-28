import { TimeSeriesData } from './extract-intraday';

interface MetaDataDaily {
  '1. Information': string;
  '2. Symbol': string;
  '3. Last Refreshed': string;
  '4. Output Size': string;
  '5. Time Zone': string;
}

interface AlphaVantageData {
  'Meta Data': MetaDataDaily;
  'Time Series (Daily)': TimeSeriesData;
}

// query?function=TIME_SERIES_DAILY&symbol=RELIANCE.BSE&outputsize=full&apikey=demo
function extractDaily(
  data: AlphaVantageData,
  column: keyof TimeSeriesData[keyof TimeSeriesData]
) {
  const { 'Meta Data': metaData, 'Time Series (Daily)': timeSeries } = data;

  // Parse the last refreshed date
  const lastRefreshed = new Date(metaData['3. Last Refreshed']);

  // Calculate the dates for last 1 year, 3 years, and 5 years ago
  const last1Year = new Date(lastRefreshed);
  last1Year.setFullYear(last1Year.getFullYear() - 1);

  const last3Years = new Date(lastRefreshed);
  last3Years.setFullYear(last3Years.getFullYear() - 3);

  const last5Years = new Date(lastRefreshed);
  last5Years.setFullYear(last5Years.getFullYear() - 5);

  // Filter data for the desired timeframes
  const all = Object.keys(timeSeries)
    .map((timestamp) => ({
      x: timestamp,
      y: timeSeries[timestamp][column],
    }))
    .reverse();

  const last1YearData = Object.keys(timeSeries)
    .filter((timestamp) => new Date(timestamp) >= last1Year)
    .map((timestamp) => ({ x: timestamp, y: timeSeries[timestamp][column] }))
    .reverse();

  const last3YearsData = Object.keys(timeSeries)
    .filter((timestamp) => new Date(timestamp) >= last3Years)
    .map((timestamp) => ({ x: timestamp, y: timeSeries[timestamp][column] }))
    .reverse();

  const last5YearsData = Object.keys(timeSeries)
    .filter((timestamp) => new Date(timestamp) >= last5Years)
    .map((timestamp) => ({ x: timestamp, y: timeSeries[timestamp][column] }))
    .reverse();

  return {
    last1YearData,
    last3YearsData,
    last5YearsData,
    all,
  };
}

export default extractDaily;
