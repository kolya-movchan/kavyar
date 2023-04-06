import React, { useState } from 'react';
import { NotFound } from '../NotFound';
import { SearchPannel } from '../SearchPannel';

type Props = {
  title: string,
};

export const CoffeeShops: React.FC<Props> = ( { title } ) => {
  const [ query, setQuery ] = useState('');

  const cfp = [
    {
      img: '../../sturbucks.png',
      name: 'Український наступ',
      slogan: 'Найдешевша ціна',
      productName: 'Лонг Блек/Еспресо',
      price: '45 ГРН',
    },
    {
      img: '../../idealist-coffee.jpg',
      name: 'Український наступ',
      slogan: 'Найдешевша ціна',
      productName: 'Лонг Блек/Еспресо',
      price: '100 ГРН',
    },
    {
      img: '../../test-coffee.jpeg',
      name: 'Український наступ',
      slogan: 'Найдешевша ціна',
      productName: 'Лонг Блек/Еспресо',
      price: '95 ГРН',
    },
    {
      img: '../../merry-berry.png',
      name: 'Український наступ',
      slogan: 'Найдешевша ціна',
      productName: 'Лонг Блек/Еспресо',
      price: '9 ГРН',
    },
    // {
    //   img: './sturbucks.png',
    //   name: 'Український наступ',
    //   slogan: 'Найдешевша ціна',
    //   productName: 'Лонг Блек/Еспресо',
    //   price: '97 ГРН',
    // },
    // {
    //   img: './sturbucks.png',
    //   name: 'Український наступ',
    //   slogan: 'Найдешевша ціна',
    //   productName: 'Лонг Блек/Еспресо',
    //   price: '91 ГРН',
    // },
    // {
    //   img: './sturbucks.png',
    //   name: 'Український наступ',
    //   slogan: 'Найдешевша ціна',
    //   productName: 'Лонг Блек/Еспресо',
    //   price: '92 ГРН',
    // },
    {
      img: '../../idealist-coffee.jpg',
      name: 'Український наступ',
      slogan: 'Найдешевша ціна',
      productName: 'Лонг Блек/Еспресо',
      price: '33 ГРН',
    },
    {
      img: '../../test-coffee.jpeg',
      name: 'Український наступ',
      slogan: 'Найдешевша ціна',
      productName: 'Лонг Блек/Еспресо',
      price: '932 ГРН',
    },
    {
      img: '../../sturbucks.png',
      name: 'Український наступ',
      slogan: 'Найдешевша ціна',
      productName: 'Лонг Блек/Еспресо',
      price: '912 ГРН',
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
              const {img, name, slogan, productName, price } = store;
              return (
                <li className="cfp-card" key={price}>
                  <div className="cfp-card__logo-container">
                    <img
                      src={img}
                      alt="coffee-shop1"
                      className="cpf__card-logo"
                    />
                  </div>
                  <div className="cfp-card__name">
                    {name}
                  </div>
                  <div className="cfp-card__slogan">
                    {slogan}
                  </div>
                  <div className="cfp-card__productName">
                    {productName}
                  </div>
                  <div className="cfp-card__price">
                    {price}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {!cfpFiltered.length && <NotFound title={title} />}

        {cfpFiltered.length > 5 && (
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
