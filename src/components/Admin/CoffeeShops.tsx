import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NotFound } from '../NotFound';
import { SearchPannel } from '../SearchPannel';

type Props = {
  title: string,
};

export const CoffeeShops: React.FC<Props> = ( { title } ) => {
  const [query, setQuery] = useState('');
  const [showEditId, setShowEditId] = useState(-1);

  const cfp = [
    {
      id: 0,
      img: '../../sturbucks.png',
      name: 'Український наступ',
      open: '12:00',
      close: '22:00',
      location: 'https://goo.gl/maps/hUCQJZGjzVjbemQB7',
    },

    {
      id: 1,
      img: '../../idealist-coffee.jpg',
      name: 'Idealist',
      open: '12:00',
      close: '22:00',
      location: 'https://goo.gl/maps/hUCQJZGjzVjbemQB7',
    },

    {
      id: 2,
      img: '../../idealist-coffee.jpg',
      name: 'Idealist',
      open: '12:00',
      close: '22:00',
      location: 'https://goo.gl/maps/hUCQJZGjzVjbemQB7',
    },

    {
      id: 3,
      img: '../../idealist-coffee.jpg',
      name: 'Idealist',
      open: '12:00',
      close: '22:00',
      location: 'https://goo.gl/maps/hUCQJZGjzVjbemQB7',
    },
    {
      id: 4,
      img: '../../idealist-coffee.jpg',
      name: 'Idealist',
      open: '12:00',
      close: '22:00',
      location: 'https://goo.gl/maps/hUCQJZGjzVjbemQB7',
    },
  ];

  const cfpFiltered = cfp.filter(
    store => store.name.toLowerCase().includes(query.toLowerCase())
  );
  
  return (
    <div className="cfp">
      <SearchPannel
        value={query}
        onChange={setQuery}
        decoration="search-input--cfp"
      />
      <div className="cfp__wrapper">
        <div className="cfp-card-container">
          <ul className="cfp-card__list">
            {cfpFiltered.map(store => {
              const {img, name, open, close, id, location } = store;
              return (
                <li
                  className="cfp-card"
                  id={id.toString()}
                  key={id}
                  onMouseEnter={() => setShowEditId(id)}
                  onMouseLeave={() => setShowEditId(-1)}
                >
                  <div className="cfp-card__logo-container">
                    <img
                      src={img}
                      alt="coffee-shop1"
                      className="cpf__card-logo"
                      style={{ borderRadius: '10px'}}
                    />
                  </div>

                  <div className="cfp-card__name">
                    {name}
                  </div>

                  {showEditId === id && (
                    <div>
                      <Link to='/admin/form'>
                        <img
                          src="../edit.png"
                          alt="edit-coffeshop"
                          className='cfp-card__edit'
                        />
                      </Link>
                    </div>
                  )}

                  <div className="cfp-card__open">
                    Відкриття: {open}
                  </div>

                  <div className="cfp-card__close">
                    Закриття: {close}
                  </div>

                  <div className="cfp-card__location">
                    <a href={location} target="_blank">
                      <img
                        src="../location.png"
                        alt="location"
                        className="cfp-card__location-img"
                      />
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {!cfpFiltered.length && <NotFound title={title} />}

        {true && (
          <div className="cfp__buttons">
            <button
              className="pagination-previous cfp__buttons-pagination"
              disabled
            >
              &lt;
            </button>

            <button className="pagination-next cfp__buttons-pagination">
              &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
