import React, { useState } from 'react';
import { SearchPannel } from '../SearchPannel';
import { DynamicAddButton } from './DynamicAddButton';
import { DynamicField } from './DynamicField';

export const Cities: React.FC = ( ) => {
  const [ searchQuery, setSearchQuery ] = useState('');
  const [ query, setQuery ] = useState('');
  const [ input, setInput ] = useState(false);

  const test = [
    'Київ', 'Львів', 'Одеса',
  ];

  const test2 = [
    'Хмельницький', 'Чернівці',
  ];

  return (
    <>
      <SearchPannel
        value={searchQuery}
        onChange={setSearchQuery}
        decoration="search-input--filters"
      />

      <div className="filters">
        <DynamicAddButton
          input={input}
          showInput={setInput}
          onQuery={setQuery}
          query={query}
        />

        <div className="filters__active">
          <h2 className="filters__title">
            Активні
          </h2>

          <ul className="filters__active-list">
            {test.map(city => (
              <DynamicField
                key={city}
                value={city}
                styling="filters__active-item"
                stylingLink="../power_cfp.svg"
              />
            ))}
          </ul>
        </div>

        <div className="filters__inactive">
          <h2 className="filters__title">
            Неактивні
          </h2>

          <ul className="filters__inactive-list">
            {test2.map(city => (
              <DynamicField
                key={city}
                value={city}
                styling="filters__inactive-item"
                stylingLink="../power_cfp-white.svg"
                stylingColor="filters__toggle--black"
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
