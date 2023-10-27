import Details from '@/components/details';
import React from 'react';

const StockPage = ({ params }: { params: { ticker: string } }) => {
  return (
    <div className="container">
      <Details symbol={params.ticker} />
    </div>
  );
};

export default StockPage;
