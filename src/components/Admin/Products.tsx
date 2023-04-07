import React, { useEffect, useState } from 'react';
import { deleteProductAPI, getAllProductsAPI, postNewProductAPI } from '../../api/fetch';
import { Product } from '../../types/Product';
import { Loader } from '../Loader';
import { SearchPannel } from '../SearchPannel';
import { DynamicAddButton } from './DynamicAddButton';
import { DynamicField } from './DynamicField';

export const Products: React.FC = ( ) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [query, setQuery] = useState('');
  const [input, setInput] = useState(false);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loader, setLoader] = useState(false);

  const getProducts = () => {
    getAllProductsAPI('products')
      .then(categoriesList => setProducts(categoriesList))
      .catch(e => {
        console.log(e);
      })
      .finally(() => setLoader(false));
  };

  const addProducts = () => {
    setInput(false);

    if (query) {
      const newProduct = {
        id: 0,
        name: query,
      };

      postNewProductAPI(newProduct)
        .then(() => setTimeout(() => {
          getProducts();
        }, 100))
        .catch((e) => {
          console.log(e);
          setLoader(false);
        });

      setQuery('');
      setLoader(true);
    }
  };

  const deleteProduct = (id: number) => {
    setLoader(true);

    deleteProductAPI(id)
      .then(() => getProducts())
      .catch((e) => {
        console.log(e);
        setLoader(false);
      });
  };

  const productsSorted = products?.sort((product1, product2) => (product2.id - product1.id));

  useEffect(() => {
    getProducts();
  }, []);

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
          onAdd={addProducts}
        />
      </div>

      <div className="filters">
        <div className="filters__active">
          <h2 className="filters__title">
            Активні
          </h2>

          {!products && <Loader type='spin' color='#000' />}

          {loader && <Loader type='bubbles' color='#000' />}

          <ul className="filters__active-list">
            {productsSorted && productsSorted.map(product => (
              <DynamicField
                key={product.id}
                value={product.name}
                styling="filters__active-item"
                stylingLink="../power_cfp.svg"
                id={product.id}
                onDelete={deleteProduct}
              />
            ))}
          </ul>
        </div>

        {/* <div className="filters__inactive">
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
        </div> */}
      </div>
    </>
  );
};
