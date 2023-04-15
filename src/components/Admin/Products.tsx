import React, { useEffect, useState } from 'react';
import { deleteProductAPI, getAllCategoriesAPI, getAllProductsAPI, postNewProductAPI } from '../../api/fetch';
import { Category } from '../../types/Category';
import { Product } from '../../types/Product';
import { Loader } from '../Loader';
import { NotFound } from '../NotFound';
import { SearchPannel } from '../SearchPannel';
import { validateInput } from '../_tools/Regex';
import { scrollTop } from '../_tools/Tools';
import { DynamicAddButton } from './DynamicAddButton';
import { DynamicField } from './DynamicField';

export const Products: React.FC = ( ) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [query, setQuery] = useState('');
  const [input, setInput] = useState(false);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [productsInactive, setProductsInactive] = useState<Product[] | null>(null);
  const [loader, setLoader] = useState(false);
  const [hideMode, setHideMode] = useState(false);
  const [categoriesForProduct, setCategoriesForProduct] = useState<Category[] | null>(null);
  const [newCategoryId, setnewCategoryId] = useState('');

  const htmlElement = document.getElementById("html");


  const findDuplicate = () => {
    if (productsInactive && products) {
      return [...productsInactive, ...products].some(product => product.name.toLowerCase() === query.toLowerCase());
    }

    return false;
  };

  const addProducts = () => {
    setInput(false);

    if (findDuplicate()) {
      return;
    }

    if (query && newCategoryId) {
      const newProduct = {
        name: query,
        description: query,
        categoryId: newCategoryId,
        id: 0,
      };

      activateLoading();

      postNewProductAPI(newProduct)
        .then(() => {
          getAllData();
          setQuery('');
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => removeLoading());
    }
  };

  const deleteProduct = (id: number) => {
    activateLoading();

    deleteProductAPI(id)
      .then(() => {
        getAllData();
        setQuery('');
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => removeLoading());
  };

  const productsSorted = products?.sort((product1, product2) => (product2.id - product1.id));

  const productsSortedInactive = productsInactive?.sort((p1, p2) => {
    return p2.id - p1.id;
  });

  const productsSearch = productsSorted?.filter(
    product => product.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const productsInactiveSearch = productsSortedInactive?.filter(
    p => p.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const isAnyProductFound = () => {
    if (productsSearch && productsInactiveSearch) {
      return [...productsSearch, ...productsInactiveSearch].length;
    }

    return true;
  };

  const handleProductsInput = (value: string) => {
    const inputText = validateInput(value);

    setQuery(inputText);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setQuery('');
    }

    if (event.key === 'Enter' && query) {
      addProducts();
    }
  };


  const getPromises: () => [Promise<Product[]>, Promise<Product[]>, Promise<Category[]>] = () => {
    return [
      getAllProductsAPI('products?usable=true'),
      getAllProductsAPI('products?usable=false'),
      getAllCategoriesAPI('categories')
    ];
  };

  const getAllData = async () => {
    const result = await Promise.all(getPromises())
      .finally(() => removeLoading());

    const [productsAPI, productsInactiveAPI, categoryAPI] = result;

    setProducts(productsAPI);
    setProductsInactive(productsInactiveAPI);
    setCategoriesForProduct(categoryAPI);
  };

  const activateLoading = () => {
    scrollTop();
    setLoader(true);
    htmlElement?.classList.add('hidden');
  };

  const removeLoading = () => {
    setLoader(false);
    htmlElement?.classList.remove('hidden');
  };

  useEffect(() => {
    setHideMode(true);
    activateLoading();
    getAllData();
  }, []);

  return (
    <>
      <div className="menus-top" style={{ margin: '0'}}>
        {loader && (
          <div className="loading">
            <Loader
              type={(products && productsInactive) ? 'bubbles' : 'spin'}
              color='#000'
            />
          </div>
        )}

        <SearchPannel
          value={searchQuery}
          onChange={setSearchQuery}
          decoration="search-input--filters"
        />

        <div style={{ width: '300px' }}>
          <div style={{ marginBottom: '15px' }}>
            <DynamicAddButton
              input={input}
              showInput={setInput}
              onQuery={handleProductsInput}
              query={query}
              onAdd={addProducts}
              hideMode={hideMode}
              onKey={handleKeyPress}
            />

            <div className="select" style={{width: '100%'}}>
              <select
                className='select menus-top__select'
                onChange={event => setnewCategoryId(event.target.value)}
                defaultValue={'DEFAULT'}
                style={{ width: '100%' }}
              >
                <option disabled value="DEFAULT">
                  Оберіть Категорію
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
        {!isAnyProductFound() && (
          <NotFound title='Продуктів' text='filters'/>
        )}

        <div className="filters__active">
          {(productsSearch && productsSearch.length > 0) && (
            <h2 className="filters__title">
              Активні
            </h2>
          )}

          <ul className="filters__active-list">
            {categoriesForProduct?.map(category => {
              return (
                <div key={category.id}>
                  {productsSearch?.some(product => product.category?.id === category.id) && (
                    <h2 className="filters__categoryName" key={category.id}>
                      {category.name}
                    </h2>
                  )}

                  <div style={{marginBottom: '15px' }}>
                    {productsSearch && productsSearch.map(product => {
                      if (product.category?.name === category.name) {
                        return (
                          <DynamicField
                            key={product.id}
                            value={product.name}
                            styling="filters__active-item"
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

        <div className="filters__inactive filters__allLists">
          {(productsInactiveSearch && productsInactiveSearch.length > 0) && (
            <h2 className="filters__title">
            Неактивні
            </h2>
          )}

          <ul className="filters__inactive-list">
            {categoriesForProduct?.map(category => {
              return (
                <div key={category.id}>
                  {productsInactiveSearch?.some(product => product.category?.id === category.id) && (
                    <h2 className="filters__categoryName" key={category.id}>
                      {category.name}
                    </h2>
                  )}

                  <div style={{marginBottom: '15px' }}>
                    {productsInactiveSearch && productsInactiveSearch.map(product => {
                      if (product.category?.name === category.name) {
                        return (
                          <DynamicField
                            id={product.id}
                            key={product.id}
                            value={product.name}
                            styling="filters__inactive-item"
                            stylingLink="../delete-icon.png"
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
      </div>
    </>
  );
};
