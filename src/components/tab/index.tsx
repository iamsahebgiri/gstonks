'use client';

import { useEffect, useRef, useState } from 'react';
import style from './tabs.module.css';
import ContentTab from './content-tab';

const tabs = [
  { id: 'top_gainers', label: 'Top Gainers' },
  { id: 'top_losers', label: 'Top Losers' },
  { id: 'most_actively_traded', label: 'Most Actively Traded' },
];

interface TabMeta {
  width: number;
  left: number;
}

export function TopGainerLoserTab() {
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const [tabsMeta, setTabsMeta] = useState<TabMeta[]>([]);

  const [tabMeta, setTabMeta] = useState<TabMeta>();
  let [activeTab, setActiveTab] = useState(tabs[0].id);

  useEffect(() => {
    if (tabsRef.current) {
      let tabsMetadata = [];
      let prev = 0;
      for (let i = 0; i < tabsRef.current.childElementCount; i++) {
        const element = tabsRef.current.children[i] as HTMLElement;
        tabsMetadata.push({
          width: element.offsetWidth,
          left: prev,
        });
        prev += element.offsetWidth;
      }
      setTabsMeta(tabsMetadata);
      setTabMeta({
        left: 0,
        width: (tabsRef.current.children[0] as HTMLElement).offsetWidth,
      });
    }
  }, [tabsRef]);

  return (
    <>
      <h2 className={style.tabs__title}>
        {tabs.findLast((tab) => tab.id == activeTab)?.label}
      </h2>
      <div className={style.tabs__scroller}>
        <div className={style.tabs__container} ref={tabsRef}>
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              type="button"
              title={tab.label}
              onClick={(e) => {
                setActiveTab(tab.id);
                setTabMeta(tabsMeta[index]);
              }}
              className={`${
                activeTab === tab.id ? style.tabs__tab_active : ''
              } ${style.tabs__tab}`}
              style={{
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <span
          className={style.tabs__indicator}
          style={{
            left: tabMeta?.left,
            width: tabMeta?.width,
          }}
        />
      </div>
      <div className={style.tabs__active_content}>
        <ContentTab id={activeTab} />
      </div>
    </>
  );
}
