import React, { useState } from 'react';
import { SearchPannel } from '../SearchPannel';
import { DynamicAddButton } from './DynamicAddButton';
import { DynamicField } from './DynamicField';

export const Products: React.FC = ( ) => {
  const [ searchQuery, setSearchQuery ] = useState('');
  const [ query, setQuery ] = useState('');
  const [ input, setInput ] = useState(false);

  const test = [
    'Product 1', 'Product2 ',
  ];

  const test2 = [
    'test',
  ];

  return (
    <>
      <div className="menus-top">
        <SearchPannel
          value={searchQuery}
          onChange={setSearchQuery}
          decoration="search-input--filters"
        />
        <DynamicAddButton
          input={input}
          showInput={setInput}
          onQuery={setQuery}
          query={query}
        />
      </div>

      <div className="filters">
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
