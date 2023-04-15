import React, { useEffect, useState } from 'react';
import { deleteCategoryAPI, getAllCategoriesAPI, postNewCategoryAPI } from '../../api/fetch';
import { Category } from '../../types/Category';
import { Loader } from '../Loader';
import { NotFound } from '../NotFound';
import { SearchPannel } from '../SearchPannel';
import { validateInput } from '../_tools/Regex';
import { DynamicAddButton } from './DynamicAddButton';
import { DynamicField } from './DynamicField';

export const Categories: React.FC = ( ) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [query, setQuery] = useState('');
  const [input, setInput] = useState(false);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [categoriesInactive, setCategoriesInactive] = useState<Category[] | null>(null);
  const [loader, setLoader] = useState(false);

  const htmlElement = document.getElementById("html");

  const findDuplicate = () => {
    if (categoriesInactive && categories) {
      console.log('DUPLICATE');
      
      return [...categoriesInactive, ...categories].some(city => city.name.toLowerCase() === query.toLowerCase());
    }

    return false;
  };

  const addCategory = () => {
    if (findDuplicate()) {
      return;
    }

    if (query) {
      const newCategory = {
        id: 0,
        name: query,
      };

      activateLoading();

      postNewCategoryAPI(newCategory)
        .then(() => {
          getAllData();
          setQuery('');
        })
        .catch((e) => {
          console.log(e);
          setLoader(false);
        })
        .finally(() => removeLoading());
    }
  };

  const handleCategoryDeletion = (id: number) => {
    setLoader(true);

    deleteCategoryAPI(id)
      .then(() => getAllData())
      .catch((e) => {
        console.log(e);
        setLoader(false);
      })
      .finally(() => removeLoading());
  };

  const categoriesSorted = categories?.sort((category1, category2) => category2.id - category1.id);
  const categoriesSortedInactive = categoriesInactive?.sort((category1, category2) => {
    return category2.id - category1.id;
  });

  const categoriesSearch = categoriesSorted?.filter(
    category => category.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );
  const categoriesInactiveSearch = categoriesSortedInactive?.filter(
    category => category.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const isAnyCategoryFound = () => {
    if (categoriesSearch && categoriesInactiveSearch) {
      return [...categoriesSearch, ...categoriesInactiveSearch].length;
    }

    return true;
  };

  const handleCategoryInput = (value: string) => {
    const inputText = validateInput(value);

    setQuery(inputText);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setQuery('');
    }

    if (event.key === 'Enter' && query) {
      addCategory();
    }
  };

  const getPromises: () => [Promise<Category[]>, Promise<Category[]>] = () => {
    return [
      getAllCategoriesAPI('categories?usable=true'),
      getAllCategoriesAPI('categories?usable=false')
    ];
  };

  const getAllData = async () => {
    const result = await Promise.all(getPromises())
      .finally(() => removeLoading());

    const [categoryAPI, categoryInactiveAPI] = result;

    setCategories(categoryAPI);
    setCategoriesInactive(categoryInactiveAPI);
  };

  const activateLoading = () => {
    setLoader(true);
    htmlElement?.classList.add('hidden');
  };

  const removeLoading = () => {
    setLoader(false);
    htmlElement?.classList.remove('hidden');
  };

  useEffect(() => {
    activateLoading();

    getAllData();
  }, []);

  return (
    <>
      <div className="menus-top">
        {loader && (
          <div className="loading">
            <Loader
              type={categories ? 'bubbles' : 'spin'}
              color='#000'
            />
          </div>
        )}

        <SearchPannel
          value={searchQuery}
          onChange={setSearchQuery}
          decoration="search-input--filters"
        />

        <DynamicAddButton
          input={input}
          showInput={setInput}
          onQuery={handleCategoryInput}
          query={query}
          onAdd={addCategory}
          onKey={handleKeyPress}
        />
      </div>

      <div className="filters">
        {!isAnyCategoryFound() && (
          <NotFound title='Категорій' text='filters'/>
        )}

        <div className="filters__active filters__allLists">
          {(categoriesSearch && categoriesSearch.length > 0) && (
            <h2 className="filters__title">
              Активні
            </h2>
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
              />
            ))}
          </ul>
        </div>

        <div className="filters__inactive filters__allLists">
          {(categoriesInactiveSearch && categoriesInactiveSearch.length > 0) && (
            <h2 className="filters__title">
            Неактивні
            </h2>
          )}

          <ul className="filters__inactive-list">
            {categoriesInactiveSearch && categoriesInactiveSearch.map(category => (
              <DynamicField
                key={category.id}
                value={category.name}
                styling="filters__inactive-item"
                stylingLink="../delete-icon.png"
                id={category.id}
                onDelete={handleCategoryDeletion}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
