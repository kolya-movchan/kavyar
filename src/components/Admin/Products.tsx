import React, { useEffect, useState } from 'react';
import { deleteProductAPI, getAllCategoriesAPI, getAllProductsAPI, postNewProductAPI } from '../../api/fetch';
import { Category } from '../../types/Category';
import { Product } from '../../types/Product';
import { Loader } from '../Loader';
import { SearchPannel } from '../SearchPannel';
import { DynamicAddButton } from './DynamicAddButton';
import { DynamicField } from './DynamicField';
// import { InputField } from './Form/InputField';

export const Products: React.FC = ( ) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [query, setQuery] = useState('');
  const [input, setInput] = useState(false);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loader, setLoader] = useState(false);
  const [hideMode, setHideMode] = useState(false);
  const [categoriesForProduct, setCategoriesForProduct] = useState<Category[] | null>(null);
  const [newCategoryId, setnewCategoryId] = useState('');

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

    if (query && newCategoryId) {
      const newProduct = {
        name: query,
        description: query,
        categoryId: newCategoryId,
        id: 0,
      };

      postNewProductAPI(newProduct)
        // .then(() => setTimeout(() => {
        //   getCategories();
        // }, 100))
        .then(() => setTimeout(() => {
          getProducts();
        }, 300))
        .catch((e) => {
          console.log(e);
          setLoader(false);
        });

      setQuery('');
      setLoader(true);
      setnewCategoryId('');
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

  const getCategories = () => {
    getAllCategoriesAPI('categories')
      .then(categoriesList => setCategoriesForProduct(categoriesList))
      .catch(e => {
        console.log(e);
      })
      .finally(() => setLoader(false));
  };

  const productsSorted = products?.sort((product1, product2) => (product2.id - product1.id));

  useEffect(() => {
    setHideMode(true);
    getCategories();
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

        <div style={{ minHeight: '150px' }}>
          <div style={{ marginBottom: '15px' }}>
            <DynamicAddButton
              input={input}
              showInput={setInput}
              onQuery={setQuery}
              query={query}
              onAdd={addProducts}
              hideMode={hideMode}
            />

            <select
              className='menus-top__select select'
              onChange={event => setnewCategoryId(event.target.value)}
              defaultValue={'DEFAULT'}
              style={{ width: '100%' }}
            >
              <option disabled value="DEFAULT">
                Оберіть Категорію:
              </option>

              {categoriesForProduct && categoriesForProduct.map((category) =>
                <option
                  value={category.id}
                  key={category.id}
                >
                  {category.name}
                </option>
              )}
            </select>
          </div>

          {(query && newCategoryId) && (
            <button
              className="filters__add-button button is-link"
              onClick={() => addProducts()}
              style={{ backgroundColor: '#000' }}
            >
              Додати
            </button>
          )}
        </div>
      </div>

      <div className="filters">
        <div className="filters__active">
          {/* <h2 className="filters__title">
            Активні
          </h2> */}

          {!products && <Loader type='spin' color='#000' />}

          {loader && <Loader type='bubbles' color='#000' />}

          <ul className="filters__active-list">
            {categoriesForProduct?.map(category => {
              return (
                <div key={category.id}>
                  {productsSorted?.some(product => product.category?.id === category.id) && (
                    <h2 className="filters__categoryName" key={category.id}>
                      {category.name}
                    </h2>
                  )}

                  <div>
                    {productsSorted && productsSorted.map(product => {
                      if (product.category?.name === category.name) {
                        return (
                          <DynamicField
                            key={product.id}
                            value={product.name}
                            styling="filters__active-item"
                            stylingLink="../power_cfp.svg"
                            id={product.id}
                            onDelete={deleteProduct}
                          />
                        );
                      }
                    })}
                  </div>
                </div>
              );
            })}
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
