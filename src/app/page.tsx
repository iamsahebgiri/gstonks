import React from 'react';
import style from '@/styles/index.module.css';
import { UserProfileTab } from '@/components/tab';

const IndexPage = () => {
  return (
    <div className={`container`}>
      <div className={style.main}>
        {/* <Tabs /> */}
        <UserProfileTab />
      </div>
    </div>
  );
};

export default IndexPage;
