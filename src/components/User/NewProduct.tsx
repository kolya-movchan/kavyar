import React from 'react';

type Props = {
  name: string,
  price: number,
};

export const NewProduct: React.FC<Props> = ({ name, price }) => {
  return (
    <ul className="CFP__features-list">
      <li
        className="CFP__feature-item"
      >
        <div className="CFP__product-wrapper">
          <span className="CFP__product-name">{name}</span>

          <div className="CFP__product-price-container">
            <span className="CFP__product-price">
              {price}
            </span>

            <span>
              {' грн'}
            </span>
          </div>
        </div>
      </li>
    </ul>
  );
};
