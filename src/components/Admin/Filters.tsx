import React, { useState } from 'react';
import { SearchPannel } from '../SearchPannel';

export const Filters: React.FC = ( ) => {
  const [ query, setQuery ] = useState('');
  const [ input, setInput ] = useState(false);

  return (
    <>
      <SearchPannel
        value={query}
        onChange={setQuery}
        decoration="search-input--filters"
      />

      <div className="filters">
        <div className="filters__add">
          <button
            className="filters__create-button button is-link"
            onClick={() => setInput(!input)}
            style={{ backgroundColor: '#000' }}
          >
            +
          </button>

          {input && (
            <div className="filters__add-container">
              <input
                type="text"
                className="filters__input input"
                placeholder="Введіть назву"
              />
              <button
                className="filters__add-button button is-link"
                onClick={() => setInput(false)}
                style={{ backgroundColor: '#000' }}
              >
                Додати
              </button>
            </div>
          )}
        </div>

        <div className="filters__active">
          <h2 className="filters__title">
            Активні
          </h2>

          <ul className="filters__active-list">
            <li className="filters__active-item filters__item">
              Відкрита

              <button className="filters__toggle">
                <img className="filters__img" src="../power_cfp.svg" alt="switch-off-filter" />
              </button>
            </li>

            <li className="filters__active-item filters__item">
              Наявні десерти

              <button className="filters__toggle">
                <img className="filters__img" src="../power_cfp.svg" alt="switch-off-filter" />
              </button>
            </li>

            <li className="filters__active-item filters__item">
              Кава на виніс

              <button className="filters__toggle">
                <img className="filters__img" src="../power_cfp.svg" alt="switch-off-filter" />
              </button>
            </li>

            <li className="filters__active-item filters__item">
              Кава всередині

              <button className="filters__toggle">
                <img className="filters__img" src="../power_cfp.svg" alt="switch-off-filter" />
              </button>
            </li>

            <li className="filters__active-item filters__item">
              Продає зерна

              <button className="filters__toggle">
                <img className="filters__img" src="../power_cfp.svg" alt="switch-off-filter" />
              </button>
            </li>
          </ul>
        </div>

        <div className="filters__inactive">
          <h2 className="filters__title">
            Неактивні
          </h2>

          <ul className="filters__inactive-list">
            <li className="filters__inactive-item filters__item">
              Неактивний 1

              <button className="filters__toggle filters__toggle--white" >
                <img className="filters__img filters__img--white" src="../power_cfp-white.svg" alt="switch-on-filter" />
              </button>
            </li>

            <li className="filters__inactive-item filters__item">
              Неактивний 2

              <button className="filters__toggle filters__toggle--white">
                <img className="filters__img filters__img--white" src="../power_cfp-white.svg" alt="switch-on-filter" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
