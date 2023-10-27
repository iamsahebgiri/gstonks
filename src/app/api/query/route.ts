import { type NextRequest } from 'next/server';

import top from './top.json';
import timeSeries from './time-series.json';
import detail from './detail.json';
import global from './global.json';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  console.log(searchParams);

  const type = searchParams.get('function');

  switch (type) {
    // /query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=RCRTW&apikey=undefined
    case 'TIME_SERIES_WEEKLY_ADJUSTED':
      return Response.json({ data: timeSeries });
    // /query?function=OVERVIEW&symbol=RCRTW&apikey=undefined
    case 'OVERVIEW':
      return Response.json({
        data: detail,
      });
    //?function=TOP_GAINERS_LOSERS&apikey=undefined
    case 'TOP_GAINERS_LOSERS':
      return Response.json({
        data: top,
      });
    case 'GLOBAL_QUOTE':
      return Response.json({
        data: global,
      });
  }
  // const res = await fetch('', {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   //   'API-Key': process.env.DATA_API_KEY,
  //   },
  // });
  // const data = await res.json();

  return Response.json({ data: top });
}
