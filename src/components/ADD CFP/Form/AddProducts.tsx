import React from 'react';
import { InputField } from './InputField';
import { Product } from '../../../types/Product';

type Props = {
  product: string,
  productPrice: string,
  onAdd: () => void,
  onAddButton: (event: React.KeyboardEvent, productPress: string) => void,
  setProduct: (value: string) => void,
  setProductPrice: (value: string) => void,
  productList: Product[],
};

export const AddProducts: React.FC<Props> = ({
  product,
  productPrice,
  onAdd,
  onAddButton,
  setProduct,
  setProductPrice,
  productList,
}) => {
  return (
    <>
      {productList.length > 0 && (
        <table className="products-table">
          <thead>
            <tr>
              <th className="products-table__heading products-table__item">Назва</th>
              <th className="products-table__heading products-table__item">Ціна</th>
            </tr>
          </thead>
          <tbody>
            {productList.map(productItem => {
              const { id, name, price } = productItem;

              return (
                <tr key={id}>
                  <td className="products-table__item products-table__slot">
                    {name}
                  </td>
                  <td className="products-table__item products-table__slot">
                    {price}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <div className="cfp-products__container">
        <InputField
          name="product"
          label="назва"
          value={product}
          onChange={setProduct}
          onAddButton={onAddButton}
          maxLength={30}
        />

        <InputField
          name="price"
          label="ціна"
          value={productPrice}
          onChange={setProductPrice}
          onAddButton={onAddButton}
        />

        <button
          className="button is-link cfp-products__add-button"
          type="button"
          onClick={onAdd}
          disabled={!product || !productPrice}
        >
          Додати
        </button>

        {/* <button
          className="is-link cfp-products__delete-button delete"
          type="button"
        >
          x
        </button> */}
      </div>
    </>
  );
};
