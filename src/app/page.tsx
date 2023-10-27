import React from 'react';
import style from '@/styles/index.module.css';
import { TopGainerLoserTab } from '@/components/tab';

const IndexPage = () => {
  return (
    <div className={`container`}>
      <div className={style.main}>
        <TopGainerLoserTab />
      </div>
    </div>
  );
};

export default IndexPage;
