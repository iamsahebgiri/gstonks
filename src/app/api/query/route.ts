import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  searchParams.set('apikey', process.env.ALPHA_VANTAGE_API_KEY ?? 'demo');

  // if (searchParams.has('symbol')) {
  //   searchParams.set('symbol', 'IBM');
  // }

  // if (searchParams.has('keywords')) {
  //   searchParams.set('keywords', 'tencent');
  // }

  const url = 'https://www.alphavantage.co/query?' + searchParams.toString();
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();

  return Response.json({ data });
}
