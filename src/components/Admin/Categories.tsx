import React, { useEffect, useState } from 'react';
import { deleteCategoryAPI, getAllCategoriesAPI, postNewCategoryAPI } from '../../api/fetch';
import { Category } from '../../types/Category';
import { Loader } from '../Loader';
import { NotFound } from '../NotFound';
import { SearchPannel } from '../SearchPannel';
import { DynamicAddButton } from './DynamicAddButton';
import { DynamicField } from './DynamicField';

export const Categories: React.FC = ( ) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [query, setQuery] = useState('');
  const [input, setInput] = useState(false);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [loader, setLoader] = useState(false);

  const getCategories = () => {
    getAllCategoriesAPI('categories')
      .then(categoriesList => setCategories(categoriesList))
      .catch(e => {
        console.log(e);
      })
      .finally(() => setLoader(false));
  };

  const addCategory = () => {
    setInput(false);

    if (query) {
      const newCategory = {
        id: 0,
        name: query,
      };

      postNewCategoryAPI(newCategory)
        .then(() => setTimeout(() => {
          getCategories();
        }, 100))
        .catch((e) => {
          (e);
          setLoader(false);
        });

      setQuery('');
      setLoader(true);
    }
  };

  const deleteCategory = (id: number) => {
    setLoader(true);

    deleteCategoryAPI(id)
      .then(() => getCategories())
      .catch((e) => {
        console.log(e);
        setLoader(false);
      });
  };

  const categoriesSorted = categories?.sort((category1, category2) => category2.id - category1.id);
  const categoriesSearch = categoriesSorted?.filter(
    category => category.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  useEffect(() => {
    getCategories();
  }, []);

  const test2 = ['TestInactive1', 'TestInactive2'];

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
          onAdd={addCategory}
        />
      </div>

      <div className="filters">
        <div className="filters__active">
          <h2 className="filters__title">
            Активні
          </h2>

          {!categories && <Loader type='spin' color='#000' />}

          {loader && <Loader type='bubbles' color='#000' />}

          {categoriesSearch && categoriesSearch.length < 1 && (
            <NotFound title='Категорій' text='filters'/>
          )}

          <ul
            className="filters__active-list"
            style={ loader ? {marginTop: '20px'}: {}}
          >
            {categoriesSearch && categoriesSearch.map(category => (
              <DynamicField
                key={category.id}
                value={category.name}
                styling="filters__active-item"
                id={category.id}
                onDelete={deleteCategory}
              />
            ))}
          </ul>
        </div>

        <div className="filters__inactive">
          <h2 className="filters__title">
            Неактивні
          </h2>

          <ul className="filters__inactive-list">
            {test2.map(category => (
              <DynamicField
                key={category}
                value={category}
                styling="filters__inactive-item"
                stylingLink="../power_cfp.svg"
                stylingColor="filters__toggle--black"
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
