'use client';

import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import style from './search-bar.module.css';

const people = [
  { id: 1, name: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
  { id: 4, name: 'Tom Cook' },
  { id: 5, name: 'Tanya Fox' },
  { id: 6, name: 'Hellen Schmidt' },
];

const SearchBar = () => {
  const [selected, setSelected] = useState(people[0]);
  const [query, setQuery] = useState('');

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  return (
    <>
      <Combobox value={selected} onChange={setSelected}>
        <div className={style.searchContainer}>
          <div className={style.searchBox}>
            <Combobox.Button className={style.searchButton}>
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
            </Combobox.Button>
            <Combobox.Input
              className={`${style.searchInput}`}
              displayValue={(person: any) => person.name}
              placeholder="Search Stocks, ETFs"
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <Transition
            as={Fragment}
            appear
            leave="transition"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className={style.searchSuggestionBox} static>
              {filteredPeople.length === 0 && query !== '' ? (
                <div className={style.searchSuggestionEmpty}>
                  Nothing found.
                </div>
              ) : (
                filteredPeople.map((person) => (
                  <Combobox.Option
                    key={person.id}
                    className={({ active }) =>
                      `${style.searchSuggestionItem} ${
                        active
                          ? style.searchSuggestionItemActive
                          : style.searchSuggestionItemInactive
                      }`
                    }
                    value={person}
                  >
                    {person.name}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </>
  );
};

export default SearchBar;
