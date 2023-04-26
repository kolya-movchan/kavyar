import React from 'react';
import { InputField } from './InputField';
import { Product } from '../../../types/Product';
import { priceRegex } from '../../_tools/Regex';

type Props = {
  product: string,
  productPrice: string,
  productList: Product[],
  data: Product[] | null,
  onAdd: () => void,
  onAddButton: (event: React.KeyboardEvent, productPress: string) => void,
  onSelect?: (idForAPI: string, nameForUser: string) => void
  setProductPrice: (value: string) => void,
  onDelete: (value: number) => void,
  onChange: (value: string) => void,
};

export const AddProducts: React.FC<Props> = ({
  product,
  productPrice,
  productList,
  data,
  onAdd,
  onAddButton,
  onSelect,
  setProductPrice,
  onDelete,
  onChange,
}) => {
  const alreadyExist = productList.some(productEl => productEl.name === product);
  const disabledAdd = !product || !productPrice || !productPrice.match(priceRegex) || alreadyExist;

  return (
    <>
      {productList.length > 0 && (
        <table className="products-table">
          <thead>
            <tr>
              <th className="products-table__heading products-table__item">
                Назва
              </th>
              <th className="products-table__heading products-table__item">
                Ціна
              </th>
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

                  <td className="products-table__item products-table__slot">
                    <button
                      type="button"
                      className="delete is-small"
                      onClick={() => id ? onDelete(id) : null}
                    >
                      -
                    </button>
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
          label="продукт"
          dataAPI={data}
          onSelect={onSelect}
          onChange={onChange}
          onAddButton={onAddButton}
          selecting
        />

        <InputField
          name="price"
          label="ціна"
          value={productPrice}
          onChange={setProductPrice}
          onAddButton={onAddButton}
          placeHolderName="ціну"
        />

        <button
          className="button cfp-products__add-button is-black hoveredButton"
          type="button"
          onClick={onAdd}
          disabled={disabledAdd}
        >
          Додати
        </button>
      </div>
    </>
  );
};
