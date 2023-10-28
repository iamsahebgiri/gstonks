'use client';

import { useEffect, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import style from './search-bar.module.css';
import useDebounce from '@/hooks/use-debounce';
import { Spinner } from '../spinner';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce<string>(query, 700);

  useEffect(() => {
    const controller = new AbortController();
    const fetchSearchResult = async () => {
      setIsLoading(true);
      setError(null);
      setData(null);
      try {
        const response = await fetch(
          `/api/query?function=SYMBOL_SEARCH&keywords=${debouncedQuery}`,
          {
            signal: controller.signal,
          }
        );
        const jsonResponse = await response.json();
        setData(jsonResponse);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (debouncedQuery !== '') {
      setData(null);
      console.log('[LOG] Searching for', debouncedQuery);
      fetchSearchResult();
    }

    return () => {
      controller.abort();
    };
  }, [debouncedQuery]);
  const router = useRouter();

  return (
    <Combobox
      as="div"
      onChange={(symbol) => {
        router.push(`/stocks/${symbol}`);
      }}
      className={style.searchContainer}
    >
      {({ open }) => (
        <>
          {open && <div className={style.searchOverlay} />}
          <div className={style.searchBox}>
            <Combobox.Button className={style.searchButton}>
              {isLoading ? (
                <Spinner />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className={style.searchIcon}
                >
                  <path
                    fill="currentColor"
                    d="M10 2.5a7.5 7.5 0 0 1 5.964 12.048l4.743 4.745a1 1 0 0 1-1.32 1.497l-.094-.083l-4.745-4.743A7.5 7.5 0 1 1 10 2.5Zm0 2a5.5 5.5 0 1 0 0 11a5.5 5.5 0 0 0 0-11Z"
                  />
                </svg>
              )}
            </Combobox.Button>
            <Combobox.Input
              className={`${style.searchInput}`}
              placeholder="Search Stocks, ETFs and more"
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Combobox.Options className={style.searchSuggestionBox} static>
              {error && (
                <div className={style.searchSuggestionEmpty}>
                  Error: {error?.message}
                </div>
              )}
              {/* {JSON.stringify(data, null, 2)} */}
              {data &&
                data.data['bestMatches'].map((stock: any) => (
                  <Combobox.Option
                    key={stock['1. symbol']}
                    value={stock['1. symbol']}
                    className={({ active }) =>
                      `${style.searchSuggestionItem} ${
                        active
                          ? style.searchSuggestionItemActive
                          : style.searchSuggestionItemInactive
                      }`
                    }
                  >
                    <p className={style.name}>{stock['1. symbol']}</p>
                    <div className={style.row}>
                      <p className={style.symbol}>{stock['2. name']}</p>
                      <p className={style.type}>{stock['3. type']}</p>
                    </div>
                  </Combobox.Option>
                ))}
            </Combobox.Options>
          </Transition>
        </>
      )}
    </Combobox>
  );
};

export default SearchBar;
