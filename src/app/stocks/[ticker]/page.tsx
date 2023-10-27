import Details from '@/components/details';
import LineChart from '@/components/graph';
import React from 'react';

const StockPage = ({ params }: { params: { ticker: string } }) => {
  return (
    <div className="container">
      <Details symbol={params.ticker} />
    </div>
  );
};

export default StockPage;
