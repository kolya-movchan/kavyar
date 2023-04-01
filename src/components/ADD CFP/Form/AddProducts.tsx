import React, { useState } from 'react';
import { InputField } from './InputField';

export const AddProducts: React.FC = () => {
  const [product1, setProduct1] = useState('');
  const [productPrice, setProductPrice] = useState('');

  return (
    <fieldset className="cfp-products">
      <h2 className="cfp-products__title">
        Продукти кав’ярні
      </h2>

      <div className="cfp-products__container">
        <InputField
          name="product-1"
          label="назва продукту"
          value={product1}
          onChange={setProduct1}
          required
        />
        <InputField
          name="price-1"
          label="ціна"
          value={productPrice}
          onChange={setProductPrice}
          required
        />
        <button
          className="button is-link cfp-products__add-button"
          type="button"
          onClick={() => {}}
        >
          Додати ще
        </button>
      </div>
    </fieldset>
  );
};
